import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error) {
    this.setState({
      error: true,
    });
  }
  render() {
    const { error } = this.state;
    console.log(error);
    if (error) {
      return <h2>Something went wrong...</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
