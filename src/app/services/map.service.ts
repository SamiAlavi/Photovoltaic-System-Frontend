import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map!: mapboxgl.Map;

    constructor() {

    }
}
