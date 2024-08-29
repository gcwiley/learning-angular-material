import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { FooterComponent } from '../../shared';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-signin-page',
   templateUrl: './signin-page.component.html',
   styleUrls: ['./signin-page.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatButtonModule,
      MatIconModule,
      FooterComponent,
   ],
})
export class SigninPageComponent {
   // inject the formBuilder class
   formBuilder = inject(FormBuilder);

   // inject the router and the auth service
   constructor(private router: Router, private authService: AuthService) {}

   // create the signin form with email and password fields
   signinForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
   });

   // Sign in with email and password
   onSubmitSignIn() {
      this.authService
         .signInWithEmailAndPassword(this.signinForm.value.email ?? '', this.signinForm.value.password ?? '')
         .then(() => {
            window.alert(); // fix this!
            // navigates user to the main page
            this.router.navigateByUrl('/');
         })
         // if error, display the error message
         .catch((error) => {
            window.alert(error.message);
         });
   }
}
