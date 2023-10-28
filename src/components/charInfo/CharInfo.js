import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import close from '../../resources/img/close.svg';
import './charInfo.scss';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
    isMobile: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.setState({
      isMobile: document.documentElement.clientWidth <= 1050 ? true : false,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;

    this.setState({
      loading: true,
    });

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = char => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      char: {},
      error: true,
      loading: false,
    });
  };

  render() {
    const { char, error, loading, isMobile } = this.state;
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;
    const skeleton = char || spinner || errorMessage ? null : <Skeleton />;

    const isModalOpen = this.props.isShow;
    if (isModalOpen) {
      document.body.classList.add('char-info-open');
    } else {
      document.body.classList.remove('char-info-open');
    }

    return (
      <div
        className={`char-info__wrapper ${isMobile ? 'isMobile' : ''} ${
          this.props.isShow ? 'show' : 'hidden'
        }`}
      >
        {skeleton || spinner || errorMessage || (
          <CharInfoTemp
            char={char}
            onCloseCharInfo={this.props.onCloseCharInfo}
          />
        )}
      </div>
    );
  }
}

function CharInfoTemp({ char, onCloseCharInfo }) {
  const { name, image, homepage, wiki, descr, comics } = char;

  let comicsMarkup = [];

  if (comics.length > 0) {
    comicsMarkup = comics.slice(0, 10).map((item, index) => (
      <li key={index} className="char-info__comics-item">
        {item.name}
      </li>
    ));
  }

  return (
    <div className="char-info">
      <img
        onClick={onCloseCharInfo}
        className="char-info__close"
        src={close}
        alt="close char info"
      />
      <div className="char-info__inner">
        <img className={'char-info__img'} src={image} alt={name} />
        <div>
          <h2 className="char-info__name">{name}</h2>
          <a className="link" href={homepage}>
            HOMEPAGE
          </a>
          <a className="link  link--color" href={wiki}>
            WIKI
          </a>
        </div>
      </div>
      <p className="char-info__descr">{descr}</p>
      <h3 className="char-info__list-title">Comics:</h3>
      <ul className="char-info__comics-list">
        {comicsMarkup.length > 0 ? comicsMarkup : <li>Comics not found</li>}
      </ul>
    </div>
  );
}

export default CharInfo;
