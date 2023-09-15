import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Città } from 'src/app/model/città';
import { Destinazione } from 'src/app/model/destinazione';
import { MeteService } from 'src/app/service/mete.service';

@Component({
  selector: 'app-dettaglio-meta-turistica',
  templateUrl: './dettaglio-meta-turistica.component.html',
  styleUrls: ['./dettaglio-meta-turistica.component.scss']
})
export class DettaglioMetaTuristicaComponent implements OnInit{


  dest?:Destinazione;
  sub!: Subscription;
  cities:Map<number, string>= new Map();

  constructor(private srv: MeteService,  private rt: ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.rt.params.subscribe(params => {
      const id = +params['id'];
      this.srv.getDestinazioneById(id).subscribe(item => {
        console.table(item);
        this.dest = item;
        this.dest.cityIds.forEach(id => {
          this.srv.getCittàById(id).subscribe(item =>{
            this.cities.set(item.id, item.nome);
          })
        })
      })
    });
  }

  getMetaImgUrl():string{
    return this.srv.getMetaImgUrl(this.dest!);
  }
}
