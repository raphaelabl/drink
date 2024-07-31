/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  // remove
  collection.schema.removeField("tejsthkd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xhdfi3k5",
    "name": "visitors",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tejsthkd",
    "name": "visitors",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8iszhi6gilvxl9j",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("xhdfi3k5")

  return dao.saveCollection(collection)
})
