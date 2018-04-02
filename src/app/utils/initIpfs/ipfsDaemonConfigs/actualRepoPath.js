const { app } = require('electron').remote

const appDataPath = app.getPath('userData')

const repoPath = appDataPath + '/ipfsRepo'

export default repoPath
