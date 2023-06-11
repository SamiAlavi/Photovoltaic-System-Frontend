import { ORIENTATION } from "./enums";

interface IUserCredentials {
    email: string,
    password: string,
}


interface IProduct {
    id: string,
    name: string,
    company: string,
    area: number,
    power_peak: number,
    num_cells: string,
}

interface IProject {
    id: string,
    products: IProductDetail[],
    name?: string,
}

interface IFactorRow {
    label: string,
    factor: number,
    class: string,
}

interface IProductDetail extends IProduct {
    orientation: ORIENTATION,
    tiltAngle: number,
    lat: number,
    lng: number,
    region: string,
    timestamp: number,
}

interface IAddProductRequest {
    projectId: string,
    product: IProductDetail,
}

export {
    IUserCredentials,
    IProject,
    IProduct,
    IFactorRow,
    IProductDetail,
    IAddProductRequest,
};
