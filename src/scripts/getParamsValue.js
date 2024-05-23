const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

export const getCourseID = () => urlParams.get('course-id')
export const getLessonID = () => urlParams.get('lesson-id')
export const getChannelURL = () => urlParams.get('channel')
export const getPlaylistURL = () => urlParams.get('playlist')

