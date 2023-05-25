import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginServiceService {
    constructor(private httpClient: HttpClient) {}

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
