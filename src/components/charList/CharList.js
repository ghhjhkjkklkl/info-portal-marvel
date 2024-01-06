import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import "./charList.scss";
import { useError, useLoading } from "../customHooks/customHooks";

function CharList({ onCharSelected }) {
  const {loading, setLoading} = useLoading(true);
  const {error, onError} = useError(false, setLoading);

  const [allCharacters, setAllCharacters] = useState([]);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charsEnded, setCharsEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateCharacters();
  }, []);


  const updateCharacters = (offset) => {
    setNewCharsLoading(true);
    marvelService
      .getAllCharacters(offset)
      .then(onCharactersLoaded)
      .catch(onError);
  };

  const onCharactersLoaded = (characters) => {
    setAllCharacters((allCharacters) => [...allCharacters, ...characters]);
    setLoading(false);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharsEnded(characters.length < 9 ? true : false);
  };

  const createItems = (array) => {
    return array.map(({ id, name, image }) => {
      let imgClass = null;
      if (image.includes("image_not_available")) {
        imgClass = "char-list__img--not-found";
      }
      return (
        <li
          key={id}
          className="char-list__item"
          onClick={() => onCharSelected(id)}
        >
          <img
            className={`char-list__img ${imgClass}`}
            src={image}
            alt={name}
          />
          <div className="char-list__group">
            <h2 className="char-list__title">{name}</h2>
          </div>
        </li>
      );
    });
  };

  const items = createItems(allCharacters);
  const spinner = loading ? <Spinner /> : null;
  const errorMsg = error ? <Error /> : null;
  return (
    <div className="char-list_wrapper">
      {errorMsg || spinner || <ul className="char-list__list">{items}</ul>}
      {!charsEnded && (
        <button
          disabled={newCharsLoading}
          onClick={() => updateCharacters(offset)}
          className="link link--big"
        >
          LOAD MORE
        </button>
      )}
    </div>
  );
}

export default CharList;
