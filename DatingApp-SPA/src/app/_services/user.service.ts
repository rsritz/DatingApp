import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}
getUser(id): Observable<User> {
   return this.http.get<User>(this.baseUrl + 'users/' + id );
 }

// tslint:disable-next-line: typedef
UpdateUser(id: number, user: User ) {
  return this.http.put<User>(this.baseUrl + 'users/' + id , user);
}

}
