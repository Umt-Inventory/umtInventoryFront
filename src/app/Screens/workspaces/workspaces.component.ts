import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-workspaces',
    templateUrl: './workspaces.component.html',
    styleUrls: ['./workspaces.component.scss'],
})
export class WorkspacesComponent {
    godina: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.godina = this.route.snapshot.paramMap.get('id');
    }
}
