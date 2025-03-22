import React, { useEffect, useState } from "react";
import "./styles.css";

const BASE_SEARCH_URL = "https://dummyjson.com/products/search?q=";

const AutoSuggest = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [cache, setCache] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    }

    const fetchData = async () => {
      console.log("cache", cache);
      try {
        if (cache[query]) {
          console.log("from cache");
          setProducts(cache[query]);
          return;
        }
        console.log("fresh");
        const response = await fetch(`${BASE_SEARCH_URL}${query}`);
        const data = await response.json();
        setProducts(data.products || []);
        setCache({
          ...cache,
          [query]: data.products,
        });
        if (data.products) {
          setIsActive(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      }
    };

    const debounceTimeout = setTimeout(fetchData, 300); // Debounce input to optimize API calls

    return () => clearTimeout(debounceTimeout);
  }, [query]);
  const handleOnBlur = () => {
    setIsActive(false);
  };

  return (
    <div className="container">
      <div className="searchBoxContainer">
        <input
          type="text"
          value={query}
          onClick={(e) => setIsActive(true)}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleOnBlur}
        ></input>
      </div>
      {!!products.length && isActive && (
        <div className="autoSuggest">
          {products.map((product: any, index: number) => (
            <div key={index}>{product.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoSuggest;
