import { isDevelopment, isTesting } from './checkAppMode'

import startIpfsDaemon from './initIpfs/startIpfsDaemon'

import {
  ipfsDaemonDevConfig,
  ipfsDaemonProdConfig,
  ipfsDaemonTestConfig
} from './initIpfs/ipfsDaemonConfigs'

const initIpfs = () => {
  if (isTesting) {
    return startIpfsDaemon(ipfsDaemonTestConfig)
  }
  if (isDevelopment) {
    return startIpfsDaemon(ipfsDaemonDevConfig)
  }
  return startIpfsDaemon(ipfsDaemonDevConfig)
}

export default initIpfs
