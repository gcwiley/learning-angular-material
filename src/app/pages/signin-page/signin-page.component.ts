import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import the shared components
import { FooterComponent } from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
   standalone: true,
   selector: 'app-signin-page',
   templateUrl: './signin-page.component.html',
   styleUrls: ['./signin-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      FormsModule,
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
   constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

   // create the signin form with email and password fields
   public signinForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
   });

   // sign in with email and password
   public onSubmitSignIn(): void {
      this.authService.signInWithEmailAndPassword(this.signinForm.value.email!, this.signinForm.value.password!).subscribe(() => {
         // redirects user to homepage
         this.router.navigateByUrl('/')
      })
   }
}
