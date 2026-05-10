import { integer } from 'drizzle-orm/pg-core';
import { real } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    price: real('price').notNull(),
    stock: integer('stock').notNull(),
});


export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    productId: integer('product_id').notNull(),
    quantity: integer('quantity').notNull(),
    email: text('email').notNull(),
});