import { get } from "lodash";

export function isFavoriteGist(currentGistId, favoriteGistsArr) {
  return favoriteGistsArr.some(
    (favoriteGist) => get(favoriteGist, "gist_id") === currentGistId
  );
}
