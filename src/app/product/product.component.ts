import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IOrientation, IProduct } from '../helpers/interfaces';
import { ORIENTATION } from '../helpers/enums';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

    products: IProduct[];
    selectedProduct!: IProduct;

    orientations: IOrientation[] = [];
    selectedOrientation!: IOrientation;

    angle!: number;

    constructor(private productService: ProductService) {
        this.products = this.productService.products;
        this.setOrientations();
    }

    setOrientations() {
        this.orientations = [
            { label: "North", value: ORIENTATION.NORTH },
            { label: "East", value: ORIENTATION.EAST },
            { label: "South", value: ORIENTATION.SOUTH },
            { label: "West", value: ORIENTATION.WEST },
        ];
    }

    visibleChange(event: boolean) {
        this.sidebarVisible = event;
        this.sidebarVisibleChange.emit(this.sidebarVisible);
    }
}
