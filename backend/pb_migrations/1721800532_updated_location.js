/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ujywx6sp",
    "name": "hostName",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  // remove
  collection.schema.removeField("ujywx6sp")

  return dao.saveCollection(collection)
})
