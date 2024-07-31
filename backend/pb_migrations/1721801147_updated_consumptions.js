/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("00iqwcf7ifz9xyk")

  // remove
  collection.schema.removeField("8ixyi6uc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("00iqwcf7ifz9xyk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ixyi6uc",
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
})
