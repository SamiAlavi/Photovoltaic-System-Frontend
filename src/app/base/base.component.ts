import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../helpers/Helpers';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(private activatedRoute: ActivatedRoute) {

    }

    get currentRoute(): string {
        return Helpers.getActivateRoute(this.activatedRoute);
    }
}
