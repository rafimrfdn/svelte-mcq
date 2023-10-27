import { error, json } from '@sveltejs/kit';

import Database from "better-sqlite3";
import fs from "node:fs";

let db = new Database(fs.readFileSync("banksoal.db"));
// let db = new Database(fs.readFileSync("./src/database/banksoal.db"));

export function GET() {
  const items = db.prepare("select * from banksoal");
  return json(items.all());
}
