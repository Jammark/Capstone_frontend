import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Alloggio } from 'src/app/model/alloggio';
import { Prenotazione } from 'src/app/model/prenotazione';
import { Trasporto } from 'src/app/model/trasporto';
import { MeteService } from 'src/app/service/mete.service';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-prenotazione-helper',
  templateUrl: './prenotazione-helper.component.html',
  styleUrls: ['./prenotazione-helper.component.scss']
})
export class PrenotazioneHelperComponent implements OnInit{

  prenotazione?:Prenotazione;
  @Input()
  alloggio?:Alloggio;
  partenza?:Date;
  ritorno?:Date;
  nomePartenza?:string;
  @Input()
  nomeArrivo?:string;
  checked:boolean = false;
  viaggioAndata?:Trasporto;
  viaggioRitorno?:Trasporto;
  cityNames:string[]=[];

  constructor(private mSrv: MeteService,private srv: PrenotazioniService, private router: Router){}

  ngOnInit(): void {
      this.getNomiCittà();
  }

  submit():void{
      this.checked = true;
  }

  setAndata(t:Trasporto):void{
    this.viaggioAndata = t;
  }

  setRitorno(t:Trasporto):void{
    this.viaggioRitorno = t;
  }

  rimuoviAndata():void{
    this.viaggioAndata = undefined;
  }

  rimuoviRitorno():void{
    this.viaggioRitorno = undefined;
  }

  prenota():void{
      let prenotazione:Prenotazione = {
        data: DateUtil.formatDate(this.partenza!),
        dataFine: DateUtil.formatDate(this.ritorno!),
        metaId: this.alloggio!.metaId,
        alloggioId: this.alloggio!.id,
        trasportoId: this.viaggioAndata!.id,
        ritornoId: this.viaggioRitorno!.id,
        id: undefined,
        numeroGiorni: undefined,
        userId: undefined,
        prezzo: undefined
      };

      this.srv.prenota(prenotazione).subscribe(item => {
        console.table(item);
        this.showModalFinish();
      })
  };

  showModal(id:string){

    var myModal = new bootstrap.Modal(document.getElementById(`exampleModal${id}`) as HTMLElement);
    myModal.show();

  }

  showModalFinish(){

    var myModal = new bootstrap.Modal(document.getElementById(`modalSuccess`) as HTMLElement);
    myModal.show();

  }

  getNomiCittà():void{
    this.mSrv.getCittà().subscribe(lista => {
      this.cityNames = lista.map(e => e.nome);
    });
  }

  chiudi():void{
    var myModal = new bootstrap.Modal(document.getElementById(`modalSuccess`) as HTMLElement);
   // myModal.hide();
      this.router.navigate(['/home']);
  }


}
