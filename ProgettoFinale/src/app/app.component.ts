import { Component } from '@angular/core';
import { AuthData } from './components/auth/auth-data.interface';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProgettoFinale';



  user!: AuthData | null;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
      this.authSrv.user$.subscribe((_user) => {
          this.user = _user;
      });
  }
}
