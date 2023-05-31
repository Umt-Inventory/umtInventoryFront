import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Condition, ItemDto, ItemDtoById, ItemService, UserType} from '../services/item.service';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
    myForm!: FormGroup;
    hasFormErrors = false;
    workspaceId: string | null = null;
    itemId: any;
    conditions = Object.values(Condition);
    types = Object.values(UserType);
    item: ItemDtoById | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService
    ) {}

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            quantity: ['', [Validators.required, Validators.min(0)]],
            condition: ['', [Validators.required]],
            description: [''],
            type: ['', [Validators.required]],
        });

        this.workspaceId = this.route.snapshot.paramMap.get('workspaceId');
        this.itemId = this.route.snapshot.paramMap.get('itemId');

        console.log(this.itemId);
        if (this.itemId != 0) {
            this.itemService.getItemById(Number(this.itemId)).subscribe({
                next: (item) => {
                    console.log(item);
                    console.log(this.itemId);

                    this.myForm.patchValue({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        condition: item.condition,
                        description: item.description,
                        type: item.type,
                    });
                },
                error: (error) => {
                    this.hasFormErrors = true;

                    this.router.navigate(['/buildings']);
                    console.error('Failed to fetch item details:', error);
                },
            });
        }
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.hasFormErrors = true;
            this.toastr.error('Please fill in all required fields.');
            return;
        }

        const item: ItemDto = {
            id: Number(this.itemId),
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
                this.toastr.success('Item edited successfully.');
                this.router.navigate(['/items', this.workspaceId]);
            },
            (error) => {
                this.hasFormErrors = true;
                this.toastr.error('Failed to edit item.');
            }
        );
    }
}
