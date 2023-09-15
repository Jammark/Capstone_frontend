import { Component } from '@angular/core';
import { Città } from 'src/app/model/città';
import { Destinazione } from 'src/app/model/destinazione';
import { OnInit } from '@angular/core';
import { MeteService } from 'src/app/service/mete.service';
import { Router } from '@angular/router';
import { Meta } from 'src/app/model/meta';

@Component({
  selector: 'app-catalogo-mete-turistiche',
  templateUrl: './catalogo-mete-turistiche.component.html',
  styleUrls: ['./catalogo-mete-turistiche.component.scss']
})
export class CatalogoMeteTuristicheComponent implements OnInit{


  cities?:Città[];
  destinazioni?:Destinazione[];

  constructor(private srv: MeteService, private router: Router){}

  ngOnInit(): void {
    this.srv.getCittà().subscribe(lista => {
      this.cities = lista;
    });

    this.srv.getDestinazioni().subscribe(lista => {
      this.destinazioni = lista;
    })
  }

  selezionaCity(m:Meta){


    this.router.navigate([`/meta/citta/${m.id}`])
  }

  selezionaDest(m:Meta){


    this.router.navigate([`/meta/dest/${m.id}`])
  }

  getMetaImgUrl(meta:Meta):string{
    return this.srv.getMetaImgUrl(meta);
  }
}
