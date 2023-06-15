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

    ref: DynamicDialogRef;

    constructor(
        private projectService: ProjectService,
        private dialogService: DialogService,
        private toastService: ToastService,
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
    private editProduct(product: IProductDetail) {
        if (product.isActive) {
            this.ref = this.dialogService.open(AddEditProductComponent, {
                header: `Edit Product`,
                width: '70%',
                dismissableMask: true,
                contentStyle: { overflow: 'auto' },
                data: product,
            });
        }
        else {
            this.toastService.showErrorToast("Cannot edit product as it is readonly");
        }
    }

    private addNewProduct(e: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
        this.ref = this.dialogService.open(AddEditProductComponent, {
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
        const markerData = this.markers.find(markerData => markerData.id === id);
        if (markerData) {
            const { marker } = markerData;
            const index = this.markers.indexOf(markerData);

            marker.remove();
            this.markers.splice(index, 1);
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
            this.editProduct(product);
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
}
