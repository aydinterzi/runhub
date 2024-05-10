import { serial, text, pgTable, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const paceEnum = pgEnum("pace", ["fast", "medium", "slow"]);
export const statusEnum = pgEnum("status", ["attending", "not_attending"]);

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

export const runs = pgTable("runs", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  start_location: text("start_location"),
  end_location: text("end_location"),
  distance: text("distance"),
  date_time: timestamp("date_time"),
  pace: paceEnum("pace"),
  description: text("description"),
});

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  run_id: serial("run_id").references(() => runs.id),
  user_id: text("user_id").references(() => users.id),
  status: statusEnum("status"),
});
