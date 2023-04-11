const API_URL = 'https://api.giphy.com/v1/gifs/trending?api_key=Bt1uIy2S9LonG1XUiGliN7XGs1OgLmcX&limit=25&rating=g';
const MAIN = document.getElementById('menu-container');
const GENRES = ['accion', 'aventura', 'crimen', 'comedia', 'drama'];
getData();

function showMovies(data) {
    MAIN.innerHTML = '';
    data.data.forEach(movie => {
        const box = document.createElement('div');
        box.classList.add('box');

        box.innerHTML = `
            <div class="box-img">
            <img src="${movie.images.original.url}">
        </div>
        <h2>${movie.title}</h2>
        <h3>${movie.source}</h3>
        <span>$10</span>
        <i class="bx bx-heart"></i>
        </div>`

        MAIN.appendChild(box);
    });
}

function getColor(vote) {
    if (vote >= 4) {
        return 'green';
    } else if (vote >= 2) {
        return 'orange';
    } else {
        return 'red';
    }
}

function getData() {
    let url = `${API_URL}`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {

        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            showMovies(datos);
            afterLoad();
        }
    }
}

function createElement(genre, movie) {
    const section = document.getElementById(genre);
    const article = section.getElementsByClassName('cards');
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('id', movie.id);
    div.innerHTML = `
            <img src="${movie.poster_path}" alt="${movie.title}"
              class="card__image" />
            <div class="card__content">
              <p>${movie.title}</p>
            </div>
            <div class="card__info">
              <div><i class="fa-solid fa-thumbs-up ${getColor(movie.vote_average)}"></i>${movie.vote_average}</div>
              <div>
                <a class="card__link">$500</a>
              </div>
        </div>`
    article[0].appendChild(div);
}
