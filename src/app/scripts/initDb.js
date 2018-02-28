import PouchDB from 'pouchdb'
import albums from '../data/albums'

const initDb = () => {
  albums.collection = new PouchDB('albums')
}

export default initDb
