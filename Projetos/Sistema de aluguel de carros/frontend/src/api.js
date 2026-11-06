import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export function setBasicAuth(login, senha) {
  if (login && senha) {
    api.defaults.headers.common['Authorization'] =
      'Basic ' + btoa(`${login}:${senha}`)
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
