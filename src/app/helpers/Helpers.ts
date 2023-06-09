import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { IProductDetail } from "./interfaces";

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

    static getHTMLFromProduct(product: IProductDetail): string {
        let html = "<div class='text-black'>";
        for (let [key, value] of Object.entries(product)) {
            if (key !== "id") {
                html += `<b>${key}</b>: ${value} <br>`;
            }
        }
        html += "</div>";
        return html;
    }
}
