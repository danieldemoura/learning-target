import { getDataJSONFromLocalStorage, saveDataIntoLocalStorage } from "./accessLocalStorage.js"

const extractVideoFromList = listFromVideo => {
    const newList = listFromVideo.map(({ snippet }) => {
        return {
            description: snippet.description,
            publishedData: snippet.publishedAt,
            url: snippet.resourceId.videoId,
            thumbnails: snippet.thumbnails,
            title: snippet.title 
        }
    })

    return newList
}

export const saveDataFromAPI = playlist => {
    const { snippet, listInfo, list, playlistURL, channelURL } = playlist
    const newList = extractVideoFromList(list)

    const course = {
        channelURL,
        playlistURL,
        name: listInfo.title,
        teachersPhoto: [snippet.thumbnails.high.url],
        teachers: [snippet.title],
        avatar: snippet.thumbnails.high.url,
        genere: ['Frontend', 'Javascript'],
        plataform: "YouTube",
        category: "Programação",
        lessonsQuantity: newList.length,
        description: listInfo.description,
        lessons: newList
    }

    const courses = getDataJSONFromLocalStorage('courses') || []
    saveDataIntoLocalStorage('courses', JSON.stringify([ ...courses, course ]))
}


export const saveData = course => {
    const newList = extractVideoFromList(course.lessons)

    const formattedCourse = {
        channelURL: course.channelURL,
        playlistURL: course.playlistURL,
        name: course.name,
        teachersPhoto: course.teacherPhoto,
        teacher: course.teacher,
        tags: course.tags,
        plataform: course.plataform,
        category: course.category,
        nextPageToken: course.nextPageToken,
        lessonsQuantity: course.lessonsQuantity,
        description: course.description,
        lessons: newList,
        poster: course.poster,
    }

    const courses = getDataJSONFromLocalStorage('courses') || []
    saveDataIntoLocalStorage('courses', JSON.stringify([ ...courses, formattedCourse ]))
}