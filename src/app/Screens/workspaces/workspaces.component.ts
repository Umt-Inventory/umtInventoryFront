import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PaginatedWorkspace, WorkspaceDto, WorkspaceService} from '../services/workspace.service';

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
    isLoading: boolean = true;

    constructor(private route: ActivatedRoute, private workspaceService: WorkspaceService, private router: Router) {}

    ngOnInit() {
        this.building = this.route.snapshot.paramMap.get('id') || '';

        this.workspaceService.getPaginatedWorkspaces(1, 100, this.building).subscribe(
            (response) => {
                this.workspaces = response;
                this.filteredWorkspaces = [...this.workspaces.workspace];
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            },
            (error) => console.error('There was an error: ', error)
        );
    }

    applyFilter() {
        this.filteredWorkspaces = this.workspaces.workspace.filter((workspace) =>
            workspace.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
    onSubmit(workspaceId: number) {
        // Accept workspace ID as parameter
        this.router.navigate(['items', workspaceId]); // Navigate to "items" component with the ID
    }

    resetFilter() {
        this.searchQuery = '';
        this.applyFilter();
    }
}
