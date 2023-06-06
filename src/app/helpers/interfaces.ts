interface IUserCredentials {
    email: string,
    password: string,
}

interface IProduct {
    [key: string]: any,
}

interface IProject {
    id: string,
    name: string,
    products: IProduct[],
}

export {
    IUserCredentials,
    IProject,
    IProduct,
};
