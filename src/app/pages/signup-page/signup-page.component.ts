import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import the shared components
import { FooterComponent } from '../../components';

// import the auth service
import { AuthService } from '../../services/auth.service';

@Component({
   standalone: true,
   selector: 'app-signup-page',
   templateUrl: './signup-page.component.html',
   styleUrl: './signup-page.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [],
})
export class SignupPageComponent {
   constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

   public onSubmitSignUp() {
      this.authService.createUserWithEmailAndPassword();
   }
}
