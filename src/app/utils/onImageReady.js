const onImageReady = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(url)
    }
    image.onerror = (error) => {
      reject(error)
    }
    image.src = url
  })
}

export default onImageReady
