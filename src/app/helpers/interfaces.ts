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
    model: string,
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
    name: string,
    orientation: ORIENTATION,
    tiltAngle: number,
    lat: number,
    lng: number,
    timestamp: number,
    region: string,
    isActive: boolean,
    num_panels: number,
    report?: IReportJSON,
}

interface IAddProductRequest {
    projectId: string,
    product: IProductDetail,
}
interface IDeleteProjectRequest {
    projectId: string,
}

interface IReportJSON {
    datetimes: string[],
    electrictyProduced: number[],
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
    IReportJSON,
};
