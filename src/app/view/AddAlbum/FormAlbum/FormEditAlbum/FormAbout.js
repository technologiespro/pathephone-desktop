import React from 'react'
import Input from '~components/Input'
import CoverInput from './FormAbout/CoverInput'

const AboutForm = (props) => {
  const { value, onChange, disabled } = props
  const handleChange = (e) => {
    const { name, value } = e.currentTarget
    onChange(name, value)
  }
  const handleCoverChange = (value) => {
    onChange('cover', value)
  }
  const { artist, title, cover } = value
  return (
    <fieldset disabled={disabled}>
      <legend>About album</legend>
      <div className='izi-xu'>
        <div className='izi-ys izi-fill-width izi-margin-top'>
          <Input
            value={title}
            placeholder='Album title'
            name='album.title'
            label
            type='text'
            onChange={handleChange}
          />
          <br />
          <Input
            value={artist}
            name='album.artist'
            label
            placeholder='Album artist'
            type='text'
            onChange={handleChange}
          />
        </div>
        <CoverInput
          value={cover}
          name='album.cover'
          onChange={handleCoverChange}
        />
      </div>
    </fieldset>
  )
}

export default AboutForm
