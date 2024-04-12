import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MemoryLeaksProtectedComponent } from 'src/app/components/memory-leaks-protected.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent extends MemoryLeaksProtectedComponent {

  users: User[] = [];

  constructor(private userService: UserService) {
    super();
   }

  ngOnInit(): void {
    this.userService.getUsers()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: User[]) => (this.users= result));
  }

  public promoteUser(user: User){
    this.userService.promoteUser(user)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: User[]) => (this.users= result));
  }

  public deleteUser(user:User){
    this.userService.deleteUser(user)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: User[]) => (this.users= result));
  }

}
