import { Component } from '@angular/core';
import { AuthData } from './components/auth/auth-data.interface';
import { AuthService } from './components/auth/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProgettoFinale';

  switch:boolean = false;

  user!: AuthData | null;

  errorMsg?:string | null;

  constructor(private authSrv: AuthService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(val => {
      this.switch = router.url.endsWith('login') || router.url.endsWith('register');
    })

  }

  ngOnInit(): void {
      this.authSrv.user$.subscribe((_user) => {
          this.user = _user;
      });

      this.authSrv.msg$.subscribe(msg => {
        if(!msg){
          return;
        }
        this.errorMsg = msg;
        this.showModal();
      })
  }

  closeModal():void{
   // $('#modalWarning').hide();

  }

  showModal(){
    var myModal = new bootstrap.Modal(`#modalWarning`);
    let val = $('#modalWarning').hasClass('show');

    if(val){
      return;
    }
    //myModal.show();
    $('#modalWarning').modal('show');
  }
}
