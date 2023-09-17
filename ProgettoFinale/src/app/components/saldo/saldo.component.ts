import { Component } from '@angular/core';
import { Prenotazione } from 'src/app/model/prenotazione';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { OnInit } from '@angular/core';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { TrasportiService } from 'src/app/service/trasporti.service';
import { Alloggio } from 'src/app/model/alloggio';
import { Trasporto } from 'src/app/model/trasporto';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit{

  prenotazioni?:Prenotazione[];
  alloggi:Map<number, Alloggio>=new Map();
  trasporti:Map<number, Trasporto>=new Map();

  constructor(private srv: PrenotazioniService, private aSrv : AlloggiService, private tSrv:TrasportiService, private router: Router){}

  ngOnInit(): void {
    this.srv.getSaldo().subscribe(list => {
      this.prenotazioni = list;
      list.map(e => e.alloggioId).forEach(id => {
        this.aSrv.getHotelById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
        })

        this.aSrv.getAppartamentoById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
        })
      });
      list.map(e => e.trasportoId).forEach(id => {
        this.tSrv.getVoloById(id).subscribe(item => {
          this.trasporti?.set(item.id, item);
        })
      });
      list.map(e => e.ritornoId).forEach(id => {
        this.tSrv.getVoloById(id).subscribe(item => {
          this.trasporti?.set(item.id, item);
        })
      })
    });
  }

  getAlloggio(id:number):Alloggio | undefined{
    return this.alloggi.get(id);
  }

  getTrasporto(id:number):Trasporto | undefined{
    return this.trasporti.get(id);
  }

  selezionaPrenotazione(p:Prenotazione):void{
      this.srv.prenota(p).subscribe(item => {
        this.router.navigate(['riepilogo']);
      })
  }

  showModal(id:number){

    var myModal = new bootstrap.Modal(document.getElementById(`exampleModal${id}`) as HTMLElement);
    myModal.show();

  }
}
