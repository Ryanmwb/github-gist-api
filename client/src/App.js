import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert } from "antd";
import { get } from "lodash";
import axios from "axios";
// components
import Navbar from "./components/navbar";
// pages
import Search from "./pages/search";
import Gists from "./pages/gists";
import Gist from "./pages/gist";
// styles
import "./App.css";
import "antd/dist/antd.min.css";

const App = () => {
  const [error, setError] = useState(null);
  const [gists, setGists] = useState([]);
  const [favorites, setFavorites] = useState([]);

  console.log({ favorites });

  useEffect(() => {
    (async function () {
      const res = await axios.get("http://localhost:3010/favorite-gists");
      setFavorites(get(res, "data.rows", []));
    })();
  }, []);

  return (
    <BrowserRouter>
      <>
        {error && (
          <Alert
            message={error.title}
            description={get(error, "response.data.message", "")}
            closable
            onClose={() => setError(null)}
            type="error"
            showIcon
          />
        )}
        <Navbar gists={gists} favorites={favorites} />
        <Routes>
          <Route
            path="/"
            element={<Search setGists={setGists} setError={setError} />}
          />
          <Route
            path="/:username/gists"
            element={
              <Gists
                setError={setError}
                gists={gists}
                setGists={setGists}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/gist/:gistId"
            element={
              <Gist
                setError={setError}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
