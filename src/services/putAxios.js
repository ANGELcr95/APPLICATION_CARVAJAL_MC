export default function putAxios (url, body, token = '') {
  const REACT_API_URL  = process.env.REACT_APP_API_URL
  return fetch(`${REACT_API_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(response => response).catch(error => error)
}
