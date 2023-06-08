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
    products: IProduct[],
    name?: string,
}

interface IOrientation {
    label: string,
    value: ORIENTATION,
}

export {
    IUserCredentials,
    IProject,
    IProduct,
    IOrientation,
};
