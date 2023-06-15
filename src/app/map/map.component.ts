import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map.service';

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
