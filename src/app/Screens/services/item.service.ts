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
        filterUserType?: UserType
    ): Observable<PaginatedItems<ItemDto>> {
        let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());

        if (filterUserType !== undefined) {
            params = params.set('filterUserType', filterUserType.toString());
        }

        return this.httpClient.get<PaginatedItems<ItemDto>>(
            `${environment.baseUrl}/api/Item/GetPaginatedItems/${workspaceId}`,
            {params}
        );
    }

    addEditItem(item: ItemDto) {
        return this.httpClient.post<ItemDto>(`${environment.baseUrl}/api/Item/AddEditItem`, item);
    }

    getItemById(itemId: number) {
        return this.httpClient.get<ItemDtoById>(`${environment.baseUrl}/api/Item/GetItemById?id=${itemId}`);
    }
    deleteItem(itemId: number) {
        return this.httpClient.delete(`${environment.baseUrl}/api/Item/DeleteItem/${itemId}`);
    }
}
export interface ItemDto {
    id?: number; // Make the 'id' property optional
    price: number;
    quantity: number;
    condition: Condition;
    description: string;
    name: string;
    type: UserType;
    workspaceId: number;
}

export interface ItemDtoById {
    id?: number; // Make the 'id' property optional
    price: number;
    quantity: number;
    condition: Condition;
    description: string;
    name: string;
    type: UserType;
}

// paginated-items.model.ts
export interface PaginatedItems<T> {
    items: T[];
    totalItems: number;
    page: number;
    pageSize: number;
    filterUserType?: UserType;
}

export enum UserType {
    STOCK_PROVIDER = 'STOCK_PROVIDER',
    IT = 'IT',
}
export enum Condition {
    NEW = 'NEW',
    USED = 'USED',
    DAMAGED = 'DAMAGED',
    OPEN_BOX = 'OPEN_BOX',
    LIKE_NEW = 'LIKE_NEW',
}
