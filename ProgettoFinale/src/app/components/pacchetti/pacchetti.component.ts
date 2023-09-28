import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Alloggio } from 'src/app/model/alloggio';
import { Meta } from 'src/app/model/meta';
import { Prenotazione } from 'src/app/model/prenotazione';
import { Trasporto } from 'src/app/model/trasporto';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { TrasportiService } from 'src/app/service/trasporti.service';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-pacchetti',
  templateUrl: './pacchetti.component.html',
  styleUrls: ['./pacchetti.component.scss']
})
export class PacchettiComponent implements OnInit, OnChanges, AfterViewChecked{

  @Input()
  meta?:Meta;
  pacchetti?:Prenotazione[];
  trasporti:Trasporto[]=[];
  alloggi:Alloggio[]=[];
  @Output() emitter = new EventEmitter<boolean>();

  constructor(private srv: PrenotazioniService, private aSrv: AlloggiService, private tSrv: TrasportiService, private router: Router){}
  ngAfterViewChecked(): void {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['meta']){
      this.srv.getPacchetti(this.meta!.id).subscribe(lista => {
        this.pacchetti = lista;
        console.table(lista);
        this.pacchetti.forEach(p => {
          this.aSrv.getAppartamentoById(p.alloggioId).subscribe(item => {
            this.alloggi.push(item);
            console.log('pacchetti');
            console.table(item);
          });
          this.aSrv.getHotelById(p.alloggioId).subscribe(item => {
            this.alloggi.push(item);
          });
          this.tSrv.getVoloById(p.trasportoId).subscribe(item => {
            this.trasporti.push(item);
          });
          this.tSrv.getVoloById(p.ritornoId).subscribe(item => {
            this.trasporti.push(item);
          });
        });
      })
    }
  }

  setup():void{
    this.pacchetti?.forEach((p, index) => {
      let container = document.getElementById(index+'rateContainer'+this.meta!.id);
      for(let i = 0; i < 5; i++){//vengono aggiunte le 10 stelline di rating
        //  let parent = document.createElement('li');
          let child: HTMLImageElement = container?.getElementsByClassName('star')[i] as HTMLImageElement;
          //child.setAttribute('src','../../../');
       //   console.table(i+' child '+child);
          let a = this.alloggi.find(e => e.id = p.alloggioId);
          if(a){
          child.classList.add(a!.rate > i ? 'on':'off');
          }
      }
    });
  }

  getAlloggio(p:Prenotazione):Alloggio | undefined{
    return this.alloggi.find(a => a.id == p.alloggioId);
  }

  getAndata(p:Prenotazione):Trasporto | undefined{
    return this.trasporti.find(t => t.id == p.trasportoId);
  }

getRitorno(p:Prenotazione):Trasporto | undefined{
  return this.trasporti.find(t => t.id == p.ritornoId);
}

getAlloggioImgUrl(a:Alloggio):string{
  return this.aSrv.getMetaImgUrl(a);
}

showModal(id:number){
  $('#'+this.meta!.id+'modalPush'+id).appendTo("body").modal('show');
  //var myModal = new bootstrap.Modal(document.getElementById(`exampleModal`+id) as HTMLElement);
  //myModal.show();
}

selezionaPacchetto(p:Prenotazione):void{
  console.log('prenotazione pacchetto.');
  console.table(p);

  this.srv.prenota(p).subscribe(item => {
    $('#modalSuccess'+this.meta!.id).appendTo("body").modal('show');
     this.router.navigate(['/saldo']);
  })
}

  ngOnInit(): void {

  }

  close():void{
    this.emitter.emit(false);
  }

  getDataVolo(t:Trasporto):string{
    let d = new Date(t.dataPartenza);
    return DateUtil.euroFormatDate(d);
  }

}
