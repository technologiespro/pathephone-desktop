import React from 'react'
import FormAbout from './FormAbout'
import FormTracks from './FormTracks'
import albums from '~/data/albums'
import validateAlbum from '~/scripts/validateAlbum'
import shareAlbum from '~/scripts/shareAlbum'

const saveNewAlbum = async (albumValue) => {
  console.log(albumValue)
  const { genres, ...data } = albumValue
  const cid = await shareAlbum(data)
  const albumDoc = {
    genres, data, cid: cid.toBaseEncodedString()
  }
  return albums.collection.insert(albumDoc)
}

const Tips = () => (
  <fieldset>
    <legend>Tips</legend>
    <ul>
      <li>You can just <b>drag and drop</b> album files here. All fields will be filled automatically if possible.</li>
    </ul>
    <style jsx>{`
fieldset {
  color: green;
}
    `}</style>
  </fieldset>
)

const Error = ({ dataPath, message }, index) => {
  return <li key={dataPath}><b>{dataPath}</b> {message}</li>
}

const Errors = ({ data }) => (
  <fieldset id='add-album_errors'>
    <legend>Some errors occured</legend>
    <ul>
      {
        data.map(Error)
      }
    </ul>
    <style jsx>{`
fieldset {
  color: red;
}
    `}</style>
  </fieldset>
)

const FormGenres = ({ value, onChange }) => {
  const changeHandler = e => {
    onChange(e.currentTarget.value)
  }
  return (
    <fieldset>
      <legend>Genres</legend>
      <input
        type='text'
        value={value}
        onChange={changeHandler}
      />
    </fieldset>
  )
}

class FormEditAlbum extends React.Component {
  state = {
    loading: false,
    errors: false
  }
  handleFormSubmit = async (e) => {
    try {
      e.preventDefault()
      this.setState({ loading: true })
      const { formState } = this.props
      const { valid, errors } = validateAlbum(formState)
      if (!valid) {
        this.setState({ errors, loading: false })
      } else {
        await saveNewAlbum(formState)
        this.props.onSuccess()
      }
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    const { formState } = this.props
    const { errors } = this.state
    return (
      <div
        className='izi--gap izi-ys izi-fill-width'
        id='add-album_form'
      >
        <Tips />
        <FormAbout
          value={formState}
          onChange={this.props.onAboutChange}
        />
        <FormGenres
          value={formState.genres}
          onChange={this.props.onGenresChange}
        />
        <FormTracks
          value={formState}
          onTrackChange={this.props.onTrackChange}
          onAddTracks={this.props.onAddTracks}
          onDeleteTrack={this.props.onDeleteTrack}
          onMoveTrackUp={this.props.onMoveTrackUp}
          onMoveTrackDown={this.props.onMoveTrackDown}
        />
        {
          errors && (
            <Errors data={errors} />
          )
        }
        <button id='add-album_submit' onClick={this.handleFormSubmit}>
          done
        </button>
      </div>
    )
  }
}

export default FormEditAlbum
