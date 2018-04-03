import IPFSFactory from 'ipfsd-ctl'
import patchIpfsApi from './startIpfsDaemon/patchIpfsApi'

const daemonFlags = ['--enable-pubsub-experiment']

const factoryParams = { type: 'go' }

const startIpfsDaemon = (daemonConfig) => {
  console.log(daemonConfig)
  const factory = IPFSFactory.create(factoryParams)
  return new Promise((resolve, reject) => {
    const startDaemon = (ipfsd) => {
      ipfsd.start(daemonFlags, (err, api) => {
        if (err) {
          reject(err)
        }
        console.log(ipfsd)
        patchIpfsApi(api)
        resolve(api)
      })
    }
    factory.spawn(daemonConfig, (err, ipfsd) => {
      if (err) {
        reject(err)
      }
      if (ipfsd.initialized) {
        startDaemon(ipfsd)
      } else {
        ipfsd.init((err) => {
          if (err) console.error(err)
          startDaemon(ipfsd)
        })
      }
    })
  })
}

export default startIpfsDaemon
