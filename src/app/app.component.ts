import {animate, query, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet, Router, Event, NavigationEnd} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('routeAnimations', [
            transition('* <=> *', [
                query(
                    ':enter',
                    [
                        style({
                            opacity: 0,
                        }),
                        animate(
                            500,
                            style({
                                opacity: 1,
                            })
                        ),
                    ],
                    {optional: true}
                ),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {
    title = 'umtInventoryFront';
    showNavbar = true;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Hide navbar in '/login' and '/register' routes
                this.showNavbar = !['/login', '/register', '/'].includes(event.url);
            }
        });
    }

    prepareOutlet(outlet: RouterOutlet) {
        if (outlet.isActivated) {
            return outlet.activatedRoute.snapshot.url;
        }
        return null;
    }
}
