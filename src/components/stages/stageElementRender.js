import { getCourseID } from "../../scripts/getParamsValue.js"

const liRender = lessons => lessons.map((lesson, index) => {
    const { snippet } = lesson
    const courseID = getCourseID()

    return  `
        <li class="stage__lesson">
            <a class="stage__link" href="./video-player.html?course-id=${courseID}&lesson-id=${index}">${snippet.title}</a>
        </li>
    `
}).join('')

const stageRender = course => (
    `
    <section class="stage">
        <header class="stage__name js-header" tabindex="0">
            <div class="stage__circle">
                <div class="stage__check">1</div>
            </div>
            <div class="stage__header">
                <h2 class="stage__title">${course.name}</h2>
                <span>${course.lessonsQuantity} Aulas</span>
            </div>
        </header>
        <div class="stage__wrapper-ol js-wrapper">
            <ol class="stage__lessons js-ol">
                ${liRender(course.lessons)}
            </ol>
        </div>
    </section>
    `
)

export const stageElementRender = async channelInfo => {
    const containerStages = document.querySelector('.js-stages')
    
    const elementRendered = stageRender(channelInfo)
    containerStages.innerHTML = elementRendered
}

