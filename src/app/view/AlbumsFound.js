import React from 'react'
import AlbumsFeed from './AlbumsFeed'
import GenresFilter from './AlbumsFeed/GenresFilter'
import Rxdb from './_/Rxdb'

const filterGenres = (docs) => {
  let genres = []
  const eachHandler = doc => {
    genres = [...genres, ...doc.genres]
  }
  docs.forEach(eachHandler)
  genres = Array.from(new Set(genres))
  return genres
}

class AlbumsFound extends React.Component {
  state = {
    genres: []
  }
  selectGenre = (genre, single) => {
    if (single) {
      this.setState({
        genres: [genre]
      })
    } else {
      const { genres } = this.state
      const selectedIndex = genres.indexOf(genre)
      if (selectedIndex > -1) {
        genres.splice(selectedIndex, 1)
      } else {
        genres.push(genre)
      }
      this.setState({ genres })
    }
  }
  render () {
    const { albums } = this.props
    const { genres } = this.state
    let filteredAlbums = albums
    if (genres.length > 0) {
      const someHandler = genre => genres.includes(genre)
      const filterHandler = doc => doc.genres.some(someHandler)
      filteredAlbums = albums.filter(filterHandler)
    }
    return (
      <div className='izi-fill izi-ys'>
        <GenresFilter
          allGenres={filterGenres(albums)}
          selectedGenres={genres}
          onSelect={this.selectGenre}
          key='filter'
        />
        <AlbumsFeed
          albums={filteredAlbums}
          key='feed'
        />
      </div>
    )
  }
}

const QueryHandler = ({ data, error }) => {
  if (error) {
    return <h1>{error.message}</h1>
  }
  if (!data || data.length === 0) {
    return (
      <h1>No albums found yet</h1>
    )
  }
  return <AlbumsFound albums={data} />
}

class Wrapper extends React.Component {
  render () {
    return <Rxdb collection='albums' reactive view={QueryHandler} />
  }
}

export default Wrapper
