interface IUserCredentials {
    email: string,
    password: string,
}

interface IProduct {
    [key: string]: any,
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
