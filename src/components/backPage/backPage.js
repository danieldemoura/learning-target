import { getCourseID } from "../../scripts/getParamsValue.js"

export const backPage = course => {
    const container = document.querySelector('[data-js="vd-controls"]')
    const channelURL = course.channelURL
    const courseID = getCourseID()

    container.innerHTML = `<a href="/src/pages/page-course.html?channel=${channelURL}&course-id=${courseID}" class="video__page" type="button" data-js="page">Página</a>` 
}