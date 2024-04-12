import { Component, OnInit } from '@angular/core';
import { first, takeUntil } from "rxjs";
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { Auth } from "src/app/models/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends MemoryLeaksProtectedComponent {
  auth: Auth = new Auth;

  constructor(private AuthService: AuthService) {
    super()
   }

  ngOnInit(): void {
  }
  register(auth: Auth){
    this.AuthService.register(auth)
    .pipe(first(), takeUntil(this.destroyed$))
    .subscribe({ 
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
