
import albums from '../data/albums'

const handleIncomingAlbum = async (album, cid) => {
  try {
    const existed = await albums.collection
      .findOne({ cid: { $eq: cid } })
      .exec()
    if (!existed) {
      await albums.collection.insert({ cid, data: album, genres: [] })
    } else {
      throw new Error(`Album ${cid} already persisted in local db.`)
    }
  } catch (e) {
    console.log(e)
  }
}

export default handleIncomingAlbum
