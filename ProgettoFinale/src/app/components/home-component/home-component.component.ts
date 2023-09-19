import { Component } from '@angular/core';
import { Meta } from 'src/app/model/meta';
import { MeteService } from 'src/app/service/mete.service';
import { OnInit } from '@angular/core';
import { Città } from 'src/app/model/città';
import { Destinazione } from 'src/app/model/destinazione';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit{

  mete: Meta[] = [];
  città?: Città[];
  destinazioni?: Destinazione[];
  scroll:Map<number, boolean> = new Map();
  scroll2:Map<number, boolean> = new Map();

  constructor(private srv: MeteService){}

  ngOnInit(): void {
    this.srv.getMostRatedCities().subscribe(città => {
        this.città = città;

        this.srv.getMostRatedDest().subscribe(dests => {
          this.destinazioni = dests;
          this.mete = this.mete.concat(this.destinazioni).concat(this.città!).sort((a,b) => a.nome < b.nome? -1 : 1);
          document.getElementById('r')!.style.backgroundImage=`url(${this.getMetaImgUrl(this.mete[0])}`;

        });
    });

    let h = window.innerHeight;//document.getElementById('c')!.offsetHeight;
//    window.onload = () => {
    document.addEventListener("scroll", (event) => {
      let lastKnownScrollPosition = window.scrollY;
      Array.from<Element>(document.getElementsByClassName('card')).map(e => e as HTMLElement).forEach((target, index:number, array:HTMLElement[]) => {


      let current = this.scroll.get(index) ? this.scroll.get(index): false;
      let val = lastKnownScrollPosition + h > target!.offsetTop;
      //lastKnownScrollPosition + h > target!.offsetTop + target!.offsetHeight && lastKnownScrollPosition > target!.offsetTop;
      this.scroll.set(index, val);


      if(this.scroll.get(index) != current && !current){
        document.getElementById('r')!.style.backgroundImage=`url(${this.getMetaImgUrl(this.mete[index])}`;
         // target.getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
        //  if(index < array.length - 1)
        //  array[index+1].getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
        //  document.getElementById('topBar')!.classList.toggle('white');
      }
    });
  });

  document.addEventListener("scroll", (event) => {
    let lastKnownScrollPosition = window.scrollY;
    Array.from<Element>(document.getElementsByClassName('card')).map(e => e as HTMLElement).forEach((target, index:number, array:HTMLElement[]) => {


    let current = this.scroll2.get(index) ? this.scroll2.get(index): false;
    let val = lastKnownScrollPosition + h > target!.offsetTop + target!.offsetHeight;
    //lastKnownScrollPosition + h > target!.offsetTop + target!.offsetHeight && lastKnownScrollPosition > target!.offsetTop;
    this.scroll2.set(index, val);


    if(this.scroll2.get(index) != current && current){
      document.getElementById('r')!.style.backgroundImage=`url(${this.getMetaImgUrl(this.mete[index])}`;
       // target.getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
      //  if(index < array.length - 1)
      //  array[index+1].getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
      //  document.getElementById('topBar')!.classList.toggle('white');
    }
  });
});
//}

  }

  getMetaImgUrl(meta:Meta):string{
    return this.srv.getMetaImgUrl(meta);
  }

}
