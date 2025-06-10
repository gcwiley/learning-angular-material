import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

// auth service
import { AuthService } from '../../services/auth.service';

// angular material 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MatToolbarModule,
    MatDividerModule,
    AppLogoComponent
],
})
export class NavBarComponent {
   constructor(public authService: AuthService, private router: Router) {}

   // signs out current user - fix this!
   public onClickSignOut(): void {
      this.authService.signOutUser().subscribe(() => {
         // redirects user to signin page
         this.router.navigateByUrl('/signin');
      });
   }
}
