import metabinGate from '../utils/metabinGate'
import albums from '../data/albums'
import getIpfs from '../api/ipfs'
import handleIncomingAlbum from './handleIncomingAlbum'

const openAlbumsGate = async () => {
  try {
    const ipfs = await getIpfs()
    console.log('OPEN ALBUMS GATE')
    albums.gate = await metabinGate(ipfs, albums.instanceSchema, handleIncomingAlbum)
  } catch (e) {
    console.log(e)
  }
}

export default openAlbumsGate
