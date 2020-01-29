export const getPresignedURL = async img => {
  const { url, name } = await fetch(`/api/presignedRequest/${img.name.replace(/ /g, '_')}&${encodeURIComponent(img.type)}`, {
    method: 'GET',
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  }).then(res => res.json())

  const { status } = await fetch(url, {
    method: 'PUT',
    body: img
  })

  return { status, name }
}
