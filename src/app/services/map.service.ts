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

    moveMap(latitude: number, longitude: number) {
        const options: mapboxgl.CameraOptions = { center: [latitude, longitude] };
        this.map.jumpTo(options);
    }
}
