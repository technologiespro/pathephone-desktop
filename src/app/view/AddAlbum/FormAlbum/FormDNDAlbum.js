import React from 'react'
import MdDrop from 'react-icons/lib/md/arrow-downward'
import DNDarea from '@/DNDarea'
import { getAudioTracksFromFiles } from './TrackFileInput'
import { getImageFromFiles } from './CoverInput'

import fs from 'fs'
import path from 'path'
import directoryFilesRecursive from '~/utils/directoryFilesRecursive'
import fileType from 'file-type'

const getDirectoriesContentsRecursive = (files) => {
  const directories = files.filter(file => file.type === '')
  let directoriesFiles = []
  for (const directory of directories) {
    if (fs.statSync(directory.path).isDirectory()) { directoriesFiles = directoriesFiles.concat(directoryFilesRecursive(directory.path)) } // добавляем все файлы из всех директорий что перетащили
  }
  directoriesFiles = directoriesFiles.map(file => { // преобразуем пути файлов в объекты File
    const buffer = fs.readFileSync(file)
    let options
    try {
      options = {type: fileType(buffer).mime}
    } catch (e) {}
    const fileObject = new File([buffer], path.basename(file), options)
    Object.defineProperties(fileObject, {path: {value: file, writable: false}})
    return fileObject
  })
  return files.filter(file => file.type !== '').concat(directoriesFiles) // удаляем вначале все папки по которым прошлись, добавляем затем наши файлы
}

const getGenres = (tracks) => {
  console.log(tracks)
  let genres = []
  const eachGenreHandler = genre => {
    const genreLower = genre.toLowerCase()
    const exists = genres.find(({ title }) => title === genreLower)
    if (exists) {
      exists.count++
    } else {
      genres.push({
        title: genreLower,
        count: 1
      })
    }
  }
  const eachTrackHandler = track => {
    track.genre.forEach(eachGenreHandler)
  }
  tracks.forEach(eachTrackHandler)
  const sortHandler = (a, b) => b.count - a.count
  genres.sort(sortHandler)
  console.log(genres)
  const firstThree = genres.slice(0, 3)
  const mapHandler = ({ title }) => title
  return firstThree.map(mapHandler)
}

const getAlbumObjectFromFiles = async (files) => {
  files = Array.from(files)
  files = getDirectoriesContentsRecursive(files)
  const cover = await getImageFromFiles(files)
  const tracks = await getAudioTracksFromFiles(files)
  let artist = ''
  let title = ''
  let genres = []
  if (tracks.length > 0) {
    artist = tracks[0].artist
    title = tracks[0].album
    genres = getGenres(tracks)
    const mapHandler = genre => genre.toLowerCase()
    genres = genres.map(mapHandler)
  }
  return {
    title,
    artist,
    cover,
    tracks,
    genres
  }
}

class FormDNDAlbum extends React.Component {
  state = {
    processing: false
  }
  toggleProcessing = () => {
    this.setState({
      processing: !this.state.processing
    })
  }
  handleIncomingFiles = async (files) => {
    this.toggleProcessing()
    const albumObject = await getAlbumObjectFromFiles(files)
    this.props.onChange(albumObject)
    this.toggleProcessing()
  }
  render () {
    const { processing } = this.state
    return (
      <div
        className='izi-padding izi-ys izi-fill-width'
      >
        <fieldset>
          <DNDarea
            multiple
            onChange={this.handleIncomingFiles}
          >
            <div className='dnd-area izi-padding izi-y izi-center izi-gray'>
              {
                processing ? [
                  <MdDrop className='sync-icon rotating' key='icon' />,
                  <label className='izi-uppercase' key='label'>processing...</label>
                ] : [
                  <MdDrop className='dnd-icon animated infinite bounce' key='icon' />,
                  <label className='izi-uppercase' key='label'>drop here</label>
                ]
              }
            </div>
          </DNDarea>
        </fieldset>
        <style jsx>{`
.dnd-area {
  height: 20em;
}
        `}</style>
      </div>
    )
  }
}

export default FormDNDAlbum
