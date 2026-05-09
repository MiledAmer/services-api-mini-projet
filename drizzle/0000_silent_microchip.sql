CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" numeric(10, 0) NOT NULL
);
