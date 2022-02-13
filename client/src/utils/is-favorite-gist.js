export function isFavoriteGist(currentGistId, favoriteGistsObj) {
  return currentGistId in favoriteGistsObj;
}
