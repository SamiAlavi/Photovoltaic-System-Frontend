import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike, Map, Popup } from 'mapbox-gl';
import AppSettings from '../AppSettings';
import { MAPBOX_STYLEURI } from '../helpers/enums';
import { ProjectService } from '../services/project.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {

    @ViewChild('mapContainer') mapContainer!: ElementRef;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.mapService.initMap(this.mapContainer);
    }
}
