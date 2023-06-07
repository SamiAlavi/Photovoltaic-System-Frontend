interface IUserCredentials {
    email: string,
    password: string,
}


interface IProduct {
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

export {
    IUserCredentials,
    IProject,
    IProduct,
};
