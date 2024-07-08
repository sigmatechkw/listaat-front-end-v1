export default (fileObject, valueSetter) => {
  const reader = new FileReader()

  reader.onload = e => {
    valueSetter(e.target.result)
  }
  reader.readAsDataURL(fileObject)
}
