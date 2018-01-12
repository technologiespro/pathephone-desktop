import albums from '../data/albums'
import settings from '../data/settings'
import getDb, { createDb } from '../api/rxdb'

const initDb = async () => {
  await createDb({
    name: 'pathephone',
    adapter: 'idb'
  })
  const db = getDb()

  albums.collection = await db.collection(albums.rxdb)

  settings.collection = await db.collection(settings.rxdb)
}

export default initDb
