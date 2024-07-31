import { Injectable, inject } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { UserModel } from '../../model/user-model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { RegisterModel } from '../../model/register-model';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)
  user$ = this.userSubject.asObservable();


  constructor() { }

  public async login(emailAdress: string, password: string): Promise<boolean>{
    const pb = new PocketBase(environment.baseUrl);
    const authData = await pb.collection('users').authWithPassword(emailAdress, password);

    this.userSubject.next({ isValid: pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token})

    return pb.authStore.isValid;
  }

  public async register(registerModel: RegisterModel): Promise<RecordModel>{
    const pb = new PocketBase(environment.baseUrl);

    return await pb.collection('users').create(registerModel);
  }

  public async logout(){
    const pb = new PocketBase(environment.baseUrl);
    await pb.authStore.clear();
  }

  public updateUserSubject(){
    const pb = new PocketBase(environment.baseUrl);
    this.userSubject.next({isValid: pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token})
  }

  async getUserId(): Promise<any>{
    const pb = new PocketBase(environment.baseUrl);
    return pb.authStore.model;
  }

  canActivate():boolean{
    const pb = new PocketBase(environment.baseUrl);
    return pb.authStore.isValid;
  }

}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivate();
}
