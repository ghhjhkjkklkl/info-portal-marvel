import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import "./charList.scss";

class CharList extends Component {
  state = {
    allCharacters: [],
    loading: true,
    error: false,
    newCharsLoading: false,
    offset: 210,
    charsEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacters();
  }

  onNewCharsLoading = () => {
    this.setState({
      newCharsLoading: true,
    });
  };

  updateCharacters = (offset) => {
    this.onNewCharsLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onCharactersLoaded = (characters) => {
    this.setState(({ allCharacters, offset }) => ({
      allCharacters: [...allCharacters, ...characters],
      loading: false,
      newCharsLoading: false,
      offset: offset + 9,
      charsEnded: characters.length < 9 ? true : false,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
    });
  };

  createItems = (array) => {
    return array.map(({ id, name, image }) => {
      let imgClass = null;
      if (image.includes("image_not_available")) {
        imgClass = "char-list__img--not-found";
      }
      return (
        <li
          key={id}
          className="char-list__item"
          onClick={() => this.props.onCharSelected(id)}
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

  render() {
    const {
      allCharacters,
      loading,
      error,
      offset,
      newCharsLoading,
      charsEnded,
    } = this.state;

    const items = this.createItems(allCharacters);
    const spinner = loading ? <Spinner /> : null;
    const errorMsg = error ? <Error /> : null;
    return (
      <div className="char-list_wrapper">
        {errorMsg || spinner || <ul className="char-list__list">{items}</ul>}
        {!charsEnded && (
          <button
            disabled={newCharsLoading}
            onClick={() => this.updateCharacters(offset)}
            className="link link--big"
          >
            LOAD MORE
          </button>
        )}
      </div>
    );
  }
}

export default CharList;
