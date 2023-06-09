import { ActivatedRoute } from "@angular/router";

export class Helpers {
    static getActivateRoute(activatedRoute: ActivatedRoute): string {
        return activatedRoute.snapshot.url.join('/');
    }

    static isTypeNumber(number: number) {
        return typeof (number) === "number";
    }
}
