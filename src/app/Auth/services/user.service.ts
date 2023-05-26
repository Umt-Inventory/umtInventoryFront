import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    getUsers(page: number = 1, pageSize: number = 10, filterUserRole: UserRole = UserRole.IT) {
        const url = `${environment.baseUrl}/api/User?page=${page}&pageSize=${pageSize}&filterUserRole=${filterUserRole}`;

        return this.httpClient.get<PaginatedUsers<UserDto>>(url);
    }

    ChangePassword(id: number, oldPassword: string, newPassword: string) {
        return this.httpClient.post(`${environment.baseUrl}/api/User/ChangePassword`, {
            Id: id,
            OldPassword: oldPassword,
            NewPassword: newPassword,
        });
    }

    addEditUser(user: UserCreateUpdateDto) {
        return this.httpClient.post<UserDto>(`${environment.baseUrl}/api/User/AddEditUser`, user);
    }

    Login(email: string, password: string) {
        return this.httpClient.post<ILoginResponse>(`${environment.baseUrl}/api/Auth/Login`, {
            Email: email,
            Password: password,
        });
    }
}

interface ILoginResponse {
    token: string;
}
export interface UserDto {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    phone: string;
}

export interface UserCreateUpdateDto {
    id: number;
    name: string;
    email: string;
    surname: string;
    password: string;
    role: UserRole;
    phone: string;
}
export interface PaginatedUsers<T> {
    users: T[];
    totalUsers: number;
    page: number;
    pageSize: number;
    filterUserRole: UserRole;
}
export enum UserRole {
    HR,
    STOCK_PROVIDER,
    IT,
    PERSONEL,
    FINANCE,
}
