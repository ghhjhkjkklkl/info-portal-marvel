import { useState } from "react";

function useError(initialValue, setLoading) {
  const [error, setError] = useState(initialValue);

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  return { error, onError, setError };
}

function useLoading(initialValue) {
  const [loading, setLoading] = useState(initialValue);
  return {loading, setLoading}
}

function useCharLoaded(initialValue, setLoading) {
  const [char, setChar] = useState(initialValue);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };
  return { char, onCharLoaded };
}

export { useError, useCharLoaded, useLoading };
