import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginDataInterface } from '../../interfaces/login-data-interface';
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    RouterLink,
    FormsModule,
    InputTextModule,
    NgOptimizedImage
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

/*
  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false)
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue: LoginDataInterface = this.loginForm.value as LoginDataInterface;
      console.log(formValue);
      this.auth.signIn(formValue).then(r => console.log(r));
    }
  }
  */
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {

  }
}
