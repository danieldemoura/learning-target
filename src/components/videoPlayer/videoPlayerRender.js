import { getCoursesFromMockAPI } from "../../mockAPI/getCoursesFromMockAPI.js"
import { getCourseID, getLessonID } from "../../scripts/getParamsValue.js"
import { backPage } from "../backPage/backPage.js"
import { relatedVideosRender } from "../relatedVideos/relatedVideosRender.js"
import { videoDescriptionRender } from "../videoDescribe/videoDescriptionRender.js"

const videoContainer = document.querySelector('[data-js="video-container"]') 

const createVideo = url => {
    let iframe = document.createElement('iframe')

    const attributes = {
        title: 'Player de Video',
        src: `https://www.youtube.com/embed/${url}`,
        allow: 'accelerometer;gyroscope;encrypted-media; fullscreen; picture-in-picture;',
        frameborder: 0,
        class: 'video__iframe js-iframe'
    }
    const arrayAttributes = Object.entries(attributes)

    arrayAttributes.forEach(([key, value]) => iframe.setAttribute(key, value))
    return iframe
}


export const insertVideoIntoDOM = lesson => {
    const video = createVideo(lesson.snippet.resourceId.videoId)
    videoContainer.insertAdjacentElement('afterbegin', video);
}

const videoTitleRender = lesson => {
    const lessonTitle = document.querySelector('[data-js="lesson-title"]')
    lessonTitle.innerHTML = lesson.snippet.title
}

export const loadVideo = async () => {
    const courseID = getCourseID()
    const lessonID = getLessonID()
    const course = await getCoursesFromMockAPI(courseID)

    const lesson = course.lessons[lessonID]

    videoTitleRender(lesson)
    insertVideoIntoDOM(lesson)
    relatedVideosRender(course.lessons)
    backPage(course)
    videoDescriptionRender(lesson)
}

