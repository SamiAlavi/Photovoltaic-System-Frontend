import { ORIENTATION } from "./enums";

interface IProfile {
    email: string,
    currentPassword: string,
    newPassword: string,
}

interface IUserCredentials {
    email: string,
    password: string,
}

interface ICustomUserRecord {
    uid: string,
    email: string,
    accessToken?: string,
    exp?: number,
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
    timeCreated: number,
    isActive: boolean,
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
    timestamp: number,
    region: string,
    isActive: boolean,
}

interface IAddProductRequest {
    projectId: string,
    product: IProductDetail,
}
interface IDeleteProjectRequest {
    projectId: string,
}

export {
    IUserCredentials,
    IProject,
    IProduct,
    IFactorRow,
    IProductDetail,
    IAddProductRequest,
    IDeleteProjectRequest,
    ICustomUserRecord,
    IProfile,
};
