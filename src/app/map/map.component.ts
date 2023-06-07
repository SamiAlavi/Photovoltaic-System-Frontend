import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import AppSettings from '../AppSettings';
import { MAPBOX_STYLEURI } from '../helpers/enums';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

    @ViewChild('mapContainer') mapContainer!: ElementRef;
    map!: mapboxgl.Map;
    showControls: boolean = true;
    private readonly STARTING_LOCATION: mapboxgl.LngLatLike = [12.9167, 50.8333]; // Chemnitz
    private readonly STARTING_ZOOM = 10;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initMap(this.mapContainer);
    }

    initMap(container: ElementRef) {
        this.map = new mapboxgl.Map({
            accessToken: AppSettings.MapboxAccessToken,
            container: container.nativeElement,
            style: MAPBOX_STYLEURI.LIGHT,
            center: this.STARTING_LOCATION,
            zoom: this.STARTING_ZOOM,
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
