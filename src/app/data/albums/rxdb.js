import instanceSchema from './instanceSchema'

const name = 'albums'

const schema = {
  title: 'album',
  version: 1, // <- incremental version-number
  type: 'object',
  properties: {
    cid: {
      type: 'string',
      minLength: 1
    },
    genres: {
      type: 'array',
      items: {
        type: 'string'
      },
      uniqueItems: true
    },
    data: instanceSchema
  }
}

const migrationStrategies = {
  1: (oldDoc) => {
    oldDoc.genres = []
    return oldDoc
  }
}

export default { schema, migrationStrategies, name }
