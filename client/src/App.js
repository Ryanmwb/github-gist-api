import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert } from "antd";
import { get } from "lodash";

// components
import Navbar from "./components/navbar";
// pages
import Search from "./pages/search";
import Gists from "./pages/gists";
import Gist from "./pages/gist";
// styles
import "./App.css";
import "antd/dist/antd.min.css";
// // TODO: 1) you can assume the app will only be used by one user and no need for saving
// // TODO: 2) modal for searching for users
// // TODO: 3) create gists page for displaying gists (summary form).  Should contain description and date at least
// // todo: 4) create gist detail page that lists all the files under that gist.
// // todo: 5) each gist should be savable as a favorite and can unfavorite
// todo 6) create basic top navbar to move between pages
// // todo 7) create a modal that displays favorites

const App = () => {
  const [error, setError] = useState(null);
  const [gists, setGists] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || {}
  );

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
