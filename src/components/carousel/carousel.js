import { getCoursesFromMockAPI } from "../../mockAPI/getCoursesFromMockAPI.js"

let carousels = null
let slider = null
let btnBefore = null
let btnNext = null

const getElements = () => {
    carousels = document.querySelectorAll('.js-courses-list')
    slider = document.querySelector('.js-slider')
    btnBefore = document.querySelectorAll('.js-btn-before')
    btnNext = document.querySelectorAll('.js-btn-next')
}

const sortCategoriesAlphabetically = categories => {
    return Object.entries(categories).sort(([key1, [course1]], [key2, [course2]]) => {
        return course2.category.localeCompare(course1.category)
    }).map(([_, value]) => value)
}

const createCategoriesFromCourses = async () => {
    const courses = await getCoursesFromMockAPI()
    const categories = {}

    courses.forEach(course => {
        categories[course.category] = categories[course.category] || []
        categories[course.category].push(course)
    })

    return sortCategoriesAlphabetically(categories)
}

const renderCourseCard = courses => courses.map(item => {
    const { channelURL, name, poster, id } = item

    return `
        <li class="slide js-slider">
            <a href="src/pages/page-course.html?channel=${channelURL}&course-id=${id}">
                <img class="slide__thumbnail" src="${poster}" alt="${name}">
            </a>
            <span class="slide__label">${name}</span>
        </li>
    `
}).join('')
    

const courseCategoryRender = async () => {
    const categorys = await createCategoriesFromCourses()

    return categorys.map(course => (
        `
        <section class="carousel">
            <h2 class="carousel__title">${course[0]?.category}</h2>
            <ul class="carousel__list js-courses-list">
                ${renderCourseCard(course.reverse())}
            </ul>
            <div class="navigate">
                <button class="navigate__before js-btn-before is-hidden" data-js="btn-before" type="button">
                    <iconify-icon class="navigate__icon" icon="ic:outline-navigate-before" width="50px" height="50px"></iconify-icon>
                </button>
                <button class="navigate__next js-btn-next is-hidden" data-js="btn-next" type="button">
                    <iconify-icon class="navigate__icon" icon="ic:outline-navigate-next" width="50px" height="50px"></iconify-icon>
                </button>
            </div>
        </section>
        `
    )).join('')
}

const convertPxInNumber = (style, name) => Number(style[name].replace('px', ''))

const scrollCarouselInPixel = carousels => {
    const carouselStyle = getComputedStyle(carousels)
    const numberOfVisibleSliders = Math.floor(carousels.offsetWidth / slider.offsetWidth)
    const carouselGap = convertPxInNumber(carouselStyle, 'gap')

    const scrollPixel = (slider.offsetWidth + carouselGap) * numberOfVisibleSliders
    return scrollPixel    
}

const beforeSlider = carousel => carousel.scrollLeft -= scrollCarouselInPixel(carousel)
const nextSlider = carousel => carousel.scrollLeft += scrollCarouselInPixel(carousel)

const hideNextOrBeforeButton = (carousel, btnBefore, btnNext) => {
    const endOfScroll = carousel.scrollLeft === carousel.scrollWidth - carousel.offsetWidth   
    const notAtTheBenningOfTheScroll = carousel.scrollLeft > 0

    if (endOfScroll) {
        btnNext.classList.add('is-hidden')
    }

    if (!endOfScroll) {
        btnNext.classList.remove('is-hidden')
    }

    if (notAtTheBenningOfTheScroll) {
        btnBefore.classList.remove('is-hidden')
        return
    } 

    btnBefore.classList.add('is-hidden')    
    
}

const showButtonNextIfElementOverflow = () => carousels.forEach((carousel, index) => {
    const isOverflow = carousel.scrollWidth > carousel.clientWidth

    btnBefore[index].addEventListener('click', () => beforeSlider(carousels[index]))
    btnNext[index].addEventListener('click', () => nextSlider(carousels[index]))
    carousels[index].addEventListener('scrollend', () => hideNextOrBeforeButton(carousels[index], btnBefore[index], btnNext[index]))

    if (isOverflow) {
        btnNext[index].classList.toggle('is-hidden')
    }
})

const insertCarouselInElementMain = async () => {
    const main = document.querySelector('[data-js="container"]')
    const div = document.createElement('div')

    div.innerHTML = await courseCategoryRender()
    const sections = Array.from(div.children)

    sections.forEach(section => main.insertAdjacentElement('afterbegin', section))
}

export const startCarouselRendering = async () => {
    await insertCarouselInElementMain()

    getElements()
    showButtonNextIfElementOverflow()
}

