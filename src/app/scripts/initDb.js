import PouchDB from 'pouchdb'
import albums from '../data/albums'

const initDb = () => {
  albums.collection = new PouchDB('albums')
  albums.insert = (instance, schemaCid) => {
    albums.collection.insert({
      instance,
      schemaCid
    })
  }
}

export default initDb
