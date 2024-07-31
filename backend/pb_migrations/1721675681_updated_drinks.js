/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  collection.viewRule = "location.visitors.id = @request.auth.id"
  collection.createRule = "location.host.id = @request.auth.id"
  collection.updateRule = "location.host.id = @request.auth.id"
  collection.deleteRule = "location.host.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})
