import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginServiceService} from '../services/login-service.service';
import {TokenServiceService} from '../services/token-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    myForm: FormGroup | any;
    hasFormErrors = false;
    loginSuccesFlag = false;
    hide = true;
    decodedToken: any;

    constructor(
        private router: Router,
        private userFB: FormBuilder,
        private loginService: LoginServiceService,
        private tokenService: TokenServiceService
    ) {}

    ngOnInit() {
        this.myForm = this.userFB.group({
            email: ['', [Validators.required]],
            password: [null, Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.hasFormErrors = true;
            return;
        }

        const email = this.myForm.controls['email'].value.trim();
        const passw = this.myForm.controls['password'].value.trim();

        this.loginService.Login(email, passw).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token);
                this.decodedToken = this.tokenService.decodeToken(response.token);
                console.log(this.decodedToken); // This will print decoded token data on the console
                localStorage.setItem('role', this.decodedToken.role);
                this.loginSuccesFlag = true;
                this.router.navigate(['buildings']);
            },
            error: (error) => {
                console.log(error);
                this.hasFormErrors = true;
            },
        });
    }
}
