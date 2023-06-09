import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IOrientation, IProduct } from '../helpers/interfaces';
import { ORIENTATION } from '../helpers/enums';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FactorInfoDialogComponent } from '../factor-info-dialog/factor-info-dialog.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [DialogService],
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

    ref!: DynamicDialogRef;

    selectedProduct!: IProduct;

    orientations: IOrientation[] = [];
    selectedOrientation!: IOrientation;

    angle!: number;

    constructor(
        protected productService: ProductService,
        private dialogService: DialogService,
    ) {
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

    showInfoDialog(type: string, value: IOrientation | number) {
        this.ref = this.dialogService.open(FactorInfoDialogComponent, {
            header: `${type} Factor Information`,
            width: '70%',
            contentStyle: { overflow: 'auto' },
            data: {
                type: type,
                value: value,
            },
        });
    }
}
