export function initHiddenTextPoster () {
  document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.querySelector('.how-to-get__video-player')
    const videoTag = document.querySelector('.how-to-get__video-tag')
    const videoTitle = document.querySelector('.how-to-get__video-title')
    const hiddenText = 'how-to-get__hidden'

    function hideTextPoster () {
      videoTag.classList.add(hiddenText)
      videoTitle.classList.add(hiddenText)
    }

    videoPlayer.addEventListener('play', () => {hideTextPoster()})
  })
}