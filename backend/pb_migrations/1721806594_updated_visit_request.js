/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8iszhi6gilvxl9j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwsvz19m",
    "name": "visitorName",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pddirghd",
    "name": "locationName",
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
  const collection = dao.findCollectionByNameOrId("8iszhi6gilvxl9j")

  // remove
  collection.schema.removeField("gwsvz19m")

  // remove
  collection.schema.removeField("pddirghd")

  return dao.saveCollection(collection)
})
