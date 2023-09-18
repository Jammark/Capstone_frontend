import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stazione } from 'src/app/model/stazione';
import { Trasporto } from 'src/app/model/trasporto';
import { Volo } from 'src/app/model/volo';
import { TrasportiService } from 'src/app/service/trasporti.service';
import { DateUtil } from 'src/app/util/date-util';

@Component({
  selector: 'app-ricerca-trasporto',
  templateUrl: './ricerca-trasporto.component.html',
  styleUrls: ['./ricerca-trasporto.component.scss']
})
export class RicercaTrasportoComponent implements OnInit,OnChanges{

  @Input()
  data?:Date;
  @Input()
  partenza?:string;
  @Input()
  arrivo?:string;

  @Input()
  titolo?:string;

  voli?:Volo[];

  private voloSubj = new BehaviorSubject<null | Volo>(null);
  @Output() emitter = new EventEmitter<Trasporto>();
  volo$ = this.voloSubj.asObservable();

  constructor(private srv: TrasportiService){}


  ngOnInit(): void {
      this.voloSubj.subscribe(item => {
        this.emitter.emit(item ? item : undefined);
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.table(this.data);
    console.table(this.partenza);
    console.table(this.arrivo);
    if(this.data && this.partenza && this.arrivo){
      this.srv.cercaVoli(this.partenza, this.arrivo, DateUtil.formatDate(this.data)).subscribe(val =>{
          this.voli = val;
          console.table(val);
      })
    }
  }

  select(v:Volo):void{
    this.voloSubj.next(v);
  }

  getLoclt(s:Stazione):string{
    return s.località;
  }
}
