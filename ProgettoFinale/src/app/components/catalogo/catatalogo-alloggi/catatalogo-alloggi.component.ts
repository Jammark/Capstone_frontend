import { Component, Input, SimpleChanges } from '@angular/core';
import { Appartamento } from 'src/app/model/appartamento';
import { Hotel } from 'src/app/model/hotel';
import { OnInit } from '@angular/core';
import { MeteService } from 'src/app/service/mete.service';
import { ActivatedRoute } from '@angular/router';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { Subscription } from 'rxjs';
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
  hotels?:Hotel[];
  appartamenti?:Appartamento[];
  sub?:Subscription;

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
  }

  ngOnInit(): void {

  }

  selezionaHotel(h:Hotel){

  }

  selezionaAppartamento(a:Appartamento){

  }

  getAlloggioImgUrl(a:Alloggio):string{
    return this.aSrv.getMetaImgUrl(a);
  }
}
