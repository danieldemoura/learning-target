export const getCurrentCategory = category => {
    const categorys = {
        "Programação": 'programming',
        "UI - User Interface": 'ui'
    }

    return categorys[category]
}
