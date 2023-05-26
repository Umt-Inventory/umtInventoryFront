import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-buildings',
    templateUrl: './buildings.component.html',
    styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent {
    constructor(private router: Router) {}
    onClick(workspaceId: string) {
        this.router.navigate(['/workspaces', workspaceId]);
    }
}
