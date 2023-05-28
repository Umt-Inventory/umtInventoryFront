import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {WorkspaceType, WorkspaceService, WorkspaceDto, Building} from '../services/workspace.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-workspace',
    templateUrl: './add-workspace.component.html',
    styleUrls: ['./add-workspace.component.scss'],
})
export class AddWorkspaceComponent implements OnInit {
    myForm!: FormGroup;
    hasFormErrors = false;
    registerSuccessFlag = false;
    workspaceTypes = Object.values(WorkspaceType);
    buildingOptions = Object.values(Building);
    workspaceId: any;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private workspaceService: WorkspaceService,
        private toastr: ToastrService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.workspaceId = this.route.snapshot.paramMap.get('id');

        if (this.workspaceId === '0') {
            this.myForm = this.formBuilder.group({
                name: ['', [Validators.required]],
                type: ['', [Validators.required]],
                building: ['', [Validators.required]],
            });
        } else {
            this.myForm = this.formBuilder.group({
                name: ['', [Validators.required]],
                type: ['', [Validators.required]],
                building: ['', [Validators.required]],
            });

            if (this.workspaceId !== '0' && this.workspaceId !== null) {
                // Editing existing workspace
                this.workspaceService.getWorkspaceById(Number(this.workspaceId)).subscribe({
                    next: (workspace) => {
                        this.myForm.patchValue({
                            name: workspace.name,
                            type: workspace.type,
                            building: workspace.building,
                        });
                    },
                    error: (error) => {
                        this.hasFormErrors = true;
                        this.toastr.error('Failed to fetch workspace details.');
                        console.error('Failed to fetch workspace details:', error);
                    },
                });
            }
        }
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.hasFormErrors = true;
            return;
        }

        const workspaceDto: WorkspaceDto = {
            id: Number(this.workspaceId),
            name: this.myForm.controls['name'].value.trim(),
            type: this.myForm.controls['type'].value,
            building: this.myForm.controls['building'].value,
        };

        this.workspaceService.addEditWorkspace(workspaceDto).subscribe(
            (response) => {
                this.registerSuccessFlag = true;
                if (this.workspaceId === '0') {
                    this.toastr.success('Workspace added successfully');
                } else {
                    this.toastr.success('Workspace edited successfully');
                }
                this.location.back(); // Navigate back to the previous screen
            },
            (error) => {
                this.hasFormErrors = true;
                if (this.workspaceId === '0') {
                    this.toastr.error('Failed to add workspace');
                } else {
                    this.toastr.error('Failed to edit workspace');
                }
            }
        );
    }
}
