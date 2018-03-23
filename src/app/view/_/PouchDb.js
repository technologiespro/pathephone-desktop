import React from 'react'
import getDb from '../../api/rxdb'

const handleMapRows = row => row.doc

const fetchAllDocsFromDb = async db => {
  const { rows } = db.allDocs({ include_docs: true })
  return rows.map(handleMapRows)
}

class Rxdb extends React.Component {
  state = {
    data: null,
    error: null
  }
  componentWillMount () {
    this.handleProps(this.props)
  }
  componentWillReceiveProps (props) {
    this.handleProps(props)
  }
  handleProps = async ({ db, live }) => {
    try {
      if (live === true) {
        this.subscription = queryObj.$.subscribe(data => {
          this.setStatex({ data })
        })
      } else {
        const data = await queryObj.exec()
        this.setState({ data })
      }
    } catch (error) {
      this.setState({ error })
    }
  }
  componentWillUnmount () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  render () {
    return (
      <this.props.view {...this.state} />
    )
  }
}

export default Rxdb
