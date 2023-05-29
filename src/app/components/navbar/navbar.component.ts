import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    emri: any = localStorage.getItem('name');
    role: any = localStorage.getItem('role');
    greeting?: string;
    currentDate: Date = new Date();
    constructor(private router: Router) {}
    ngOnInit() {
        this.getTimeOfDay();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['']);
    }

    isHrRole(): boolean {
        return this.role === 'HR'; // Adjust the condition based on your role values
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            this.greeting = 'Mirëmëngjes';
        } else if (hour >= 12 && hour < 16) {
            this.greeting = 'Mirëdita';
        } else {
            this.greeting = 'Mirëmbrëma';
        }
    }
}
