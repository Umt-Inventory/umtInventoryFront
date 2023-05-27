import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserCreateUpdateDto, UserRole, UserService} from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    myForm!: FormGroup;
    hasFormErrors = false;
    registerSuccessFlag = false;
    hide = true;
    userRoles = Object.keys(UserRole).filter((key) => isNaN(Number(key))); // To populate the role dropdown

    constructor(private router: Router, private userFB: FormBuilder, private userService: UserService,private toastr: ToastrService ) {}

    ngOnInit() {
        this.myForm = this.userFB.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: [null, Validators.compose([Validators.required])],
            role: ['', [Validators.required]], // Add Role to the form
            phone: [''], // Add phone to the form
        });
    }

    onSubmit() {
        if (this.myForm.invalid) {
            
            this.toastr.error('Formati i regjistrimit i pasakte!');
            this.hasFormErrors = true;
            return;
        }

        const userDto: UserCreateUpdateDto = {
            id: 0, // Assuming a new user is being created
            name: this.myForm.controls['name'].value.trim(),
            surname: this.myForm.controls['surname'].value.trim(),
            email: this.myForm.controls['email'].value.trim(),
            password: this.myForm.controls['password'].value.trim(),
            role: this.myForm.controls['role'].value,
            phone: this.myForm.controls['phone'].value.trim(),
        };

        this.userService.addEditUser(userDto).subscribe({
            next: (response) => {
                this.registerSuccessFlag = true;
                this.toastr.success('Regjistrimi u krye me sukses');
                this.router.navigate(['manage-users']); // replace 'buildings' with your own path
            },
            error: (error) => {
                this.hasFormErrors = true;
                this.toastr.error('Regjistrimi deshtoi!');
                // handle error
            },
        });
    }
}
