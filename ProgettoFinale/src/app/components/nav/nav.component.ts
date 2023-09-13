import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AuthData } from '../auth/auth-data.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  user!: AuthData | null;
  utente?: User | null;

  constructor(private authSrv: AuthService, private userSrv: UserService) {}

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
  }

  logout() {
      this.authSrv.logout();
  }

  hasPermissions():boolean{
    return this.userSrv.hasWritePermission();
  }
}
