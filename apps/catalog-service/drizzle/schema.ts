import { integer } from 'drizzle-orm/pg-core';
import { real } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    price: real('price').notNull(),
    stock: integer('stock').notNull(),
});
