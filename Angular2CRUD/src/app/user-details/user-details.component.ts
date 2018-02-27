import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { User } from '../user';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from "../users.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  @Input() user: User;
  sub:any;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['user_id'];
      console.log('getting user with id: ', id);
      this.userService.get(id).subscribe(u => this.user = u);
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  gotoUsersList(){
    let link = ['/users'];
    this.router.navigate(link);
  }

  /* 
  //alternatively use:
  gotoPeoplesList(){
      window.history.back();
  }
  */

  saveUserDetails(){
    console.log('saveUserDetails this.user: '+this.user);
    this.userService
    .save(this.user)
    .subscribe(
      /* happy path */ r => {console.log(`saved!!! ${JSON.stringify(this.user)}`);this.gotoUsersList();},
      /* error path */ e => this.errorMessage = e,
      /* onCompleted */ () => this.isLoading = false);

  }

}
