import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role === null) {
            // If the user is not authenticated or the role is null, redirect to the login page
            this.router.navigate(['']);
            return false;
        }

        // Check the required roles for the current route
        const requiredRoles = next.data['roles'] as string[];

        if (requiredRoles && !requiredRoles.some((r) => role.includes(r))) {
            // If the user's role does not match any of the required roles for the route, redirect to a different page (e.g., access denied page)
            this.router.navigate(['/buildings']);
            return false;
        }

        return true;
    }
}
