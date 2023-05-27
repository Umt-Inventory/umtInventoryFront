import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceType, WorkspaceService, WorkspaceDto, Building } from '../services/workspace.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.scss']
})
export class AddWorkspaceComponent implements OnInit {
  myForm!: FormGroup;
  hasFormErrors = false;
  registerSuccessFlag = false;
  workspaceTypes = Object.values(WorkspaceType);
  buildingOptions = Object.values(Building);


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private workspaceService: WorkspaceService,
    private toastr: ToastrService,
    private location: Location

  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      building: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.hasFormErrors = true;
      return;
    }

    const workspaceDto: WorkspaceDto = {
      id: 0, // Assuming a new workspace is being created
      name: this.myForm.controls['name'].value.trim(),
      type: this.myForm.controls['type'].value,
      building: this.myForm.controls['building'].value
    };

    this.workspaceService.addEditWorkspace(workspaceDto).subscribe(
      (response) => {
        this.registerSuccessFlag = true;
        this.toastr.success('Workspace added successfully');
        this.location.back(); // Navigate back to the previous screen
      },
      (error) => {
        this.hasFormErrors = true;
        this.toastr.error('Failed to add workspace');
        // Handle error
      }
    );
  }
}
