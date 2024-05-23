export const fetchData = async (endpoint = "") => {
    try {
        const apiKey = 'AIzaSyABXWnWABmfp0XrrnvftNQgFbOkD4zyNqU'
        const url = `https://www.googleapis.com/youtube/v3/${endpoint}&key=${apiKey}`

        const response = await fetch(url)
        return response.json()

    } catch (error) {
        console.log(error)
    }
}
