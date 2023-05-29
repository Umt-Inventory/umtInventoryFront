import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PaginatedWorkspace, WorkspaceDto, WorkspaceService} from '../services/workspace.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogItemComponent} from 'src/app/components/dialog-item/dialog-item.component';

@Component({
    selector: 'app-workspaces',
    templateUrl: './workspaces.component.html',
    styleUrls: ['./workspaces.component.scss'],
})
export class WorkspacesComponent implements OnInit {
    building: any;
    workspaces!: PaginatedWorkspace<WorkspaceDto>;
    searchQuery = '';
    filteredWorkspaces: WorkspaceDto[] = [];
    isLoading = true;
    totalPages: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 50];
    currentPageSize: number = 5;

    constructor(
        private route: ActivatedRoute,
        private workspaceService: WorkspaceService,
        private router: Router,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.building = this.route.snapshot.paramMap.get('id') || '';
        this.getWorkspaces();
    }

    getWorkspaces(page: number = 1, pageSize: number = this.currentPageSize) {
        this.workspaceService.getPaginatedWorkspaces(page, pageSize, this.building).subscribe({
            next: (response) => {
                this.workspaces = response;
                this.filteredWorkspaces = [...this.workspaces.workspace];
                this.isLoading = false;
                this.totalPages = Math.ceil(response.totalWorkspaces / response.pageSize);
            },
            error: (error) => {
                console.error('Failed to fetch workspaces:', error);
                this.isLoading = false;
            },
        });
    }

    applyFilter() {
        this.filteredWorkspaces = this.workspaces.workspace.filter((workspace) =>
            workspace.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    onPageChange(event: PageEvent) {
        this.currentPageSize = event.pageSize;
        this.getWorkspaces(event.pageIndex + 1, event.pageSize);
    }

    resetFilter() {
        this.searchQuery = '';
        this.applyFilter();
    }

    onSubmit(workspaceId: number) {
        this.router.navigate(['items', workspaceId]);
    }

    goToEditWorkspace(workspaceId: number) {
        this.router.navigate(['add-workspace', workspaceId]);
    }

    goToAddWorkspace() {
        this.router.navigate(['add-workspace', 0]);
    }
    deleteWorkspace(event: Event, workspaceId: number) {
        event.stopPropagation();

        const dialogRef = this.dialog.open(DialogItemComponent, {
            data: {
                title: 'Fshirja e Objektit',
                message: 'A jeni i sigurtë që doni të fshini këtë objekt?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.workspaceService.deleteWorkspace(workspaceId).subscribe({
                    next: (response) => {
                        this.toastr.success('Workspace deleted successfully');
                        this.getWorkspaces();
                    },
                    error: (error) => {
                        this.toastr.error('Failed to delete workspace');
                    },
                });
            }
        });
    }
}
