export const layoutStages = document.querySelector('.js-stages')

const expandDiv = (elementCliked) => {
    const fatherElement = elementCliked.parentElement
    const olContainer = fatherElement.querySelector('.js-wrapper')
    const ol = fatherElement.querySelector('.js-ol')
    
    const open = elementCliked.classList.toggle('open')
    const olHeight = open ? ol.clientHeight + 'px' : '0px'

    olContainer.style.height = olHeight
}

export const toggleAccordion = (event) => {
    const elementCliked = event.target
    const isHeaderAndClicked = Array.from(elementCliked.classList).includes('js-header') && event.type === 'click'
    const isKeyEnter = event.key === 'Enter'

    if (isHeaderAndClicked || isKeyEnter) {
        expandDiv(elementCliked)
    }

}
