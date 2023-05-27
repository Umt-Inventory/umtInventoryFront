import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    constructor(private httpClient: HttpClient) {}

    getPaginatedWorkspaces(
        page: number = 1,
        pageSize: number = 100,
        building?: string
    ): Observable<PaginatedWorkspace<WorkspaceDto>> {
        let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());

        if (building) {
            params = params.set('building', building);
        }

        return this.httpClient.get<PaginatedWorkspace<WorkspaceDto>>(
            `${environment.baseUrl}/api/Workspace/GetPaginatedWorkspaces`,
            {params}
        );
    }
}

// workspace-dto.model.ts
export interface WorkspaceDto {
    id: number;
    name: string;
    type: string; // Change this to the actual type
    building: string; // Change this to the actual type
    items?: any;
}

// paginated-workspace.model.ts
export interface PaginatedWorkspace<T> {
    workspace: T[];
    totalWorkspaces: number;
    page: number;
    pageSize: number;
    filterBuilding?: string; // Change this to the actual type
}
