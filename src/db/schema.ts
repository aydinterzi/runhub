import { serial, text, pgTable } from "drizzle-orm/pg-core";

export const playing_with_neon = pgTable("playing_with_neon", {
  id: serial("id").primaryKey(),
  name: text("name"),
  value: text("value"),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email"),
  full_name: text("full_name"),
});
