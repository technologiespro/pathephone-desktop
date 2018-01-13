import React from 'react'

class GenresFilter extends React.Component {
  mapHandler = (genre) => {
    const { selectedGenres, onSelect } = this.props
    const clickHandler = () => {
      onSelect(genre)
    }
    const isSelected = selectedGenres.includes(genre)
    return (
      <button
        className={`${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
        key={genre}
      >
        {genre}
        <style jsx>{`
button.selected {
  background: orange;
  color: black;
}
        `}</style>
      </button>
    )
  }
  render () {
    const { allGenres } = this.props
    if (allGenres.length === 0) {
      return null
    }
    return (
      <div className='izi--gap izi-x izi--scroll'>
        {
          allGenres.map(this.mapHandler)
        }
        <style jsx>{`
div {
  border-bottom: 1px solid darkgrey;
}
        `}</style>
      </div>
    )
  }
}

export default GenresFilter
