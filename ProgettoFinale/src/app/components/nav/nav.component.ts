import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AuthData } from '../auth/auth-data.interface';
import { AuthService } from '../auth/auth.service';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  user!: AuthData | null;
  utente?: User | null;

  count:number=0;

  constructor(private authSrv: AuthService, private userSrv: UserService, private pSrv: PrenotazioniService, private router: Router) {}

  ngOnInit(): void {
      this.authSrv.user$.subscribe((_user) => {
          this.user = _user;
          if(_user?.user){
            this.userSrv.getUser(_user?.user.id).subscribe(item => {
              this.utente = item;
              this.userSrv.registra(item);
            })
          }

      });

      this.userSrv.user$.subscribe(item => {
        this.utente = item;
      });

      this.pSrv.getSaldo().subscribe(lista => {
        this.count = lista.length;
      });

      this.router.events.subscribe((val) => {
        // see also
        if(val instanceof NavigationEnd) {
          this.pSrv.getSaldo().subscribe(lista => {
            this.count = lista.length;
          });
        }
    });
  }

  logout() {
      this.authSrv.logout();
  }

  hasPermissions():boolean{
    return this.userSrv.hasWritePermission();
  }
}
