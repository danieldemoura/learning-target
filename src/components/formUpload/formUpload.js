import { fetchData } from "../../api/fetchData.js";
import { createCourseIntoMockAPI } from "../../mockAPI/createCourseIntoMockAPI.js";

const formEl = document.querySelector('[data-js="form"]')
const playlistLinkEl = document.querySelector('[data-js="playlist-link"]')
const titleEl = document.querySelector('[data-js="title"]')
const descriptionEl = document.querySelector('[data-js="description"]')

let courseData = {}

const fetchDataFromCourse = async playlistID => {
    const playlistData = await fetchData(`playlists?part=snippet&id=${playlistID}`)
    const channelID = playlistData.items[0].snippet.channelId

    const channelData = await fetchData(`channels?part=snippet&id=${channelID}`)
    const { items, nextPageToken, pageInfo } = await fetchData(`playlistItems?part=snippet&playlistId=${playlistID}&maxResults=50`)

    const avatar = channelData.items[0].snippet.thumbnails

    courseData = {
        channelURL: channelData.items[0].id,
        teacher: channelData.items[0].snippet.title,
        teacherPhoto: avatar.high.url || avatar.medium.url,
        playlistURL: playlistData.items[0].id,
        description: playlistData.items[0].snippet.description,
        lessons: items,
        nextPageToken,
        lessonsQuantity: pageInfo.totalResults,
        plataform: 'YouTube',
        name: playlistData.items[0].snippet.title,
        poster: playlistData.items[0].snippet.thumbnails.medium.url
    }
}

const countCharacter = text => {
    const container = document.querySelector('[data-js="maxlength"]')
    const maxCharacter = 300
    const currentQuantity = text.length

    container.textContent = `${currentQuantity}/${maxCharacter}`
}

const insertValueIntoField = () => {
    const { name, description } = courseData
    const maxLengthDescription = description.slice(0, 300)

    titleEl.value = name
    descriptionEl.value = maxLengthDescription

    countCharacter(maxLengthDescription)
}

const getPlaylistID = url => url.replace('https://www.youtube.com/playlist?list=', '')

playlistLinkEl.addEventListener('paste', event => {
    setTimeout(async () => {
        const playlistID = getPlaylistID(event.target.value)
        await fetchDataFromCourse(playlistID)

        insertValueIntoField()
    }, 100)
})

descriptionEl.addEventListener('input', event => countCharacter(event.target.value))

formEl.addEventListener('submit', async event => {
    event.preventDefault()

    const name = event.target.title.value
    const description = event.target.description.value
    const tags = event.target.genere.value.split(',')
    const category = event.target.category.value

    const courseInfo = {
        ...courseData,
        name,
        description,
        tags,
        category,  
    }

    createCourseIntoMockAPI(courseInfo)
    event.target.reset()
})

