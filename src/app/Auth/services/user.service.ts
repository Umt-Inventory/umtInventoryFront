import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

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
    workspaceID: number;
}

export interface UserCreateUpdateDto {
    id: number;
    name: string;
    email: string;
    surname: string;
    password: string;
    role: UserRole;
    phone: string;
    workspaceID: number;
}

export enum UserRole {
    HR,
    STOCK_PROVIDER,
    IT,
    PERSONEL,
    FINANCE,
}
