import { Component } from '@angular/core';
import { Città } from 'src/app/model/città';
import { MeteService } from 'src/app/service/mete.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meta } from 'src/app/model/meta';
import { AlloggiService } from 'src/app/service/alloggi.service';


@Component({
  selector: 'app-dettaglio-city',
  templateUrl: './dettaglio-city.component.html',
  styleUrls: ['./dettaglio-city.component.scss']
})
export class DettaglioCityComponent implements OnInit{

  city?:Città;
  sub!: Subscription;

  constructor(private srv: MeteService,  private rt: ActivatedRoute, private aSrv: AlloggiService){}

  ngOnInit(): void {
    this.sub = this.rt.params.subscribe(params => {
      const id = +params['id'];
      this.srv.getCittàById(id).subscribe(item => {
        console.table(item);
        this.city = item;
      })
    });
  }

  getMetaImgUrl():string{
    return this.srv.getMetaImgUrl(this.city!);
  }
}
