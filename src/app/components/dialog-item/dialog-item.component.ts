import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Condition, UserType} from 'src/app/Screens/services/item.service';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'app-dialog-item',
    templateUrl: './dialog-item.component.html',
    styleUrls: ['./dialog-item.component.scss'],
})
export class DialogItemComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogItemComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
