import getIpfs from '../api/ipfs'

const dagParams = { format: 'dag-cbor', hashAlg: 'sha3-512' }

const shareAlbum = async (albumObj) => {
  const ipfsApi = await getIpfs()
  return ipfsApi.dag.put(albumObj, dagParams)
}

export default shareAlbum
