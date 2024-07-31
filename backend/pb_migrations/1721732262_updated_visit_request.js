/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8iszhi6gilvxl9j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b2lso52d",
    "name": "location",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3crcugf3dcxm2qu",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8iszhi6gilvxl9j")

  // remove
  collection.schema.removeField("b2lso52d")

  return dao.saveCollection(collection)
})
