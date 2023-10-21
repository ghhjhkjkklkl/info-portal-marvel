class MarvelService {
  #apiKey = "apikey=304acbfd4cd456dad9236c0068e94e41";
  #apiURL = "https://gateway.marvel.com:443/v1/public";
  #offset = 210;

  #fetchData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      return new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  getCharacter = async (id) => {
    const data = await this.#fetchData(
      `${this.#apiURL}/characters/${id}?${this.#apiKey}`
    );
    return this.#transformCharacter(data.data.results[0]);
  };

  getAllCharacters = async (offset = this.#offset) => {
    const data = await this.#fetchData(
      `${this.#apiURL}/characters?limit=9&offset=${offset}&${this.#apiKey}`
    );
    return data.data.results.map(this.#transformCharacter);
  };

  #transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      image: char.thumbnail.path + "." + char.thumbnail.extension,
      descr: char.description || "Description not found",
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
