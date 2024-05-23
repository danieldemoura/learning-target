import { getCourseID, getLessonID } from "../../scripts/getParamsValue.js"

const scrollToSelectedElement = container => {
    const currentLi = document.querySelector('.is-selected')
    container.scrollTop =  currentLi.offsetTop - 10
}

const relatedVideos = lessons => lessons.map(({ snippet }, index) => {
    const courseID = getCourseID()
    const lessonID = getLessonID()
    const itemSelected = Number(lessonID) === index ? 'is-selected' : ''

    return `
        <li class="reletad-videos__video ${itemSelected}">
            <iconify-icon icon="subway:video-1" width="40px" height="40px"  style="color: #3D87CC"></iconify-icon>
            <a class="reletad-videos__link" href="./video-player.html?course-id=${courseID}&lesson-id=${index}">
            ${snippet.title}</a>
        </li>
    `
}).join('')

const showTotalLessons = lesson => {
    const span = document.querySelector(".js-total-lessons")
    span.innerHTML = `Aulas 00/${lesson.length}`
}

export const relatedVideosRender = lesson => {
    const container = document.querySelector('.js-related-container')
    showTotalLessons(lesson) 

    container.innerHTML = relatedVideos(lesson)
    scrollToSelectedElement(container)
}