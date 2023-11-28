import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
})
export class VerificationCodeComponent implements OnInit {
  username!: string;
  verificationCode: string = '';

  constructor(private route: ActivatedRoute, private userService:AuthService) {}

  ngOnInit() {
    // Extract username from the route parameters
    this.route.params.subscribe((params) => {
      this.username = params['username'];
    });
  }

  verifyUser() {
    // Call the service method to verify the user
    this.userService.verifyUser(this.username, this.verificationCode).subscribe(
      (response) => {
        console.log('User verified successfully', response);
        // You can redirect the user to a success page or perform other actions
      },
      (error) => {
        console.error('Error verifying user', error);
        // Handle error, show a message, or redirect to an error page
      }
    );
  }
}
