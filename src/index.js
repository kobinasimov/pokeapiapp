init();

var gCurrentOffset = 0;

const nextBtnel = document.querySelector(".next");
const previousBtnEl = document.querySelector(".previous");

console.log({ nextBtnel, previousBtnEl });

nextBtnel.addEventListener("click", function () {
  console.log("nextBtnel clicked");
  gCurrentOffset = gCurrentOffset + 10;
  getPaginatedList(10, gCurrentOffset).then(function (data) {
    fetchUrlList(data.results).then(function (pokemonArray) {
      console.log({ data, res: pokemonArray });
      renderList(pokemonArray);
    });
  });
});

previousBtnEl.addEventListener("click", function () {
  console.log("previousBtnEl clicked");
  if (gCurrentOffset === 0) return;
  gCurrentOffset = gCurrentOffset - 10;
  getPaginatedList(10, gCurrentOffset).then(function (data) {
    fetchUrlList(data.results).then(function (pokemonArray) {
      console.log({ data, res: pokemonArray });
      renderList(pokemonArray);
    });
  });
});

function init() {
  gCurrentOffset = 0;
  getPaginatedList(10, gCurrentOffset).then(function (data) {
    fetchUrlList(data.results).then(function (pokemonArray) {
      console.log({ data, res: pokemonArray });
      renderList(pokemonArray);
    });
  });
}

function getPaginatedList(limit = 10, offset = 0) {
  const apiListUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  return fetch(apiListUrl).then((response) => response.json());
}

function renderPokemonCard(pokemon) {
  return /* html */ `
        <div class="pokemon">
            <h3 class="pokemon-name">${pokemon.name}</h3>
            <img
            src="${pokemon.sprites.front_default}"
            alt="picture of ${pokemon.name}"
            class="pokemon-sprite"
            />
        </div>
    `;
}

function renderList(pokemonArr) {
  const mainEl = document.querySelector(".pokemon-list");

  mainEl.innerHTML = pokemonArr.map(renderPokemonCard).join("");
}

function fetchPokemonData(url) {
  return fetch(url).then((response) => response.json());
}

function fetchUrlList(urlArr) {
  const pokemonArr = [];
  urlArr.forEach(function (entry) {
    pokemonArr.push(fetchPokemonData(entry.url));
  });

  return Promise.all(pokemonArr);
}
