import getActualRepoPath from './ipfsDaemonConfigs/getActualRepoPath'

const repoPath = getActualRepoPath()

export const ipfsDaemonTestConfig = {
  repoPath
}

export const ipfsDaemonDevConfig = {
  disposable: false,
  repoPath
}

export const ipfsDaemonProdConfig = {
  disposable: false,
  repoPath
}
