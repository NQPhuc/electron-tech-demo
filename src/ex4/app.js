function setTitle() {
  const titleInput = document.querySelector('#title');
  const newTitle = titleInput.value || 'Untitled';
  window.preloadAPI.setTitle(newTitle);
}