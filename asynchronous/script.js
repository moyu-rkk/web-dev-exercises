'use strict';

// const key = API_KEY;

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const [currencies] = Object.values(data.currencies);
  const currency = currencies.name; //因为API返回的数据结构有变化，这里取得货币名称和tutorial不一样，我改过了

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};


const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}


///////////////////////////////////////

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send(); // Async. Fetch data in the background.

//     request.addEventListener('load', function () {
//         // Use data from request.send()
//         const data = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//     <article class="country">
//       <img class="country__img" src="${data[0].flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data[0].name.common}</h3>
//         <h4 class="country__region">${data[0].region}</h4>
//         <p class="country__row"><span>👫</span>${(+data[0].population / 1000000).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data[0].languages.por}</p>
//         <p class="country__row"><span>💰</span>${data[0].currencies.EUR.name}</p>
//       </div>
//     </article>
//     `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// }

// getCountryData('portugal');
// getCountryData('spain');


//////////////////////////////////////////

// const getCountryAndNeighbour = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         // 用destructuring，不然就是一个object内嵌一个object，手动加个object[0]也不是不能用，就是很业余&丑
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country
//         renderCountry(data);

//         // Get neighbour country
//         const neighbour = data.borders?.[0];

//         if(!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const [data2] =JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         })
//     })
// }

// getCountryAndNeighbour('britain');


//////////////////////////////////////////////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (response) {
//     console.log(response);
//     return response.json(); // this json parse method also returns a promise
//   }).then(function (data) {
//     console.log(data); // data = response.json()
//     renderCountry(data[0]);
//   });
// }

// Simplified version
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0])
//       console.log(data);

//       // optional chaining
//       const neighbour = data[0].borders?.[0]
//       console.log(neighbour)

//       if (!neighbour) return; // return none

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json()) // this reponse is from fetching country 2. different from the one above.
//     .then(data => renderCountry(data[0], 'neighbour')) // 这里返回的data没有spread，所以是object嵌object的结构，所以要手动加个0，把内嵌object提取出来
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong: ${err.message}. Try agian!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// };


// handle error manually with a helper function
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // console.log(response);

    if (!response.ok)
      throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  })
}

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0])
      // console.log(data);

      // optional chaining
      const neighbour = data[0].borders?.[0]

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbour')) // 这里返回的data没有spread，所以是object嵌object的结构，所以要手动加个0，把内嵌object提取出来
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Try agian!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};


// btn.addEventListener('click', function () {
//   getCountryData('spain');
// })


// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You win');
//   } else {
//     reject('You lost')
//   }
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));


// Test data
// 52.508, 13.381
// 19.037, 72.873
// -33.933, 18.474

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=${key}`)
//     // 如果没有parse成json真的看不出它返回了一个什么东西，parse一下就有数据了，真神奇
//     // 但是这个API不是本身就会返回json格式的数据，为啥还要手动parse啊- -
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//       console.log(res)
//       return res.json() // manually return a promise
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`Country not found ${response.status}`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// }


// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); // 等效于上面的code
  });
}


//////////////////////////////////////////////////////////////////////////


// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;

//     return fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=${key}`)
//   })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//       console.log(res)
//       return res.json() // manually return a promise
//       // It doesn't return the promise from fetch. Instead, it returns a promise created by the fetch function.
//       // This is done because res.json() itself returns a promise that resolves when the JSON parsing is complete.
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`Country not found ${response.status}`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// }

// btn.addEventListener('click', whereAmI);


////////////////////////////////////////////////////////////////


// const imgPaths = ["img-1.jpg", "img-2.jpg", "img-3.jpg"];
// const createImage = function (imgPath) {
//   const img = document.createElement('img');
//   return new Promise(function (resolve, reject) {
//     if (imgPaths.includes(imgPath)) {
//       img.setAttribute("src", `img/${imgPath}`);
//       document.querySelector(".images").appendChild(img);
//       resolve("Image loaded.")
//     } else {
//       reject("Wrong path.")
//     }
//   })
//     .then(setTimeout(6000,
//       img.style.opacity = 0));
// }

// createImage("img-1.jpg")


// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };
// // function是一个promise，而不是要在function里展开一长串promise chain

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2); // manually return so then() will have an object to apply on
//   })
//   .then(() => {
//     currentImg.style.display = 'none'; // simply set display to none instead of opacity 思维惯性害人
//     return createImage('img/img-2.jpg')
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2); 
//   })
//   .then(() => {
//     currentImg.style.display = 'none'; 
//   })
//   .catch(err => console.error(err));

//////////////////////////////////////////////////////////

const whereAmI = async function () {
  try {  
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resCoord = await fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=${key}`);
    if(!resCoord.ok) throw new Error('Problem with getting location data')
    // fetch这里只有断网的情况下会返回error，API返回403/404这里不会管只有catch会处理，所以要在这里手动处理断网错误
    const dataCoord = await resCoord.json();
    console.log(dataCoord);

    // Country data
    const res = await fetch(`https://restcountries.com/v3.1/name/${dataCoord.country}`);
    if(!res.ok) throw new Error('Problem with getting Country')
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
  } catch (err) {
    console.log(`${err}`);
    renderError(`${err.message}`);
  }
}

whereAmI();

console.log('FIRST');