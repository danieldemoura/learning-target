import { asideRender } from "./asideRender.js"
import { getCourseID } from "./getParamsValue.js"
import { stageElementRender } from "../components/stages/stageElementRender.js"
import { getCoursesFromMockAPI } from "../mockAPI/getCoursesFromMockAPI.js"

const courseBanner = document.querySelector('[data-js="course-banner"]')

const fetchDataFromAPI = async () => {
    const courseID = getCourseID()
    return getCoursesFromMockAPI(courseID)
}

const courseBannerRender = channelInfo => {
    const { name, teacherPhoto, description, plataform, tags }  = channelInfo

    courseBanner.innerHTML = `
        <div class="article__content">
            <figure>
                <img class="article__poster" src="${teacherPhoto}" alt="Avatar do canal ${name}">
            </figure>
            <div class="article__wrapper">
                <a class="article__label" href="#">Plataforma: ${plataform}</a>
                <h1 class="article__title">${name}</h1>
                <div class="article__description">
                    <p class="article__paragraph">${description}</p>
                </div>
                <div class="article__tags">
                    <a class="article__tag" href="#">${tags[0]}</a>
                    <a class="article__tag" href="#">${tags[1]}</a>
                </div>
            </div>
        </div>
    `
}

export const coursePageRender = async () => {
    const channelInfo = await fetchDataFromAPI()

    courseBannerRender(channelInfo)
    stageElementRender(channelInfo)
    asideRender(channelInfo)
}