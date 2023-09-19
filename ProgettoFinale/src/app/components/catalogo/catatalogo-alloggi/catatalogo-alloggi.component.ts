import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Appartamento } from 'src/app/model/appartamento';
import { Hotel } from 'src/app/model/hotel';
import { OnInit } from '@angular/core';
import { MeteService } from 'src/app/service/mete.service';
import { ActivatedRoute } from '@angular/router';
import { AlloggiService } from 'src/app/service/alloggi.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Alloggio } from 'src/app/model/alloggio';
import { OnChanges } from '@angular/core';
import { RatingService } from 'src/app/service/rating.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-ctatalogo-alloggi',
  templateUrl: './catatalogo-alloggi.component.html',
  styleUrls: ['./catatalogo-alloggi.component.scss']
})
export class CatatalogoAlloggiComponent implements OnInit, OnChanges, AfterViewChecked{

  @Input()
  metaId?:number;
  @Input()
  metaIds?:number[];
  hotels?:Hotel[];
  appartamenti?:Appartamento[];
  sub?:Subscription;

  rating:Map<number,  HTMLElement[]> = new Map();

  private alloggioSubj = new BehaviorSubject<null | Alloggio>(null);
  @Output() emit = new EventEmitter<Alloggio>();
  alloggio$ = this.alloggioSubj.asObservable();

  constructor(private srv: MeteService,  private rt: ActivatedRoute, private aSrv: AlloggiService, private rSrv : RatingService){}
  ngAfterViewChecked(): void {
      this.setupRating();
  }
  ngAfterViewInit(): void {

   }

   loadData(){
    this.aSrv.getHotelsByMeta(this.metaId!).subscribe(lista => {
      this.hotels = lista;
      console.log('lista hotel length: '+ this.hotels.length);
      this.setupRating();

    });

    this.aSrv.getAppartamentiByMeta(this.metaId!).subscribe(lista => {
      this.appartamenti = lista;

      console.log('lista appartamenti length: '+ lista.length);
      console.table(this.appartamenti);
      this.setupRating();
    });
   }

   loadMultipleData(){
    this.hotels = [];
    this.appartamenti = [];
    this.metaIds?.forEach(id => {
      this.aSrv.getHotelsByMeta(id).subscribe(lista => {
        lista.forEach(e => this.hotels?.push(e))
        console.log('lista hotel length: '+ this.hotels!.length);
        this.setupRating();

      });

      this.aSrv.getAppartamentiByMeta(id).subscribe(lista => {
        lista.forEach(e => this.appartamenti?.push(e));

        console.log('lista appartamenti length: '+ lista.length);
        console.table(this.appartamenti);
        this.setupRating();
      });
    });
   }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['metaId']){
      if(this.metaId){
     this.loadData();
    }
    }

    if(changes['metaIds']){
      this.loadMultipleData();
    }
  }

  setupRating():void{
    this.hotels?.forEach(e => this.rating.set(e.id, []));
    this.appartamenti?.forEach(e => this.rating.set(e.id, []));
    this.hotels?.map(e => e.id).forEach(id => this.populateContainer(id));
    this.appartamenti?.map(e => e.id).forEach(id => this.populateContainer(id));

  }

  ngOnInit(): void {
    this.alloggioSubj.subscribe(a => {
      this.emit.emit(a ? a : undefined);
  });

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

  populateContainer(id:number):boolean{
    console.log('rate layout for id: '+id);
    let container = document.getElementById('rateContainer'+id);
    console.table(id+' container '+container);
  //  container!.innerHTML = '';
    let alloggio : Alloggio | undefined;
    let h = this.hotels?.find(e => e.id == id);
    alloggio = h? h : this.appartamenti?.find(e => e.id == id);

    for(let i = 0; i < 5; i++){//vengono aggiunte le 10 stelline di rating
      //  let parent = document.createElement('li');
        let child: HTMLImageElement = container?.getElementsByClassName('star')[i] as HTMLImageElement;
        //child.setAttribute('src','../../../');
        console.table(i+' child '+child);
        child.classList.add(alloggio!.rate > i ? 'on':'off');
      //  child.classList.add('mx-2', 'star');
     //   parent.appendChild(child);
       // container?.appendChild(parent);
     //   let stars: HTMLElement[] | undefined =  this.rating.get(id);
     //   stars?.push(child);
     let modalContainer = document.getElementById('rateModal'+id);
     let array = Array.prototype.slice.call(modalContainer!.getElementsByClassName('star')) as HTMLImageElement[];
     for(let i = 0; i< array.length; i++){
        let element = array[i];
        element.classList.add('off');
     }
     child = modalContainer?.getElementsByClassName('star')[i] as HTMLImageElement;

        child.onclick = () => {//al click sulla stella vengono distinte le classi per quelle accese o spente in 2 cicli for distinti
          let stars = modalContainer?.getElementsByTagName('img');
          console.log('click star n: '+i);


            for(let j=0; j <= i; j++){
              stars![j].classList.remove('off');
              stars![j].classList.add( 'on');

          }
          for(let j = i +1; j < 5; j++){
              stars![j].classList.remove('on');
              stars![j].classList.add( 'off');
          }



        };


    }
    return true;
}

reloadData():void{
  if(this.metaId){
    this.loadData();
  }else if(this.metaIds){
    this.loadMultipleData();
  }
}

showModalVoto(id:number){
  var myModal = new bootstrap.Modal(document.getElementById(`exampleModal`+id) as HTMLElement);
  myModal.show();
}

vota(id:number):void{
  let container = document.getElementById('rateModal'+id);
  let stars: HTMLElement[] = Array.prototype.slice.call(container?.getElementsByTagName('img'));
  let i = stars.filter(e => e.classList.contains('on')).length;
  this.rSrv.votaAlloggio(i, id).subscribe(rate => {
      this.reloadData();
   } );
}
}
