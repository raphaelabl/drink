import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: ``
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  emailAddress: string = '';
  password: string = '';
  displayErrorMessage: boolean = false;

  login(){
    this.authService.login(this.emailAddress, this.password)
    .then((res:boolean) => {
      if(res){
      this.router.navigateByUrl('/home');
      }else{
        this.displayErrorMessage = true;
      }
    }
  )
  }

}
