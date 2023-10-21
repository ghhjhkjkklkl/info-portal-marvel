import "./App.scss";
import Header from "../header/Header";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Component } from "react";

class App extends Component {
  state = {
    selectedChar: null,
    showCharInfo: false,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
      showCharInfo: true,
    });
  };

  onCloseCharInfo = () => {
    this.setState({
      showCharInfo: false,
    });
  };

  render() {
    const { selectedChar, showCharInfo } = this.state;
    return (
      <div className="container">
        <Header />
        <RandomChar />
        <div className="char-wrapper">
          <CharList onCharSelected={this.onCharSelected} />
          <ErrorBoundary>
            <CharInfo
              charId={selectedChar}
              isShow={showCharInfo}
              onCloseCharInfo={this.onCloseCharInfo}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
