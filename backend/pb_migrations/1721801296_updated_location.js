/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9dq3rrcd",
    "name": "consumptions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "00iqwcf7ifz9xyk",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9dq3rrcd",
    "name": "consumptions",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "00iqwcf7ifz9xyk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
