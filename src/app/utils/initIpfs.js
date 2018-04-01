
import env from 'env'

import {
  NODE_ENV_TEST,
  NODE_ENV_PROD
} from '~app/data/constants'

import {
  ipfsDaemonDevConfig,
  ipfsDaemonProdConfig,
  ipfsDaemonTestConfig
} from './initIpfs/ipfsDaemonConfigs'

import startIpfsDaemon from './initIpfs/startIpfsDaemon'

const { NODE_ENV } = process.env

console.log(NODE_ENV)

const initIpfs = () => {
  if (NODE_ENV === NODE_ENV_TEST) {
    return startIpfsDaemon(ipfsDaemonTestConfig)
  }
  if (NODE_ENV === NODE_ENV_PROD) {
    return startIpfsDaemon(ipfsDaemonProdConfig)
  }
  return startIpfsDaemon(ipfsDaemonDevConfig)
}

export default initIpfs
