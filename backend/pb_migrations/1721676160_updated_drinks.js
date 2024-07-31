/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  collection.listRule = "location.visitors.id ~ @request.auth.id"
  collection.viewRule = "location.visitors.id ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wrt4pl7gzdcw0z2")

  collection.listRule = "location.visitors.id = @request.auth.id"
  collection.viewRule = "location.visitors.id = @request.auth.id"

  return dao.saveCollection(collection)
})
