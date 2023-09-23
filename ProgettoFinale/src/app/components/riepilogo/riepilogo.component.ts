import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acquisto } from 'src/app/model/acquisto';
import { Alloggio } from 'src/app/model/alloggio';
import { Meta } from 'src/app/model/meta';
import { Prenotazione } from 'src/app/model/prenotazione';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { MeteService } from 'src/app/service/mete.service';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit{

acquisti?:Acquisto[];
alloggi:Map<number, Alloggio>=new Map();
mete: Map<number, Meta> = new Map();

constructor(private srv: PrenotazioniService,private mSrv: MeteService, private aSrv : AlloggiService, private router: Router){}

  ngOnInit(): void {
    this.srv.getRiepilogo().subscribe(list => {
      this.acquisti = list;
      list.map(e => e.prenotazione.alloggioId).forEach(id => {
        this.aSrv.getHotelById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
          this.mSrv.getCittàById(item.metaId).subscribe(city => {
            this.mete.set(id, city);
          });
        })

        this.aSrv.getAppartamentoById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
          this.mSrv.getCittàById(item.metaId).subscribe(city => {
            this.mete.set(id, city);
          });
        })
      });
    });
  }

  getAlloggio(id:number):Alloggio | undefined{
    return this.alloggi.get(id);
  }

  getMeta(p:Prenotazione):Meta | undefined{
    return this.mete.get(p.alloggioId);
  }

  chiudi():void{
    this.router.navigate(['/home']);
  }
}
