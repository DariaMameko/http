const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHTTPRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {},
  }).then((response) => {
      if(response.status >= 400) {
        response.json().then();
      }
      return response.json();
  });
};

const getData = () => {
  sendHTTPRequest('GET', 'https://randomuser.me/api/?results=50')
    .then((responseData) => {
      console.log(responseData);
      showInfo(responseData);
    })
}

const showInfo = (jsonObj) => {
  let people = jsonObj['results'];
  for(let i = 0; i < people.length; i++){
    let element = document.createElement('h1');
    element.textContent = jsonObj.results[i].name.title + ' ' + jsonObj.results[i].name.first + ' ' + jsonObj.results[i].name.last;
    document.getElementById('control-info').appendChild(element);
  }
}


const sendData = () => {
  sendHTTPRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  }).then((responseData) => {
    console.log(responseData);
  }).catch((err) => {
    console.log(err);
  });
}

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);