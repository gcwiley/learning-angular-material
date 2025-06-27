import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

// auth service
import { AuthService } from '../../services/auth.service';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-auth-status',
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
})
export class AuthStatusComponent {
  // inject dependencies
  private authService = inject(AuthService);
  private router = inject(Router);

  // expose the isAuthenticated observable from the service
  public isUserLoggedIn$: Observable<boolean> = this.authService.isAuthenicated$;

  // expose user email
  public userEmail$: Observable<string | null> = this.authService.user$.pipe(
    map((user) => user?.email ?? null)
  );

  // signs out current user
  public onClickSignOut(): void {
    this.authService.signOutUser().subscribe({
      next: () => {
        this.router.navigateByUrl('/signin');
      },
      error: (error) => {
        console.error('Error signing out:', error);
      },
    });
  }
}
