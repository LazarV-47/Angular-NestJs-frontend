import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.reducer';
import { Router, RouterModule } from '@angular/router';
import { selectAuthToken, selectUser } from '../auth/auth.selectors';
import { logout } from '../auth/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { User } from '../auth/user.model';
import { environment } from '../../environments/environments';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterModule, 
    MatFormField,
    CommonModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null = '';
  profilePicture: string | null = '';

  constructor(private store: Store<AuthState>, private router: Router) {
    this.store.select(selectUser).subscribe((user: User | null) => {
      if (user) {
        this.username = user.username;
        this.profilePicture = `${environment.backendUrl}${user.profilePicture}`;
      }
      else{
        console.log('User not found in state');
      }
    });
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
