import { getChannelURL } from "./getParamsValue.js"

const renderCardTeacher = (photo, name ) =>  {
    const channelURL = getChannelURL()
    
    return `
    <figure class="card__figure">
        <img class="card__image" src="${photo}" alt="Foto do professor ${name}">
        <figcaption>
            <h3 class="card__teacher">
                <a class="card__link" href="https://www.youtube.com/channel/${channelURL}" target="_blank">
                    ${name}
                </a>
            </h3>
        </figcaption>
    </figure>
    `
}

export const asideRender = course => {
    const aside = document.querySelector("[data-js='aside']")
    const { lessonsQuantity, teacher, teacherPhoto } = course

    aside.innerHTML = `
        <section class="card">
            <h2 class="card__title">Seu progresso até aqui:</h2>
            <div class="card__wrapper">
                <div class="card__container">
                    <span>Aulas: 00/${lessonsQuantity}</span>
                    <div class="progress-bar" id="progress-lessons" max="100" value="5" title="Barra de progresso">
                        <div class="progress-bar__percentage" title="Progresso de aulas assitidas: 5%"></div>
                    </div>
                </div>
                <button class="card__btn">Iniciar curso</button>
            </div>
        </section>
        <section class="card">
            <h2 class="card__title">Professor:</h2>
            <div class="card__figure-wrapper">
                ${ renderCardTeacher(teacherPhoto, teacher) }
            </div>
        </section>
    `
}
