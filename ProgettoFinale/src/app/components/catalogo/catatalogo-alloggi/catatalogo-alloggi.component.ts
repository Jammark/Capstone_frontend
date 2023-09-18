import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Appartamento } from 'src/app/model/appartamento';
import { Hotel } from 'src/app/model/hotel';
import { OnInit } from '@angular/core';
import { MeteService } from 'src/app/service/mete.service';
import { ActivatedRoute } from '@angular/router';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Alloggio } from 'src/app/model/alloggio';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-ctatalogo-alloggi',
  templateUrl: './catatalogo-alloggi.component.html',
  styleUrls: ['./catatalogo-alloggi.component.scss']
})
export class CatatalogoAlloggiComponent implements OnInit, OnChanges{

  @Input()
  metaId?:number;
  @Input()
  metaIds?:number[];
  hotels?:Hotel[];
  appartamenti?:Appartamento[];
  sub?:Subscription;

  private alloggioSubj = new BehaviorSubject<null | Alloggio>(null);
  @Output() emit = new EventEmitter<Alloggio>();
  alloggio$ = this.alloggioSubj.asObservable();

  constructor(private srv: MeteService,  private rt: ActivatedRoute, private aSrv: AlloggiService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['metaId']){
      if(this.metaId){
        this.aSrv.getHotelsByMeta(this.metaId!).subscribe(lista => {
          this.hotels = lista;
          console.log('lista hotel length: '+ this.hotels.length);


        });

        this.aSrv.getAppartamentiByMeta(this.metaId!).subscribe(lista => {
          this.appartamenti = lista;

          console.log('lista appartamenti length: '+ lista.length);
          console.table(this.appartamenti);
        });
    }
    }

    if(changes['metaIds']){
      this.hotels = [];
      this.appartamenti = [];
      this.metaIds?.forEach(id => {
        this.aSrv.getHotelsByMeta(id).subscribe(lista => {
          lista.forEach(e => this.hotels?.push(e))
          console.log('lista hotel length: '+ this.hotels!.length);


        });

        this.aSrv.getAppartamentiByMeta(id).subscribe(lista => {
          lista.forEach(e => this.appartamenti?.push(e));

          console.log('lista appartamenti length: '+ lista.length);
          console.table(this.appartamenti);
        });
      });
    }
  }

  ngOnInit(): void {
    this.alloggioSubj.subscribe(a => {
      this.emit.emit(a ? a : undefined);
  })
  }

  selezionaHotel(h:Hotel){
    this.alloggioSubj.next(h);
  }

  selezionaAppartamento(a:Appartamento){
    this.alloggioSubj.next(a);
  }

  getAlloggioImgUrl(a:Alloggio):string{
    return this.aSrv.getMetaImgUrl(a);
  }
}
