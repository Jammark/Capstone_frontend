import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { Meta } from 'src/app/model/meta';
import { MeteService } from 'src/app/service/mete.service';
import { OnInit } from '@angular/core';
import { Città } from 'src/app/model/città';
import { Destinazione } from 'src/app/model/destinazione';
import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  mete: Meta[] = [];
  città?: Città[];
  destinazioni?: Destinazione[];
  scroll:Map<number, boolean> = new Map();
  scroll2:Map<number, boolean> = new Map();
  user!: AuthData | null;
  checks:Map<number, boolean>= new Map();

  constructor(private authSrv: AuthService,private srv: MeteService, private router: Router){}
  ngAfterViewInit(): void {
    this.setup();
  }

  ngOnInit(): void {
    this.srv.getMostRatedCities().subscribe(città => {
        this.città = città;

        this.srv.getMostRatedDest().subscribe(dests => {
          this.destinazioni = dests;
          this.mete = this.mete.concat(this.destinazioni).concat(this.città!).sort((a,b) => a.nome < b.nome? -1 : 1);
          document.getElementById('r')!.style.backgroundImage=`url(${this.getMetaImgUrl(this.mete[0])}`;
          this.mete.forEach(m => this.checks.set(m.id, false));
        });
    });

    this.authSrv.user$.subscribe((_user) => {
      this.user = _user;


  });
  }

  setup():void{

    let h = window.innerHeight;
    let hc = document.getElementById('c')!.offsetTop +document.getElementsByTagName('nav')[0].offsetHeight;//document.getElementById('c')!.offsetHeight;
//    window.onload = () => {
    document.addEventListener("scroll", (event) => {
      let lastKnownScrollPosition = window.scrollY;
      Array.from<Element>(document.getElementsByClassName('card')).map(e => e as HTMLElement).forEach((target, index:number, array:HTMLElement[]) => {


      let current = this.scroll.get(index) ? this.scroll.get(index): false;
      let val = lastKnownScrollPosition + h > target!.offsetTop +hc;
      //lastKnownScrollPosition + h > target!.offsetTop + target!.offsetHeight && lastKnownScrollPosition > target!.offsetTop;
      this.scroll.set(index, val);


      if(this.scroll.get(index) != current && !current){
        document.getElementById('r')!.style.backgroundImage=`url(${this.getMetaImgUrl(this.mete[index])}`;
         // target.getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
        //  if(index < array.length - 1)
        //  array[index+1].getElementsByClassName('card-img-top')[0].classList.toggle('sticky-top');
        //  document.getElementById('topBar')!.classList.toggle('white');
      }

      if(val && lastKnownScrollPosition + h < target!.offsetTop + target!.offsetHeight){
        let header = target.getElementsByClassName('card-header')[0] as HTMLImageElement;
        let msr = (lastKnownScrollPosition - target!.offsetTop) / target!.offsetHeight - 0.5;
        header.style.opacity = `${1- 2*Math.abs(msr)}`;
      }
    });
  });

  document.addEventListener("scroll", (event) => {
    let lastKnownScrollPosition = window.scrollY;
    Array.from<Element>(document.getElementsByClassName('card')).map(e => e as HTMLElement).forEach((target, index:number, array:HTMLElement[]) => {


    let current = this.scroll2.get(index) ? this.scroll2.get(index): false;
    let val = lastKnownScrollPosition + h > target!.offsetTop + target!.offsetHeight +hc;
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



  mostraPacchetti(m:Meta):void{
    this.checks.set(m.id, true);
  }

  selectMeta(m:Meta):void{
    if(this.città?.find(e => e.id == m.id)){
      this.router.navigate([`/meta/citta/${m.id}`]);
    }else if(this.destinazioni?.find(e => e.id == m.id)){
      this.router.navigate([`/meta/dest/${m.id}`]);
    }

  }

}
