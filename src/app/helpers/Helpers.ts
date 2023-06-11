import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { IProductDetail } from "./interfaces";

const keysMapper: { [key: string]: string; } = {
    area: "Area",
    orientation: "Orientation",
    lng: "Longitude",
    name: "Name",
    company: "Company",
    tiltAngle: "Tilt Angle",
    lat: "Latitude",
    power_peak: "Power Peak",
    num_cells: "Cells",
    timestamp: "Timestamp",
};

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
                html += `<b>${keysMapper[key]}</b>: ${value} <br>`;
            }
        }
        html += "</div>";
        return html;
    }

    static getFormattedDateTimeFromTimestamp(timestamp: number): string {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedDateTime;

    }
}
