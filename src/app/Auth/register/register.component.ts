import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserCreateUpdateDto, UserDto, UserRole, UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';

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
    userId: any;
    constructor(
        private router: Router,
        private userFB: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');

        if (this.userId === '0') {
            this.myForm = this.userFB.group({
                name: ['', [Validators.required]],
                surname: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required], // Include 'password' field
                role: ['', [Validators.required]],
                phone: [''],
            });
        } else {
            this.myForm = this.userFB.group({
                name: ['', [Validators.required]],
                surname: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                role: ['', [Validators.required]],
                phone: [''],
            });
        }

        if (this.userId !== '0' && this.userId !== null && this.userId !== '0') {
            // Editing existing user
            this.userService.getUserById(Number(this.userId)).subscribe({
                next: (user) => {
                    this.myForm.patchValue({
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role,
                        phone: user.phone,
                    });
                },
                error: (error) => {
                    this.hasFormErrors = true;
                    this.toastr.error('Failed to fetch user details.');
                    console.error('Failed to fetch user details:', error);
                },
            });
        }
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.toastr.error('Formati i regjistrimit i pasakte!');
            this.hasFormErrors = true;
            return;
        }

        const name = this.myForm.controls['name'].value.trim();
        const surname = this.myForm.controls['surname'].value.trim();
        const email = this.myForm.controls['email'].value.trim();
        const role = this.myForm.controls['role'].value;
        const phone = this.myForm.controls['phone'].value.trim();

        let password = '';
        if (this.userId === '0') {
            // New user: include password field
            password = this.myForm.controls['password'].value ? this.myForm.controls['password'].value.trim() : '';
        }

        const userDto: UserCreateUpdateDto = {
            id: Number(this.userId),
            name,
            surname,
            email,
            password,
            role,
            phone,
        };

        console.log('Submitting form', userDto);

        this.userService.addEditUser(userDto).subscribe({
            next: (response) => {
                console.log(response);

                this.registerSuccessFlag = true;
                this.toastr.success('User edited successfully.');
                this.router.navigate(['manage-users']);
            },
            error: (error) => {
                this.hasFormErrors = true;
                this.toastr.error('Failed to edit user.');
            },
        });
    }
}
