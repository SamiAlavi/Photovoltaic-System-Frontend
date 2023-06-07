import { ActivatedRoute } from "@angular/router";

export class Helpers {
    static getActivateRoute(activatedRoute: ActivatedRoute): string {
        return activatedRoute.snapshot.url.join('/');
    }
}
