import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createFrom();
  }

  get controls() {
    return this.loginForm.controls;
  }

  private createFrom() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  public login() {
    if (this.loginForm.invalid) return;

    // Better to put credintials in a service ( login.service ), for better scalablity
    if (this.loginForm.value['email'] === 'hello@example.com' && this.loginForm.value['password'] === 'P@ssw0rd') {
      window.localStorage.setItem('token', 'AUTH_TOKEN');
      this.router.navigate(['/admin']);
    }
  }

}
