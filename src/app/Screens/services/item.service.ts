import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private httpClient: HttpClient) {}

    getPaginatedItems(
        workspaceId: number,
        page: number = 1,
        pageSize: number = 10,
        filterUserType: string = 'IT'
    ): Observable<PaginatedItems<ItemDto>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString())
            .set('filterUserType', filterUserType);

        return this.httpClient.get<PaginatedItems<ItemDto>>(
            `${environment.baseUrl}/api/Item/GetPaginatedItems/${workspaceId}`,
            {params}
        );
    }
}
export interface ItemDto {
    id: number;
    price: number;
    quantity: number;
    condition: string;
    description: string;
    name: string;
    type: string;
}

// paginated-items.model.ts
export interface PaginatedItems<T> {
    items: T[];
    totalItems: number;
    page: number;
    pageSize: number;
    filterUserType: string;
}
