import { Component, OnInit } from "@angular/core";
import { first, takeUntil } from "rxjs";
import { Auth } from "src/app/models/auth";
import { AuthService } from "src/app/services/auth.service";
import {JWT} from "src/app/models/jwt"
import { Router } from "@angular/router";
import { MemoryLeaksProtectedComponent } from "src/app/components/memory-leaks-protected.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends MemoryLeaksProtectedComponent {
  auth: Auth = new Auth;

  constructor(private authService: AuthService, private router: Router) {
    super()
   }

  ngOnInit(): void { 
    
  }


  login(auth:Auth){
    this.authService
    .login(auth)
    .pipe(first(), takeUntil(this.destroyed$))
    .subscribe({ 
      next: jwt => {
        this.authService.authenticate(jwt);
        // console.log('NAVIGATE');
        
        this.router.navigate(['/buildings']);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
