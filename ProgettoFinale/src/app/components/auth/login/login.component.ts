import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    isLoading = false;

    constructor(private authSrv: AuthService, private router: Router,
      private route: ActivatedRoute) {}

    ngOnInit(): void {}

    accedi(form: NgForm) {
        this.isLoading = true;
        console.log(form.value);
        try {
            this.authSrv.login(form.value).subscribe(res => {
              this.isLoading = false;
            alert('Login effettuato!');
            this.router.navigate(['/home']);
            }, err => {
              this.isLoading = false;
              alert('Login sbagliato!');
              console.error(err);
            });

         /*   this.isLoading = false;
            alert('Login effettuato!');
            this.router.navigate(['/movies']);*/
        } catch (error) {
          //  this.isLoading = false;
          //  alert('Login sbagliato!');
          //  console.error(error);
        }
    }
/*
    register():void{
      console.log('nav register');
      this.router.navigate(["/register"], { relativeTo: this.route });
    }
    */
}
