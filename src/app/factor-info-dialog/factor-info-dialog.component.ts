import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IFactorRow, IOrientation } from '../helpers/interfaces';
import { Helpers } from '../helpers/Helpers';

@Component({
    selector: 'app-factor-info-dialog',
    templateUrl: './factor-info-dialog.component.html',
    styleUrls: ['./factor-info-dialog.component.scss']
})
export class FactorInfoDialogComponent {
    type!: string;
    rows: IFactorRow[] = [];
    private textRedClassName = "text-red";

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {

    }

    ngOnInit() {
        // Access the passed data
        this.type = this.config.data.type;
        const value = this.config.data.value;

        if (this.type === "Orientation") {
            this.setOrientationFactors(value);
        }
        else if (this.type === "Tilt Angle") {
            this.setTiltAngleFactors(value);
        }
    }

    setOrientationFactors(value: IOrientation) {
        this.rows = [
            { label: "North", factor: 1.0, class: '' },
            { label: "East", factor: 0.9, class: '' },
            { label: "South", factor: 0.8, class: '' },
            { label: "West", factor: 0.7, class: '' },
        ];
        if (!value) {
            return;
        }
        const row = this.rows.find((row) => row.label === value.label);
        if (row) {
            row.class = this.textRedClassName;
        }
    }

    setTiltAngleFactors(value: number) {
        this.rows = [
            { label: "[0, 45]", factor: 1.0, class: '' },
            { label: "(45, 60]", factor: 0.9, class: '' },
            { label: "(60, 90]", factor: 0.8, class: '' },
        ];
        if (!Helpers.isTypeNumber(value)) {
            return;
        }
        if (0 <= value && value <= 45) {
            this.rows[0].class = this.textRedClassName;
        }
        else if (45 < value && value <= 60) {
            this.rows[1].class = this.textRedClassName;
        }
        else if (60 < value && value <= 90) {
            this.rows[2].class = this.textRedClassName;
        }
    }
}
