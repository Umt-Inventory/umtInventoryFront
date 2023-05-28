import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
    myForm!: FormGroup;
    hide: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService, // Injecting the user service
        private toastr: ToastrService,
        private router: Router

    ) {}

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        if (this.myForm.valid) {
            const oldPassword = this.myForm.controls['oldPassword'].value.trim();
            const newPassword = this.myForm.controls['newPassword'].value.trim();

            // Retrieve the user ID from local storage
            const userId = localStorage.getItem('id');

            if (userId) {
                // Call your UserService to change the password
                this.userService.ChangePassword(Number(userId), oldPassword, newPassword).subscribe({
                    next: () => {
                        this.myForm.reset();
                        this.toastr.success('Fjalekalimi  u ndryshua me sukses!');
                        this.router.navigate(['']);

                    },
                    error: (error) => {
                        // Handle error here
                        console.error(error);
                        this.toastr.error('Error');
                    },
                });
            } else {
                // Handle the case when the user ID is not found in local storage
                this.toastr.error('Nuk u gjet perdorues me kete ID.');
                
            }
        }
    }
}
