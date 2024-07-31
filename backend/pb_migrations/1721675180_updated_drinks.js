/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mmvhuv2a",
    "name": "location",
    "type": "relation",
    "required": true,
    "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  // remove
  collection.schema.removeField("mmvhuv2a")

  return dao.saveCollection(collection)
})
