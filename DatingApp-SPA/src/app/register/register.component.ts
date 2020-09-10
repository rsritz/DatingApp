import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() CancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  register()
  {
    this.authService.register(this.model).subscribe( () =>{
      this.alertify.success('Registration succesfull!!');
    }, error => {
      this.alertify.error(error);
    }
    );
  }
  // tslint:disable-next-line: typedef
  cancel()
  {
    this.CancelRegister.emit(false);
    this.alertify.message('Cancelled!!');
  }

}
