import { ElementRef, Injectable } from '@angular/core';
import AppSettings from '../AppSettings';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_STYLEURI } from '../helpers/enums';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map!: mapboxgl.Map;
    showControls: boolean = true;

    constructor() {

    }

    initMap(container: ElementRef): void {
        this.map = new mapboxgl.Map({
            accessToken: AppSettings.MapboxAccessToken,
            container: container.nativeElement,
            style: MAPBOX_STYLEURI.LIGHT,
            center: [12.9167, 50.8333],
            zoom: 10,
            renderWorldCopies: true,
        });

        this.map.on('style.load', () => {
            // this.mapLoad();
        });

        this.map.on('load', () => {
            // this.mapMouse();
            if (this.showControls) {
                this.addControls();
            }
        });
    }

    private addControls() {
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
}
