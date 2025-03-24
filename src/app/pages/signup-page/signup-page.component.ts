import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import {
   NavBarComponent,
   AnnouncementBannerComponent,
   FooterComponent,
} from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
   standalone: true,
   selector: 'app-signup-page',
   templateUrl: './signup-page.component.html',
   styleUrl: './signup-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatButtonModule,
      MatIconModule,
      NavBarComponent,
      AnnouncementBannerComponent,
      FooterComponent,
   ],
})
export class SignupPageComponent {
   constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
   ) {}

   // create the signup form with email and password fields
   public signupForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
   });

   // sign up with email and password
   public onSubmitSignUp(): void {
      // if the forms has validation errors, it returns early without doing anything
      if (this.signupForm.invalid) {
         return;
      }

      this.authService
         .createUserWithEmailAndPassword(
            this.signupForm.value.email!,
            this.signupForm.value.password!
         )
         .subscribe(() => {
            // redirects new user to homepage
            this.router.navigateByUrl('/');
         });
   }
}
