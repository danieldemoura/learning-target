import { layoutStages, toggleAccordion } from "./accordion.js"
import { openMenu, btnMenu } from "./openMenu.js"
import { loadVideo } from "/src/components/videoPlayer/videoPlayerRender.js"
import { startCarouselRendering } from '/src/components/carousel/carousel.js'
import { coursePageRender } from "./coursePageRender.js"

const initApp = () => {
    btnMenu.addEventListener('click', openMenu)
    const url = window.location.href

    
    if (url.includes('index')) {
        startCarouselRendering()
    }

    if (url.includes('page-course')) {
        coursePageRender()
        layoutStages.addEventListener('click', toggleAccordion)
        layoutStages.addEventListener('keyup', toggleAccordion)
    }

    if (url.includes('video-player')) {
        loadVideo()
    }    

}


initApp()

