import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CameraOptions, Map, Marker, Popup, PopupOptions } from 'mapbox-gl';
import { IProductDetail } from '../helpers/interfaces';
import { Helpers } from '../helpers/Helpers';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map!: mapboxgl.Map;
    private markerOptions: mapboxgl.MarkerOptions = {};

    constructor() {

    }

    setMapReferences(map: Map) {
        this.map = map;
    }

    moveMap(longitude: number, latitude: number, zoom = 5) {
        const options: CameraOptions = {
            center: [longitude, latitude],
            zoom: zoom,
        };
        this.map.jumpTo(options);
    }

    showProductOnMap(product: IProductDetail) {
        const marker = new Marker(this.markerOptions).setLngLat([product.lng, product.lng]).addTo(this.map);
        const markerElement = marker.getElement();

        markerElement.addEventListener('mouseenter', () => {
            marker.togglePopup();
        });

        markerElement.addEventListener('mouseleave', () => {
            marker.togglePopup();
        });

        // Add popup content
        const html = Helpers.getHTMLFromProduct(product);
        const popupOptions: PopupOptions = {
            closeButton: false,
        };
        const popup = new Popup(popupOptions).setHTML(html);
        marker.setPopup(popup);
    }
}
