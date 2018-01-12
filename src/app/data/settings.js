
const name = 'settings'

const schema = {
  title: 'settings',
  version: 0, // <- incremental version-number
  type: 'object',
  properties: {
    genresToListen: {
      type: 'array',
      items: {
        type: 'string'
      },
      uniqueItems: true
    }
  }
}

export default { rxdb: { schema, name } }
