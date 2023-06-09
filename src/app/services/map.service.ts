import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map!: mapboxgl.Map;

    constructor() {

    }

    setMapReference(map: mapboxgl.Map) {
        this.map = map;
    }

    moveMap(longitude: number, latitude: number, zoom = 5) {
        const options: mapboxgl.CameraOptions = {
            center: [longitude, latitude],
            zoom: zoom,
        };
        this.map.jumpTo(options);
    }
}
