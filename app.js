const URL = 'https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc&api_key=fd24ac99cd08ae9276b2c8552cb4194e';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';
const SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=fd24ac99cd08ae9276b2c8552cb4194e&query=';

const main = document.querySelector(".section");
const form = document.querySelector(".query-form");
const query = document.querySelector(".query");

const returnMovies = async (url) => {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Something went wrong`)
        }
        const data = await response.json();
        // console.log(data.results);

        data.results.forEach(element => {
            const div_row = document.createElement('div');
            div_row.classList.add('row');

            const div_column = document.createElement('div');
            div_column.classList.add('column');

            const div_card = document.createElement('div');
            div_card.classList.add('card');

            const div_img = document.createElement('img');
            div_img.classList.add('thumbnail');

            const div_title = document.createElement('h3');
            div_title.classList.add('title');

            div_img.src = IMAGE_URL + element.poster_path;
            div_title.innerHTML = `${element.title}`;

            div_card.appendChild(div_img);
            div_card.appendChild(div_title);
            div_column.appendChild(div_card);
            console.log(div_column);
            div_row.appendChild(div_column);
            main.appendChild(div_row);

        })

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchItem = query.value;

    if(searchItem){
        returnMovies(SEARCH + searchItem);
        query.value = "";
    }

})

returnMovies(URL);

