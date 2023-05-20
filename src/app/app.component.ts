import {animate, query, style, transition, trigger} from '@angular/animations';
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

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
export class AppComponent {
    title = 'umtInventoryFront';

    prepareOutlet(outlet: RouterOutlet) {
        if (outlet.isActivated) {
            return outlet.activatedRoute.snapshot.url;
        }
        return null;
    }
}
