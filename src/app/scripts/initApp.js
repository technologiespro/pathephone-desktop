import initDb from '~app/scripts/initDb'
import openGates from '~app/scripts/openGates'
import initIpfs from '~app/utils/initIpfs'

import { putIpfsApi } from '~app/api/ipfsApi'

const initApp = async ({ onNextStage }) => {
  try {
    onNextStage({ message: 'rxdb', ready: 0 })
    await initDb()
    onNextStage({ message: 'ipfs daemon', ready: 20 })
    const ipfsApi = await initIpfs()
    putIpfsApi(ipfsApi)
    onNextStage({ message: 'metabin gates', ready: 70 })
    await openGates()
    onNextStage({ message: 'ready', ready: 100 })
    setTimeout(
      () => {
        onNextStage({ ready: true })
      }, 500
    )
  } catch (error) {
    console.error(error)
    onNextStage({ error })
  }
}

export default initApp
