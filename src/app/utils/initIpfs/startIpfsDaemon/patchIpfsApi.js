// const IPFS = require('ipfs');
// const dagParams = { format: 'dag-cbor', hashAlg: 'sha3-512' }

import patchWithDag from './patchIpfsApi/patchWithDag'
import patchWithExists from './patchIpfsApi/patchWithExists'

const patchIpfsApi = async (ipfsApi) => {
  patchWithDag(ipfsApi)
  patchWithExists(ipfsApi)

  // исправляем баг с загрузкой
  const add = ipfsApi.add
  ipfsApi.add = (data) => new Promise(async (resolve) => {
    const r = await add(data)
    setTimeout(() => resolve(r), 1)
  })
  const put = ipfsApi.dag.put
  ipfsApi.dag.put = (a, b) => new Promise(async (resolve) => {
    const r = await put(a, b)
    setTimeout(() => resolve(r), 1)
  })
}

export default patchIpfsApi
