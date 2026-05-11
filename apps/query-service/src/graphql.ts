
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export class Order {
    id: string;
    productId: string;
    quantity: number;
    customerEmail: string;
}

export abstract class IQuery {
    abstract products(): Product[] | Promise<Product[]>;

    abstract orders(): Order[] | Promise<Order[]>;

    abstract orderById(id: string): Nullable<Order> | Promise<Nullable<Order>>;
}

type Nullable<T> = T | null;
