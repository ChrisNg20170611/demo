import { Injectable } from '@angular/core';
import { User } from './user';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/obervable/throw';

const USER: User[] = [
];

@Injectable()
export class UsersService {
  private baseUrl: string = 'http://10.89.73.15:3000/api';

  constructor(private http : Http){
  }
  
  //Service 1: Get all users
  getAll(): Observable<User[]>{

    let user$ = this.http
    .get(`${this.baseUrl}/user`, {headers: this.getHeaders()})
    .map(mapUsers);
    //.catch(handleError);
    return user$;
  }
  
  /*
  getAll(): User[] {
    return USER;
  }
  */

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  //Service 2a: Get individual user to edit
  get(id: string) : Observable<User> {
    //return USER.find(p => p.user_id === id);
    let user$ = this.http
      .get(`${this.baseUrl}/user/${id}`, {headers: this.getHeaders()})
      .map(mapUser);
      //.catch(handleError);
      return user$;
  }

  //Service 2b: Save edited user
  save(user: User) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't 
    // is read-only. But it would look like this:
    return this
    .http
    .put(`${this.baseUrl}/user/${user.user_id}`, 
          user, 
          {headers: this.getHeaders()});
  }

  //Service 3: Create new user
  add(user: User) : Observable<Response>{
    return this
    .http
    .post(`${this.baseUrl}/user/`, 
          user, 
          {headers: this.getHeaders()});
  }

  //Service 4: Delete user
  delete(id: string) :  Observable<User> {
    let user$ = this.http
    .delete(`${this.baseUrl}/user/${id}`, {headers: this.getHeaders()})
    .map(toUser); //Error is using mapUsers
    //.catch(handleError);
    return user$;
  }
}

function mapUsers(response:Response): User[]{
  //throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  //console.log('mapUsers: '+JSON.stringify(response.json()));
  return response.json().map(toUser)
}

function toUser(r:any): User{
  let user = <User>({
    user_id: r.user_id,
    name: r.name,
    email: r.email,
    password: r.password,
    modify_by: r.modify_by,
    modify_date: r.modify_date
  });
  return user;
}

function mapUser(response:Response): User{
   // toPerson looks just like in the previous example
   return toUser(response.json());
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

