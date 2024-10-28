import PouchDB from "pouchdb";

const db = new PouchDB("equilibre_db", {
  auto_compaction: true,
  //TODO: check adapter https://pouchdb.com/api.html#adapter et https://pouchdb.com/api.html#purge
});

export default db;
