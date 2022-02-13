import { get } from "lodash";
import { isFavoriteGist } from "./is-favorite-gist";

export function toggleFavorite({ gist, favorites, setFavorites }) {
  const gistId = get(gist, "id");
  let newFavorites = { ...favorites };
  if (isFavoriteGist(gistId, favorites)) {
    delete newFavorites[gistId];
  } else {
    newFavorites[gistId] = JSON.stringify(gist);
  }
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  setFavorites(newFavorites);
}
