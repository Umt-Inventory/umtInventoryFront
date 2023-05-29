import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Condition, ItemDto, ItemDtoById, ItemService, UserType} from '../services/item.service';
import {Subscription} from 'rxjs';
import {DialogItemComponent} from 'src/app/components/dialog-item/dialog-item.component';
import {MatDialog} from '@angular/material/dialog';

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
    private deleteSubscription: Subscription | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required, Validators.min(0)]],
            quantity: ['', [Validators.required, Validators.min(0)]],
            condition: ['', [Validators.required]],
            description: ['', [Validators.required]],
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
    onDelete() {
        const dialogRef = this.dialog.open(DialogItemComponent, {
            data: {
                title: 'Fshirja e Objektit',
                message: 'A jeni i sigurtë që doni të fshini këtë objekt?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const itemId = Number(this.itemId);
                this.deleteSubscription = this.itemService.deleteItem(itemId).subscribe({
                    next: () => {
                        this.toastr.success('Item deleted successfully.');
                        this.router.navigate(['/items', this.workspaceId]);
                    },
                    error: (error) => {
                        this.toastr.error('Failed to delete item.');
                        console.error('Failed to delete item:', error);
                    },
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.deleteSubscription) {
            this.deleteSubscription.unsubscribe();
        }
    }
}
