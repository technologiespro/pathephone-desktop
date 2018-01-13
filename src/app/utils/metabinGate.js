import Ajv from 'ajv'
import CID from 'cids'

const dagParams = { format: 'dag-cbor', hashAlg: 'sha512' }

const openGate = async (ipfs, schema, listener) => {
  if (!ipfs) {
    throw new Error('js-ipfs or js-ipfs-api must be passed as the first argument.')
  }
  if (!schema) {
    throw new Error('JSON-schema must be passed as the second argument.')
  }
  if (!listener) {
    throw new Error('Function must be passed as the third argument.')
  }
  const ajv = new Ajv()
  const validator = ajv.compile(schema)
  const schemaCid = await ipfs.dag.put(schema, dagParams)
  const schemaCidString = schemaCid.toBaseEncodedString()
  const nodeId = ipfs.id()
  const listenerWrapper = async (message) => {
    console.log('===> metabin gate: incoming...')
    const { data, from } = message
    await nodeId
    if (from === nodeId) {
      console.log('===> ...our own message, skip.')
      return
    }
    const cidObj = new CID(data)
    const cidString = cidObj.toBaseEncodedString()
    const { value } = await ipfs.dag.get(cidString)
    const isValid = validator(value)
    if (isValid) {
      listener(value, cidString, from)
    }
  }
  ipfs.pubsub.subscribe(schemaCidString, listenerWrapper)
  const close = async () => {
    await ipfs.pubsub.unsubscribe(schemaCidString, listenerWrapper)
  }
  const send = async (instanceCandidate) => {
    if (!instanceCandidate) {
      throw new Error('Schema instance should be passed as the first argument')
    }
    const isValid = validator(instanceCandidate)
    if (isValid) {
      const cidObj = await ipfs.dag.put(instanceCandidate, dagParams)
      await ipfs.pubsub.publish(schemaCidString, cidObj.buffer)
      return cidObj.toBaseEncodedString()
    }
    throw new Error('Wrong schema instance passed.')
  }
  return { close, send }
}

export default openGate
