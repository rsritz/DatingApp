import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedtoken: any;

constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
login(model: any)
{
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) =>
    {
      const user = response;
      if (user)
      {
        localStorage.setItem('token', user.token);
        this.decodedtoken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedtoken);
      }
    })

  );
}

// tslint:disable-next-line: typedef
register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}
// tslint:disable-next-line: typedef
loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
