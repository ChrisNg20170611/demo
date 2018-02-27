import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  template: `
  <p>[user-list.component.ts] page</p>
  <div class="panel panel-default">
    <div class="panel-heading">List of Users</div>
    <div class="panel-body">
      <button routerLink="/new_user" class="btn btn-xs btn-success">Add New User from user-list.component by Router</button>
      <!--<a (click)="preAddUser()">Add NEW user in LIST page</a>-->
      <br />
    </div>
  </div>
  <div>
    <table class='table table-hover table-striped table-bordered'>
      <thead>
        <tr>
          <th key="1">User ID</th>
          <th key="2">Show User</th>  
          <th key="3">Show Email</th>
          <th key="4">Show Password</th>
          <th key="6">Modify By</th>
          <th key="7">Modify Date Time</th>
          <th key="5">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users" class='data-row' data-id={user.user_id} key={user.user_id}>
          <td>{{user.user_id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.password}}</td>
          <td>{{user.modify_by}}</td>
          <td>{{user.modify_date}}</td>
          <td>
            <div class="col-md-3">
              <button routerLink="/user/{{user.user_id}}" class="btn btn-xs btn-primary">Edit</button>
              <!-- <a (click)="selectUser(user)"> -->
            </div>
            <div class="col-md-2">
              <button (click)="selectUser(user)" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- CHRIS -->
  <div *ngIf="selectedUser" class="modal fade" id="deleteConfirmationModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Delete Item</h4>	
            </div>
            <div class="modal-body">
                <p>Are you sure want to delete User with User ID {{selectedUser.user_id}}?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" 
                id="deleteButton" 
                (click)="removeUser(selectedUser)"
                data-dismiss="modal">Delete Item</button>
            </div>
        </div>
    </div>
  </div>
  <!-- CHRIS END -->

  
  <!-- HERE: we add the template for the person details -->
  <!--
  <section *ngIf="inputDisFlag==='EDIT'">
    <h4>Update User box </h4>
    <h2>You selected:  {{selectedUser.user_id}}</h2>
    <h3>Description</h3>
    <p>
    Name: <input type="text" name="name" [(ngModel)]="selectedUser.name"> <br>
    Email: <input type="text" name="email" [(ngModel)]="selectedUser.email"> <br>
    Password: <input type="text" name="password" [(ngModel)]="selectedUser.password"> <br>
    </p>
    <button (click)="saveUserDetails(selectedUser)"> Edit User with ID {{selectedUser.user_id}}</button>
  </section>

  <section *ngIf="inputDisFlag==='NEW'">
    <h4>Create User box </h4>
    <h2>This is NEW user with fake user ID:  {{newUser.user_id}}</h2>
    <h3>Description</h3>
    <p>
    Name: <input type="text" name="name" [(ngModel)]="newUser.name"> <br>
    Email: <input type="text" name="email" [(ngModel)]="newUser.email"> <br>
    Password: <input type="text" name="password" [(ngModel)]="newUser.password"> <br>
    </p>
    <button (click)="addUser(newUser)"> Create New User on the same page</button>
  </section>
  -->
  `,
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  users: User[] = [
    {user_id:'default user id',name:"Mas Mapmup",email:"mapmup@gmail.com",password:"dncskdcndscsdcdsc",modify_by:"",modify_date:""}
  ];
  errorMessage: string = '';
  isLoading: boolean = true;

  selectedUser: User;
  inputDisFlag: string = ''; //Flag to control input box display

  constructor(private userService: UsersService) { 
  }

  ngOnInit() {
    //this.users = this.userService.getAll();
    this.userService
    .getAll()
    .subscribe(
       /* happy path */ u => this.users = u,
       /* error path */ e => this.errorMessage = e,
       /* onCompleted */ () => this.isLoading = false);
  }

  selectUser (user) {
    this.selectedUser = user;
    this.inputDisFlag = 'EDIT';
  }

  removeUser (user) {
    console.log('Deleting User: '+JSON.stringify(user.user_id));
    this.userService
    .delete(user.user_id)
    //.add(user)
    .subscribe(
       /* happy path */ r => {console.log(`Deleted user!!! ${user.user_id}`); this.refreshUserList();},
       /* error path */ e => console.log(`Error!!! ${this.errorMessage = e}`),
       /* onCompleted */ () => this.isLoading = false)
  }

  refreshUserList() {
    //this.users = this.userService.getAll();
    this.userService
    .getAll()
    .subscribe(
       /* happy path */ u => this.users = u,
       /* error path */ e => this.errorMessage = e,
       /* onCompleted */ () => this.isLoading = false);
  }

  //For single page only
  saveUserDetails(user){
    console.log('saveUserDetails this.user: '+user);
    this.userService
    .save(user)
    .subscribe(
      /* happy path */ r => {console.log(`saved!!! ${JSON.stringify(user)}`);this.refreshUserList();},
      /* error path */ e => this.errorMessage = e,
      /* onCompleted */ () => this.isLoading = false);

  }

  newUser: User;

  preAddUser () {
    this.newUser = {user_id:'new in same page',name:"new in same page",email:"new in same page",password:"new in same page",modify_by:"",modify_date:""};
    this.inputDisFlag = 'NEW';
  }

  addUser(user){
    console.log('NEW this.user: '+user);
    this.userService
    .add(user)
    .subscribe(
       /* happy path */ r => {console.log(`Add NEW user!!! ${JSON.stringify(user)}`);this.refreshUserList();},
       /* error path */ e => this.errorMessage = e,
       /* onCompleted */ () => this.isLoading = false);
    
  }
}
