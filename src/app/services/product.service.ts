import { Injectable } from '@angular/core';
import { IProduct } from '../helpers/interfaces';
import { HttpClient } from '@angular/common/http';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: IProduct[] = [];

    constructor(private http: HttpClient) {
        this.getProducts();
    }

    getProducts() {
        this.http.get<IProduct[]>(AppSettings.ProductUrl).subscribe((products) => {
            this.products = products;
        });
    }
}
