import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (newObject) => {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

const remove = soonRemoved => {
    if (window.confirm(`Do you really want to delete ${soonRemoved.name}`))
    {
        return axios.delete(`${baseUrl}/${soonRemoved.id}`)
    }
    else return false
}

const personService = { getAll, create, update, remove }

export default personService
