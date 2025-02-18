import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// import the auth service
import { AuthService } from '../../services/auth.service';

// import the angular material modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// import the angular logo
import { AppLogoComponent } from '../logo/logo.component';

@Component({
   standalone: true,
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      NgTemplateOutlet,
      CommonModule,
      RouterModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatDividerModule,
      AppLogoComponent,
   ],
})
export class NavBarComponent {
   constructor(public authService: AuthService, private router: Router) {}

   // signs out current user
   onClickSignOut(): void {
      this.authService.signOut().subscribe(() => {
         // redirects user to signin page
         this.router.navigateByUrl('/signin');
      });
   }
}
