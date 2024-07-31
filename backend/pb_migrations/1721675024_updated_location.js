/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  collection.listRule = "host.id != ''"
  collection.viewRule = "host.id != ''"
  collection.createRule = "host.id != '' "
  collection.updateRule = "host.id = @request.auth.id"
  collection.deleteRule = "host.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
