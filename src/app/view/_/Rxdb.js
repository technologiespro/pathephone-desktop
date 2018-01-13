import React from 'react'
import getDb from '../../api/rxdb'

class Rxdb extends React.Component {
  state = {
    data: null,
    error: null
  }
  performQuery = async ({ collection, query, queryBuilder, reactive }) => {
    try {
      const db = getDb()
      let queryObj
      if (queryBuilder) {
        queryObj = queryBuilder(db[collection])
      } else {
        queryObj = db[collection].find(query)
      }
      if (reactive === true) {
        this.subscription = queryObj.$.subscribe(data => {
          this.setState({ data })
        })
      } else {
        const data = await queryObj.exec()
        this.setState({ data })
      }
    } catch (error) {
      this.setState({ error })
    }
  }
  cancelSubscription = () => {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  componentWillMount () {
    this.performQuery(this.props)
  }
  componentWillReceiveProps (next) {
    this.cancelSubscription()
    this.performQuery(next)
  }
  componentWillUnmount () {
    this.cancelSubscription()
  }
  render () {
    return (
      <this.props.view {...this.state} />
    )
  }
}

export default Rxdb
