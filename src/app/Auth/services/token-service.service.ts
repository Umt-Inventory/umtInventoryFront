import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root',
})
export class TokenServiceService {
    constructor() {}

    decodeToken(token: string) {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
