
export const alphaDashValidator = (value:any) => {
  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character is not valid'
}


export const required = (value:any) => {
  return value && value.length ? true : 'This field is required'
}