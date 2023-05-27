import {Component, OnInit, Type} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ItemService, ItemDto, Condition, UserType} from '../services/item.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
    myForm!: FormGroup;
    hasFormErrors = false;
    registerSuccessFlag = false;
    types: UserType[] = Object.values(UserType) as UserType[];
    conditions: Condition[] = Object.values(Condition) as Condition[];
    workspaceId: any;
    constructor(
        private formBuilder: FormBuilder,
        private itemService: ItemService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.workspaceId = this.route.snapshot.paramMap.get('id') || '';

        this.myForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            quantity: ['', [Validators.required, Validators.min(0)]],
            condition: ['', [Validators.required]],
            description: ['', [Validators.required]],
            type: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.hasFormErrors = true;
            this.toastr.error('Please fill in all required fields.');
            return;
        }

        const item: ItemDto = {
            id: 0,
            price: this.myForm.controls['price'].value,
            quantity: this.myForm.controls['quantity'].value,
            condition: this.myForm.controls['condition'].value,
            description: this.myForm.controls['description'].value,
            name: this.myForm.controls['name'].value,
            type: this.myForm.controls['type'].value,
            workspaceId: Number(this.workspaceId),
        };

        this.itemService.addEditItem(item).subscribe(
            (response) => {
                this.registerSuccessFlag = true;
                this.toastr.success('Item added/edited successfully.');
                this.location.back();
            },
            (error) => {
                this.hasFormErrors = true;
                this.toastr.error('Failed to add/edit the item.');
            }
        );
    }
}
