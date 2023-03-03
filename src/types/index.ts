
export interface product {
    name: string | null;
    size: string | null;
    price: string | null;
    type: string | null;
    subtype: string | null;
    country: string | null;
    state: string | null;
    pic: string | null;
}


export interface SQLconfig {
    user: string,
    password: string,
    server: string,
    database: string,
    options: {
        encrypt: boolean
    }
}