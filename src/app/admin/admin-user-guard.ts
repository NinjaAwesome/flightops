import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  public user: any;
  constructor(
    private authService: AuthService,
  ) { }

  canActivate() {
    if(this.authService.loggedIn()) return true;
    return false;
  }
}
