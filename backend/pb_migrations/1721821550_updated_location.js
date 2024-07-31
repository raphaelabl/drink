/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  collection.listRule = "@request.auth.id != ''"
  collection.viewRule = "@request.auth.id != ''"
  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id != ''"
  collection.deleteRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3crcugf3dcxm2qu")

  collection.listRule = "host.id != ''"
  collection.viewRule = "host.id != ''"
  collection.createRule = "host.id != '' "
  collection.updateRule = "host.id = @request.auth.id"
  collection.deleteRule = "host.id = @request.auth.id"

  return dao.saveCollection(collection)
})
