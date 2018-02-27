import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UsersService } from "../users.service";

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styles: []
})
export class UserNewComponent implements OnInit, OnDestroy {

  @Input() user: User;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.user = {user_id:'',name:"",email:"",password:"", modify_by:"", modify_date:""};
  }

  ngOnDestroy(){
  }

  //for Back to user list button
  gotoUsersList(){
    let link = ['/users'];
    this.router.navigate(link);
  }

  addUser(){
    console.log('NEW this.user: '+this.user);
    this.userService
    .add(this.user)
    .subscribe(
       /* happy path */ r => {console.log(`Add NEW user!!! ${JSON.stringify(this.user)}`);this.gotoUsersList();},
       /* error path */ e => this.errorMessage = e,
       /* onCompleted */ () => this.isLoading = false);
    
  }
}
