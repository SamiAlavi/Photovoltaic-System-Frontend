import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike, Map, Popup } from 'mapbox-gl';
import AppSettings from '../AppSettings';
import { MAPBOX_STYLEURI } from '../helpers/enums';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

    @ViewChild('mapContainer') mapContainer!: ElementRef;
    map!: Map;
    private readonly STARTING_LOCATION: LngLatLike = [12.9167, 50.8333]; // Chemnitz
    private readonly STARTING_ZOOM = 1;

    constructor(private mapService: MapService, private projectService: ProjectService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initMap(this.mapContainer);
    }

    initMap(container: ElementRef) {
        this.map = new Map({
            accessToken: AppSettings.MapboxAccessToken,
            container: container.nativeElement,
            style: MAPBOX_STYLEURI.LIGHT,
            center: this.STARTING_LOCATION,
            zoom: this.STARTING_ZOOM,
            renderWorldCopies: true,
        });

        this.map.on('style.load', () => {
        });

        this.map.on('load', () => {
            this.mapAddControls();
            this.mapMouse();
            this.showProductsLocations();
        });

        this.setMapReference();
    }

    private setMapReference() {
        this.mapService.setMapReferences(this.map);
    }



    mapMouse(): void {
        this.map.on('mousemove', (e) => {
            this.mapService.locPopup.popup.remove();
            if (this.mapService.locPopup.isVisible) {
                const { lng, lat } = e.lngLat;
                const html = `<span>Longitude :  ${lng}</span><br><span>Latitude :  ${lat}</span>`;
                this.mapService.locPopup.popup = new Popup({
                    closeButton: false,
                    closeOnClick: true,
                    closeOnMove: true,
                    className: this.mapService.locPopup.styleClass,
                    maxWidth: '400px',
                })
                    .setLngLat(e.lngLat)
                    .setHTML(html)
                    .addTo(this.map);
            }
        });
    }

    private mapAddControls() {
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    private showProductsLocations() {
        if (!this.projectService.currentProject) {
            return;
        }
        this.projectService.currentProject.products.forEach((product) => {
            this.mapService.showProductOnMap(product);
        });
    }
}
