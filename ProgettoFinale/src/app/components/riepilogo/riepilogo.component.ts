import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acquisto } from 'src/app/model/acquisto';
import { Alloggio } from 'src/app/model/alloggio';
import { Prenotazione } from 'src/app/model/prenotazione';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit{

acquisti?:Acquisto[];
alloggi:Map<number, Alloggio>=new Map();

constructor(private srv: PrenotazioniService, private aSrv : AlloggiService, private router: Router){}

  ngOnInit(): void {
    this.srv.getRiepilogo().subscribe(list => {
      this.acquisti = list;
      list.map(e => e.prenotazione.alloggioId).forEach(id => {
        this.aSrv.getHotelById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
        })

        this.aSrv.getAppartamentoById(id).subscribe(item => {
          this.alloggi.set(item.id, item);
        })
      });
    });
  }

  getAlloggio(id:number):Alloggio | undefined{
    return this.alloggi.get(id);
  }

  chiudi():void{
    this.router.navigate(['/home']);
  }
}
