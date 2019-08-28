import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logged: false;
  username: string;
  password: string;

  constructor(private formBuilderService: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['shop']);
    }

    this.loginForm = this.formBuilderService.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  }

}
