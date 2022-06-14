CREATE TABLE IF NOT EXISTS "shoppingList"(
    "id" serial PRIMARY KEY,
    "itemName" varchar (100),
    "itemDescription" varchar(250),
    "itemCount" INT,
    "itemPurchased" boolean DEFAULT false
);

INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',3);
INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',1);
INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',3);
INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',3);
INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',3);
INSERT INTO "shoppingList" ("itemName","itemDescription","itemCount") VALUES ('Tomatoes','Green cherry tomatoes',2);
