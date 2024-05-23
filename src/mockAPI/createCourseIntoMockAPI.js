const config = course => ({
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(course)
})

export const createCourseIntoMockAPI = async course => {
    try {
        const response = await fetch(`https://661a8b1a125e9bb9f29c504b.mockapi.io/api/v1/courses`, config(course))

        if (response.ok) {
            alert('SALVO COM SUCESSO!')
            return
        }

        throw new Error(`${response.status} - ${response.statusText}`)
    } catch (error) {
        alert(error)
    }
}