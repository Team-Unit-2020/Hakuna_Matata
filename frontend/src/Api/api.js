import axios from 'axios'

const getAcceccToken = () => localStorage.getItem("access_token");

export const sendRequest = (httpMethod, url, body) => new Promise((resolve, reject) => {
  axios({
    method: httpMethod,
    url: url,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAcceccToken()}`
    }
  }).then(response => {
    if(response.data.status === 200){
      resolve(response.data)
    }else{
      reject(response.data)
    }
  }).catch(error => {
    reject(error)
  })
})