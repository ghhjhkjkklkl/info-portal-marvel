import { useEffect, useState } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import "./randomChar.scss";
import {
  useCharLoaded,
  useError,
  useLoading,
} from "../customHooks/customHooks";

function RandomChar() {
  const { loading, setLoading } = useLoading(true);
  const { error, setError, onError } = useError(false, setLoading);
  const { char, onCharLoaded } = useCharLoaded(null, setLoading);

  useEffect(() => {
    updateChar();
  }, []);

  const marvelService = new MarvelService();

  const updateChar = () => {
    const id = Math.floor(Math.random() * 400 + 1011000);
    setLoading(true);
    setError(false);
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="random-char">
      <div className="random-char__wrapper">
        {errorMessage || spinner || <RandomCharTemp char={char} />}
      </div>
      <div className="random-char__actions">
        <p className="random-char__actions-text">
          Random character for today! <br />
          Do you want to get to know him better?
        </p>
        <p className="random-char__actions-text ">Or choose another one</p>
        <button onClick={updateChar} className="link link--background">
          TRY IT
        </button>
      </div>
    </div>
  );
}

function RandomCharTemp({ char: { name, image, descr, homepage, wiki } }) {
  let imgClass = null;
  if (image.includes("image_not_available")) {
    imgClass = "random-char__img--not-found";
  }
  return (
    <div className="random-char__info">
      <img className={`random-char__img ${imgClass}`} src={image} alt={name} />
      <div className="random-char__group">
        <h2>{name}</h2>
        <p className="random-char__descr">{descr}</p>
        <div className="random-char__link-group">
          <a className="link" href={homepage}>
            HOMEPAGE
          </a>
          <a className="link  link--color" href={wiki}>
            WIKI
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;

// class RandomChar extends Component {
//   state = {
//     char: {
//       name: "",
//       image: "",
//       descr: "",
//       homepage: "",
//       wiki: "",
//     },
//     loading: true,
//     error: false,
//   };

//   componentDidMount() {
//     this.updateChar();
//     //this.intervalId = setInterval(this.updateChar, 5000);
//   }

//   /* componentDidUpdate() {
//     console.log("update");
//   } */

//   /* componentWillUnmount() {
//     clearInterval(this.intervalId);
//   } */

//   marvelService = new MarvelService();

//   updateChar = () => {
//     const id = Math.floor(Math.random() * 400 + 1011000);
//     this.marvelService
//       .getCharacter(id)
//       .then(this.onCharLoaded)
//       .catch(this.onError);
//   };

//   onCharLoaded = (char) => {
//     this.setState({
//       char,
//       loading: false,
//     });
//   };

//   onError = () => {
//     this.setState({
//       error: true,
//       loading: false,
//     });
//   };

//   render() {
//     const { char, error, loading } = this.state;
//     const errorMessage = error ? <Error /> : null;
//     const spinner = loading ? <Spinner /> : null;

//     return (
//       <div className="random-char">
//         <div className="random-char__wrapper">
//           {errorMessage || spinner || <RandomCharTemp char={char} />}
//         </div>
//         <div className="random-char__actions">
//           <p className="random-char__actions-text">
//             Random character for today! <br />
//             Do you want to get to know him better?
//           </p>
//           <p className="random-char__actions-text ">Or choose another one</p>
//           <button onClick={this.updateChar} className="link link--background">
//             TRY IT
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// function RandomCharTemp({ char: { name, image, descr, homepage, wiki } }) {
//   let imgClass = null;
//   if (image.includes("image_not_available")) {
//     imgClass = "random-char__img--not-found";
//   }
//   return (
//     <div className="random-char__info">
//       <img className={`random-char__img ${imgClass}`} src={image} alt={name} />
//       <div className="random-char__group">
//         <h2>{name}</h2>
//         <p className="random-char__descr">{descr}</p>
//         <div className="random-char__link-group">
//           <a className="link" href={homepage}>
//             HOMEPAGE
//           </a>
//           <a className="link  link--color" href={wiki}>
//             WIKI
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
