import { Component, Input } from '@angular/core';
import { Alloggio } from 'src/app/model/alloggio';
import { Prenotazione } from 'src/app/model/prenotazione';
import { Trasporto } from 'src/app/model/trasporto';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';

@Component({
  selector: 'app-prenotazione-helper',
  templateUrl: './prenotazione-helper.component.html',
  styleUrls: ['./prenotazione-helper.component.scss']
})
export class PrenotazioneHelperComponent {

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

  constructor(private srv: PrenotazioniService){}

  submit():void{
      this.checked = true;
  }

  setAndata(t:Trasporto):void{
    this.viaggioAndata = t;
  }

  setRitorno(t:Trasporto):void{
    this.viaggioRitorno = t;
  }
}
