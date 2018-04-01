import get from './patchWithDag/get'
import put from './patchWithDag/put'

const patchWithDag = (ipfsApi, endpoint) => {
  const apiEndpoint = `http://${ipfsApi.apiHost}:${ipfsApi.apiPort}/api/v0`
  ipfsApi.dag = {}
  ipfsApi.dag.get = get(apiEndpoint)
  ipfsApi.dag.put = put(apiEndpoint)
}

export default patchWithDag
