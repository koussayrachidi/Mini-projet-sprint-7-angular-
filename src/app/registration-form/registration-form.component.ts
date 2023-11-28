// registration-form.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent {
  user = new User();
  confirmPassword: string = '';
  erreur: number = 0;
  verificationCode: string = '';
  showVerificationCodeInput: boolean = false;

  constructor(private userService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.showVerificationCodeInput) {
      if (this.user.password !== this.confirmPassword) {
        this.erreur = 2;
        return;
      }
      if (this.user.username && this.user.password && this.user.password === this.confirmPassword) {

        this.userService.registerUser(this.user).subscribe(
          (response) => {
            console.log(response);
            // Redirect to the verification code input
            this.showVerificationCodeInput = true;
          },
          (error) => {
            console.error('Registration failed:', error);
            this.erreur = 1;
          }
        );
      }
    } else {
      // Verification logic
      this.userService.verifyUser(this.user.username, this.verificationCode).subscribe(
        (response) => {
          console.log('User verified successfully', response);

          this.userService.login(this.user).subscribe({
            next: (data) => {
              let jwToken = data.headers.get('Authorization')!;
              this.userService.saveToken(jwToken);
              this.router.navigate(['/']); 
            },
           
          })

          // You can redirect the user to a success page or perform other actions
        },
        (error) => {
          console.error('Error verifying user', error);
          this.erreur = 1;
        }
      );
    }
  }
}