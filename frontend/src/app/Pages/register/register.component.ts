import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../model/register-model';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  styles: ``
})
export class RegisterComponent implements OnInit{

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  fg!: FormGroup;

  ngOnInit(): void{
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  register(){
    const registerModel: RegisterModel = {
      email: this.fg.get('email')!.value,
      password: this.fg.get('password')!.value,
      passwordConfirm: this.fg.get('passwordConfirm')!.value,
      name: this.fg.get('name')!.value,
      emailVisibility: false
    }

    this.authService.register(registerModel)
    .then((res: RecordModel) => {
      if(res['token'] !== ''){
        this.router.navigateByUrl('/home');
      } else{
        this.router.navigateByUrl('/login')
      }
    })
  }
}
