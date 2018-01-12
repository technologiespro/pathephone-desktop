import settings from '../data/settings'
import getIpfs from '../api/ipfs'
import metabinGate from '../utils/metabinGate'
import handleIncomingAlbum from './handleIncomingAlbum'

let openedGenreGates = []

const initGenreGate = async genre => {
  const someHandler = gate => gate.name === genre
  const opened = openedGenreGates.some(someHandler)
  if (!opened) {
    const ipfs = await getIpfs()
    const mapHandler = async (genre) => {
      const genreSchema = {
        genre,
        albumSchema: albums.instanceSchema
      }
      const gate = await metabinGate(ipfs, genreSchema)
    }
    openGate()
  }
}

const closeExtraGates = (actualGenres) => {
  const eachHandler = ({ name, gate }) => {
    if (!actualGenres.includes(name)) {
      gate.close()
    }
  }
  openedGenreGates.forEach(eachHandler)
  const filterHandler = ({ name, gate }) => actualGenres.includes(name)
  const actualGates = openedGenreGates.filter(filterHandler)
  openedGenreGates = actualGates
}

const initGenreGates = async (doc) => {
  const { genresToListen } = doc
  await Promise.all(genresToListen.map(initGenreGate))
  closeExtraGates(genresToListen)
}

const listenToSettings = () => {
  return settings.collection
    .findOne()
    .$
    .subscribe(initGenreGates)
}

export default listenToSettings
