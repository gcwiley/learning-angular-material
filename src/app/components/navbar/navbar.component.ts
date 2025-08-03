import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

// auth service
import { AuthService } from '../../services/auth.service';

// angular material 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

// angular logo
import { AppLogoComponent } from '../logo/logo.component';

@Component({
   standalone: true,
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    AppLogoComponent
],
})
export class NavBarComponent {
   // inject dependencies
   private authService = inject(AuthService);
   private router = inject(Router);
   private snackBar = inject(MatSnackBar);

   // loading state
   public isSigningOut = false;

   // signs out current user
  public onClickSignOut(): void {
    if (this.isSigningOut) return;
    this.isSigningOut = false;
    this.authService.signOutUser().subscribe({
      next: () => {
        // redirects user to signin page
        this.router.navigateByUrl('/signin');
      },
      error: (error) => {
        this.isSigningOut = false;
        console.error(error);
        this.snackBar.open('Error signing out.', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
