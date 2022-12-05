import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${url}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getPokemon();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
