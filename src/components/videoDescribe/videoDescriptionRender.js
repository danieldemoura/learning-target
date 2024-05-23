// import { getVideoData } from "../../api/getVideoData.js";

const videoDescription = document.querySelector('.js-video-desc');

export const videoDescriptionRender = lesson => {

    videoDescription.innerHTML = `
        <h2 class="description__title">Descrição</h2>
        <p class="description__text">${lesson.snippet.description}</p>
    `
}
