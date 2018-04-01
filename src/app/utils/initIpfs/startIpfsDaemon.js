import IPFSFactory from 'ipfsd-ctl'
import patchIpfsApi from './startIpfsDaemon/patchIpfsApi'

const daemonFlags = ['--enable-pubsub-experiment']

const startIpfsDaemon = (daemonConfig) => {
  const server = IPFSFactory.createServer()
  const factory = IPFSFactory.create()
  return new Promise((resolve, reject) => {
    server.start((err) => {
      if (err) {
        reject(err)
      }
      factory.spawn(daemonConfig, (err, ipfsd) => {
        if (err) {
          reject(err)
        }
        const startDaemon = () => {
          ipfsd.start(daemonFlags, (err, api) => {
            if (err) {
              reject(err)
            }
            patchIpfsApi(api)
            resolve(api)
          })
        }
        ipfsd.init((err, ipfsd) => {
          if (err) console.error(err)
          startDaemon()
        })
      })
    })
  })
}

export default startIpfsDaemon
