import { ElementRef, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CameraOptions, LngLatLike, Map, Marker, MarkerOptions, Popup, PopupOptions } from 'mapbox-gl';
import geocoder from '@mapbox/mapbox-sdk/services/geocoding';
import { IProductDetail } from '../helpers/interfaces';
import { Helpers } from '../helpers/Helpers';
import AppSettings from '../AppSettings';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { MAPBOX_STYLEURI } from '../helpers/enums';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectService } from './project.service';
import { ToastService } from './toast.service';
import { EditDeleteChooserComponent } from '../edit-delete-chooser/edit-delete-chooser.component';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private map!: Map;
    private readonly geocoder = geocoder({ accessToken: AppSettings.MapboxAccessToken });
    private readonly markers: { id: string, marker: mapboxgl.Marker; }[] = [];
    readonly locPopup = {
        popup: new Popup(),
        isVisible: false,
    };
    private readonly STARTING_LOCATION: LngLatLike = [12.9167, 50.8333]; // Chemnitz
    private readonly STARTING_ZOOM = 1;
    isMarkerHovered = false;

    constructor(
        private projectService: ProjectService,
        private dialogService: DialogService,
    ) {

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
            this.mapClick();
            this.showProductsLocations();
        });
    }


    mapMouse(): void {
        this.map.on('mousemove', (e) => {
            this.locPopup.popup.remove();
            if (this.locPopup.isVisible) {
                const { lng, lat } = e.lngLat;
                const html = `
                    <span><b>Longitude:</b> ${lng}</span><br>
                    <span><b>Latitude:</b> ${lat}</span><br>
                    <span>Click to add product to this location</span>`;
                this.locPopup.popup = new Popup({
                    closeButton: false,
                    closeOnClick: true,
                    closeOnMove: true,
                    className: 'text-black mapbox-popup',
                    maxWidth: '400px',
                })
                    .setLngLat(e.lngLat)
                    .setHTML(html)
                    .addTo(this.map);
            }
        });
    }

    mapClick() {
        this.map.on('click', (e) => {
            if (this.locPopup.isVisible) {
                this.addNewProduct(e);
            }
        });
    }

    private editDeleteProductChooser(product: IProductDetail) {
        this.dialogService.open(EditDeleteChooserComponent, {
            header: product.name,
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: product,
        });
    }

    private addNewProduct(e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
        this.dialogService.open(AddEditProductComponent, {
            header: `Add Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: {
                ...e.lngLat,
            },
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
            this.showProductOnMap(product);
        });
    }

    viewOnMap(product: IProductDetail) {
        const zoom = 5;
        const highlightDuration = 5000;
        const marker = this.markers.find((markerData) => markerData.id === product.id).marker;
        this.moveMap(product.lng, product.lat, zoom);
        this.highlightMarker(marker, highlightDuration);
    }

    moveMap(longitude: number, latitude: number, zoom = 5) {
        const options: CameraOptions = {
            center: [longitude, latitude],
            zoom: zoom,
        };
        this.map.jumpTo(options);
    }

    showProductOnMap(product: IProductDetail) {
        const marker = this.addMarker(product);
        this.setupMarkerPopup(marker, product.id);
    }

    addMarker(product: IProductDetail) {
        const markerOptions: MarkerOptions = {
            color: product.isActive ? '#2f855a' : '#c53030',
        };
        const marker = new Marker(markerOptions)
            .setLngLat([product.lng, product.lat])
            .addTo(this.map);


        this.markers.push({ id: product.id, marker: marker });
        return marker;
    }

    removeMarker(id: string) {
        const markerIndex = this.markers.findIndex((markerData) => markerData.id === id);
        if (markerIndex > -1) {
            const marker = this.markers[markerIndex].marker;
            marker.remove();
            this.markers.splice(markerIndex, 1);
        }
    }


    setupMarkerPopup(marker: Marker, productId: string) {
        const markerElement = marker.getElement();

        markerElement.onmouseenter = () => {
            const product = this.projectService.currentProject.products.find((prod) => prod.id === productId);
            const html = Helpers.getHTMLFromProduct(product, 'black');
            const popup = marker.getPopup();
            popup.addClassName(product.isActive ? 'popup-active' : 'popup-inactive');
            popup.setHTML(html);
            marker.togglePopup();
            this.locPopup.isVisible = false;
        };

        markerElement.onmouseleave = () => {
            this.locPopup.isVisible = true;
            marker.togglePopup();
        };

        markerElement.onclick = () => {
            const product = this.projectService.currentProject.products.find((prod) => prod.id === productId);
            this.editDeleteProductChooser(product);
        };

        const popupOptions: PopupOptions = {
            closeButton: false,
        };
        const popup = new Popup(popupOptions);
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

    private highlightMarker(marker: Marker, highlightDuration: number) {
        marker.getElement().classList.add('highlighted-marker');
        setTimeout(function () {
            marker.getElement().classList.remove('highlighted-marker');
        }, highlightDuration);
    }
}
