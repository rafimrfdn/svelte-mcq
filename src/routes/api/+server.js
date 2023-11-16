import { DB_PATH } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import Database from "better-sqlite3";
import fs from "node:fs";

//let db = new Database(fs.readFileSync("banksoal.db"));
//let db = new Database("banksoal.db");
//let db = new Database(DB_PATH, { verbose: console.log });
let db = new Database(fs.readFileSync(DB_PATH, { verbose: console.log }));

// let db = new Database(fs.readFileSync("./src/database/banksoal.db"));

export function GET() {
  const items = db.prepare("select * from soaltwk");
  return json(items.all());
}
