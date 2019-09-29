const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHTTPRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if(data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if(xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }

      showInfo(xhr.response);
    }

    xhr.onerror = () => {
      reject('Something went wrong!');
    }

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

const getData = () => {
  sendHTTPRequest('GET', 'https://randomuser.me/api/?results=50').then((responseData) => {
    console.log(responseData);
  });
}

const sendData = () => {
  sendHTTPRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  }).then((responseData) => {
    console.log(responseData);
  }).catch((err) => {
    console.log(err);
  })
}

const showInfo = (jsonObj) => {
  let people = jsonObj['results'];
  for(let i = 0; i < people.length; i++) {
    var element = document.createElement('h1');
    element.textContent = jsonObj.results[i].name.title + ' ' + jsonObj.results[i].name.first + ' ' + jsonObj.results[i].name.last;
    document.getElementById('control-info').appendChild(element);
  }
  
}

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);