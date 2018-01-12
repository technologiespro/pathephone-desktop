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
  const nodeId = await ipfs.id()
  const ajv = new Ajv()
  const validator = ajv.compile(schema)
  const schemaCid = await ipfs.dag.put(schema, dagParams)
  console.log('OPENED')
  const schemaCidString = schemaCid.toBaseEncodedString()
  const listenerWrapper = async (message) => {
    const { data, from } = message
    if (from === nodeId) return
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
