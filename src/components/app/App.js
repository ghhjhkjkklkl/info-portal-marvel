import "./App.scss";
import Header from "../header/Header";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [showCharInfo, setShowCharInfo] = useState(false);

  const onCharSelected = (id) => {
    setSelectedChar(id);
    setShowCharInfo(true);
  };

  const onCloseCharInfo = () => {
    setShowCharInfo(false);
    setIsMobile(false);
  };

  useEffect(() => {
    setIsMobile(document.documentElement.clientWidth <= 1050 ? true : false);
  }, [selectedChar]);

  useEffect(() => {
    if (showCharInfo) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCharInfo]);

  return (
    <div className="container">
      <Header />
      <RandomChar />
      <div className="char-wrapper">
        <CharList onCharSelected={onCharSelected} />
        <ErrorBoundary>
          <CharInfo
            charId={selectedChar}
            isMobile={isMobile}
            isShow={showCharInfo}
            onCloseCharInfo={onCloseCharInfo}
          />
        </ErrorBoundary>
        {isMobile && showCharInfo && <div className="overlay"></div>}
      </div>
    </div>
  );
}

export default App;

// class App extends Component {
//   state = {
//     selectedChar: null,
//     showCharInfo: false,
//   };

//   onCharSelected = id => {
//     this.setState({
//       selectedChar: id,
//       showCharInfo: true,
//     });
//     document.body.style.overflow = 'hidden';
//   };

//   onCloseCharInfo = () => {
//     this.setState({
//       showCharInfo: false,
//     });
//     document.body.style.overflow = 'auto';
//   };

//   render() {
//     const { selectedChar, showCharInfo } = this.state;
//     return (
//       <div className="container">
//         <Header />
//         <RandomChar />
//         <div className="char-wrapper">
//           <CharList onCharSelected={this.onCharSelected} />
//           <ErrorBoundary>
//             <CharInfo
//               charId={selectedChar}
//               isShow={showCharInfo}
//               onCloseCharInfo={this.onCloseCharInfo}
//             />
//             {showCharInfo && <div className="overlay"></div>}
//           </ErrorBoundary>
//         </div>
//       </div>
//     );
//   }
// }
