import { Injectable } from '@angular/core';
import { IProduct } from '../helpers/interfaces';
import { HttpClient } from '@angular/common/http';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: IProduct[] = [];
    private products_key = 'products';

    constructor(private http: HttpClient) {
        const products = sessionStorage.getItem(this.products_key);
        if (products) {
            this.products = JSON.parse(products);
        }
        else {
            this.getProducts();
        }
    }

    getProducts() {
        this.http.get<IProduct[]>(AppSettings.ProductUrl).subscribe((products) => {
            this.products = products;
            sessionStorage.setItem(this.products_key, JSON.stringify(products));
        });
    }
}
