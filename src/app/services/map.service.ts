import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CameraOptions, Map, Marker, Popup, PopupOptions } from 'mapbox-gl';
import geocoder from '@mapbox/mapbox-sdk/services/geocoding';
import { IProductDetail } from '../helpers/interfaces';
import { Helpers } from '../helpers/Helpers';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map!: mapboxgl.Map;
    private markerOptions: mapboxgl.MarkerOptions = {};
    private readonly geocoder = geocoder({ accessToken: AppSettings.MapboxAccessToken });
    readonly locPopup = {
        popup: new Popup(),
        timerId: null,
        styleClass: 'text-black',
        time: 2000, //ms,
        isVisible: true,
    };

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
        const marker = new Marker(this.markerOptions).setLngLat([product.lng, product.lat]).addTo(this.map);
        const markerElement = marker.getElement();

        markerElement.addEventListener('mouseenter', () => {
            this.locPopup.isVisible = false;
            marker.togglePopup();
        });

        markerElement.addEventListener('mouseleave', () => {
            this.locPopup.isVisible = true;
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

    reverseGeocode = async (lat: number, lng: number): Promise<string> => {
        let region = "";
        try {
            const response = await this.geocoder.reverseGeocode({
                query: [lng, lat],
                types: ['place', 'district'],
                limit: 1
            }).send();

            if (response?.body?.features.length) {
                region = response.body.features[0].text;
                return region;
            }
        }
        catch (error) {
            return "";
        }
        return region;
    };
}
