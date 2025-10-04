import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// auth service
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup-page',
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SignupPage {
  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

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
      .createUserWithEmailAndPassword(this.signupForm.value.email!, this.signupForm.value.password!)
      .subscribe(() => {
        // redirects new user to homepage
        this.router.navigateByUrl('/');
      });
  }
}
