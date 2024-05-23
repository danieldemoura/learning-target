export const getCoursesFromMockAPI = async (endpoit = '') => {
    const url = `https://661a8b1a125e9bb9f29c504b.mockapi.io/api/v1/courses/${endpoit}`

    try {
        const response = await fetch(url)
        const body = await response.json()

        if (response.ok) {
            return body
        }

    } catch (error) {
        console.log(error)
    }
}