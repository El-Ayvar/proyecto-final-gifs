const btnSearch = document.querySelector("#search-btn");
const resultado = document.querySelector('#resultado');
const loader = document.querySelector('#loader');

const searchGif = () => {
    const gifName = document.querySelector("#gif-input").value.trim();
    if (!gifName) {
        document.querySelector("#gif-info").innerHTML = `<p>Por favor, ingresa el nombre de un GIF.</p>`;
        return;
    }

    const apiKey = "3mK7em9Aeq76yOYBf9IfDqGl8voyN45c";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifName}&limit=20`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al buscar los GIFs");
            }
            return response.json();
        })
        .then(data => {
            if (data.data.length === 0) {
                throw new Error("No se encontraron resultados");
            }
            showGifs(data.data);
        })
        .catch(error => {
            document.querySelector("#gif-info").innerHTML = `<p id="mensaje-error">${error.message}</p>`;
        });
};

function showGifs(gifs) {

    resultado.classList.remove('hidden');
    loader.classList.remove('hidden');
    resultado.innerHTML = '';

    setTimeout(() => {
        loader.classList.add('hidden');

        const gifInfo = document.querySelector("#gif-info");
        gifInfo.innerHTML = "";

            gifs.forEach(gif => {
            gifInfo.innerHTML += `
                <div id="box-gif">
                    <h2>${gif.title.toUpperCase()}</h2>
                    <img src="${gif.images.original.url}" alt="${gif.title}"/>
                </div>
            `;
        });
    },1500);
}
btnSearch.addEventListener("click", searchGif);