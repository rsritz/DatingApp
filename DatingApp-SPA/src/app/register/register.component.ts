import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() CancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register()
  {
    this.authService.register(this.model).subscribe( () =>{
      console.log('Registration succesfull!!');
    }, error => {
      console.log(error);
    }
    );
  }
  // tslint:disable-next-line: typedef
  cancel()
  {
    this.CancelRegister.emit(false);
    console.log('Cancelled!!');
  }

}
