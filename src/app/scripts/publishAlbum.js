import getIpfs from '../api/ipfs'
import albums from '../data/albums'

const publishAlbum = async (cidBuffer) => {
  const ipfsApi = await getIpfs()
  return ipfsApi.pubsub.publish(albums.schemaCid, cidBuffer)
}

export default publishAlbum
