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
        building?: string,
        searchString?: string
    ): Observable<PaginatedWorkspace<WorkspaceDto>> {
        let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());

        if (building) {
            params = params.set('building', building);
        }

        if (searchString) {
            params = params.set('searchString', searchString);
        }

        return this.httpClient.get<PaginatedWorkspace<WorkspaceDto>>(
            `${environment.baseUrl}/api/Workspace/GetPaginatedWorkspaces`,
            {params}
        );
    }

    addEditWorkspace(workspaceDto: WorkspaceDto) {
        return this.httpClient.post<WorkspaceDto>(
            `${environment.baseUrl}/api/Workspace/AddEditWorkspace`,
            workspaceDto
        );
    }
    getWorkspaceById(id: number): Observable<WorkspaceDto> {
        return this.httpClient.get<WorkspaceDto>(`${environment.baseUrl}/api/Workspace/${id}`);
    }
    deleteWorkspace(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${environment.baseUrl}/api/Workspace/DeleteWorkspace/${id}`);
    }
}

// workspace-dto.model.ts
export enum Building {
    G1 = 'G1',
    G2 = 'G2',
    G3 = 'G3',
}

export enum WorkspaceType {
    Klase = 'Klase',
    Depo = 'Depo',
    Laborator = 'Laborator',
    Zyre = 'Zyre',
}

export interface WorkspaceDto {
    id: number;
    name: string;
    type: WorkspaceType;
    building: Building;
    items?: any;
}

// paginated-workspace.model.ts
export interface PaginatedWorkspace<T> {
    workspace: T[];
    totalWorkspaces: number;
    page: number;
    pageSize: number;
    filterBuilding?: string;
    searchString?: string;
}
