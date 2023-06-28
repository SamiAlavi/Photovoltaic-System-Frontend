import { Component } from '@angular/core';

@Component({
    selector: 'app-help-info',
    templateUrl: './help-info.component.html',
    styleUrls: ['./help-info.component.scss']
})
export class HelpInfoComponent {

    readonly steps: string[];

    constructor() {
        this.steps = [
            'Create/Open a project',
            'Hover over the map too view the longitudes and latitudes of locations',
            'Click on the "Products" button to view all the products you have set in the sidebar',
            'To add a product, either click on the "Add Product" button in the sidebar, or click on the map',
            'A dialog form is visible. Fill the required information according to your specifications. Click on "Save" button',
            'A marker is shown on the map at the location you have entered',
            'On hovering the marker, the details of the product are shown',
            'On clicking the marker, you can edit the details of the product',
            'The product can also be edited by opening the sidebar, the product accordion, and clicking on the "Pencil" icon',
            'The application will start fetching the weather data for the region of the product every night UTC+0200',
            'To generate the electricity report for the last 30 days for a product, either wait for 30 days, or manually generate it by clicking on the "Generate Report" icon',
            'Once the report is generated, it is sent to your email address and the status of the product is set to "Inactive"',
            'It is now in read-only state',
            'To view the report, click on the "View Report" button. A chart is visible showing the electricity generated for the last 30 days.',
            'You can switch between "Hourly" and "Daily" reports by clicking on their respective icons',
            'You can download the chart information in JSON and PNG format by clicking on their respective icons',
            'Once all the products in a project have their reports generated, the status of the project is set to "Inactive". It is now in read-only state',
        ];
    }

}
