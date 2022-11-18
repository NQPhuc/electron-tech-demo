function setTitle() {
  const titleInput = document.querySelector('#title');
  const newTitle = titleInput.value || 'Untitled';
  window.preloadAPI.setTitle(newTitle);
}

async function captureScreenshot() {
  const imgTag = document.querySelector('#screenshot');
  const image = await window.preloadAPI.captureScreenshot();
  imgTag.src = image;
}