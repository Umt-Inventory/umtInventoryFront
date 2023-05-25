import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    myForm: FormGroup | any;
    hasFormErrors = false;
    loginSuccesFlag = false;
    hide = true;

    constructor(private router: Router, private userFB: FormBuilder) {}

    ngOnInit() {
        this.myForm = this.userFB.group({
            username: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            password: [null, Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        const username = this.myForm.controls['username'].value.trim();
        const passw = this.myForm.controls['password'].value.trim();
        console.log('Login successful');
    }
}
