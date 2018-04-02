const { remote } = require('electron')

const environment = remote.getGlobal('environment')

export const isDevelopment = environment === 'development'
export const isTesting = environment === 'testing'
// export const isOffline = argv.offline
