import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';

export class Helpers {
    static getActivatedRoute(activatedRoute: ActivatedRoute | ActivatedRouteSnapshot): string {
        if (activatedRoute instanceof ActivatedRoute) {
            return activatedRoute.snapshot.url.join('/');
        }
        else if (activatedRoute instanceof ActivatedRouteSnapshot) {
            return activatedRoute.url.join('/');
        }
        return "";
    }

    static isTypeNumber(number: number) {
        return typeof (number) === "number";
    }

    static generateUID(): string {
        return uuidv4();
    }
}
