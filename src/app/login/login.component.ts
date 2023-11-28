import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur=0;


  constructor(private authService : AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }


    onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
           this.router.navigate(['/']); 
        },
        error: (err: any) => {
        this.erreur = 1; 
        }
        });
        
        
    }

}
