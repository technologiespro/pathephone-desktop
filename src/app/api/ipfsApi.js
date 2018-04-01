
let api

export const putIpfsApi = ipfsApi => {
  api = ipfsApi
}

export default () => {
  if (api) return api
  throw new Error('You need to initialize IPFS first.')
}
