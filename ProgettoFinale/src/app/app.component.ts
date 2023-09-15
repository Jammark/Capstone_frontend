import { Component } from '@angular/core';
import { AuthData } from './components/auth/auth-data.interface';
import { AuthService } from './components/auth/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProgettoFinale';

  switch:boolean = false;

  user!: AuthData | null;

  constructor(private authSrv: AuthService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(val => {
      this.switch = router.url.endsWith('login') || router.url.endsWith('register');
    })

  }

  ngOnInit(): void {
      this.authSrv.user$.subscribe((_user) => {
          this.user = _user;
      });
  }
}
