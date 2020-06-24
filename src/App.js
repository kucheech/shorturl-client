import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './App.css';

const baseURL = 'https://kuch.tk';
const instance = axios.create({ baseURL });

const App = () => {
  const [url, setUrl] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [text, setText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) { return };

    const fetchData = async () => {
      const result = await instance.post('/shorten', { url }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setShortUrl(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const handleChange = event => {
    setShortUrl(null);
    setText(event.target.value);
  };

  const handleSubmit = event => {
    setIsLoading(true);
    setUrl(text);
    event.preventDefault();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={text} onChange={handleChange} placeholder="input url" className="urlinput" />
          <input type="submit" value="Shorten" className="button" disabled={!text || isLoading} />
        </div>
        <div>
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} visible={isLoading} />
          <a
            className="App-link"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </div>
      </form>
    </div >
  );
}

export default App;
