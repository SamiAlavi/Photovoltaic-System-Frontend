import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { IProductDetail } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map!: mapboxgl.Map;
    private markerOptions: mapboxgl.MarkerOptions = {};

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

    showProductOnMap(product: IProductDetail) {
        new mapboxgl.Marker(this.markerOptions).setLngLat([product.lng, product.lng]).addTo(this.map);
    }
}
