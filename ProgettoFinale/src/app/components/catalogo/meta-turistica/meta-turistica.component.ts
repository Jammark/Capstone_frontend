import { Component, Type } from '@angular/core';
import { Meta } from 'src/app/model/meta';
import { Città } from 'src/app/model/città';
import { MeteService } from 'src/app/service/mete.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Destinazione } from 'src/app/model/destinazione';

@Component({
  selector: 'app-meta-turistica',
  templateUrl: './meta-turistica.component.html',
  styleUrls: ['./meta-turistica.component.scss']
})
export class MetaTuristicaComponent implements OnInit{

  città?:Città;
  destinazione?:Destinazione;
  sub!: Subscription;

  constructor(private srv: MeteService,  private rt: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.sub = this.rt.params.subscribe(params => {
      const id = +params['id'];
      const type: string = params['type'];
   /*   switch(type){
        case 'città':{
          this.srv.getCittàById(id).subscribe(città =>{
            this.città = città;
            this.srv.register(this.città!);
            this.router.navigate(['/città', {relativeTo: this.rt}]);
          })
          break;
        }
        case 'dest':{
          this.srv.getDestinazioneById(id).subscribe(dest => {
            this.destinazione = dest;
            this.srv.register(this.destinazione!);
            this.router.navigate(['/dest', {relativeTo: this.rt}]);
          })
          break;
        }
        default:{
          console.log('errore di navigazione con parametro type: '+ type);
        }
      }*/
  })
  }


}
