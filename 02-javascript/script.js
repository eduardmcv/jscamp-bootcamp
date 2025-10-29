// const botonAplicar = document.querySelector('.cta-button');

// botonAplicar.addEventListener('click', function() {
//     botonAplicar.textContent = '¡Aplicado!';
//     botonAplicar.classList.add('is-applied');
// })



// const botonesAplicar = document.querySelectorAll('.cta-button');

// botonesAplicar.forEach(boton => {
//     boton.addEventListener('click', function () {
//         boton.textContent = '¡Aplicado!';
//         boton.classList.add('is-applied');
//         boton.disabled = true;
//     });
// });



const displayOfertas = document.querySelector('.display-ofertas');

displayOfertas?.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('cta-button')) {
        element.textContent = '¡Aplicado!';
        element.classList.add('is-applied');
        element.disabled = true;
    }

});


const filterTechnology = document.querySelector('#filter-technology');

filterTechnology?.addEventListener('change', function () {
    const selectedValue = filterTechnology.value;
    console.log('Filtro de tecnología seleccionado:', selectedValue);
});

const filterUbication = document.querySelector('#filter-ubication');

filterUbication?.addEventListener('change', function () {
    const selectedValue = filterUbication.value;
    console.log('Filtro de ubicación seleccionado:', selectedValue);
});

const filterExperience = document.querySelector('#filter-experience');

filterExperience?.addEventListener('change', function () {
    const selectedValue = filterExperience.value;
    console.log('Filtro de experiencia seleccionado:', selectedValue);
});



fetch("./data.json")
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article');
            article.className = 'oferta';

            article.dataset.technology = job.data.technology;
            article.dataset.ubication = job.data.modalidad;
            article.dataset.experience = job.data.nivel;

            article.innerHTML = `
                <div>
                    <header class="header-oferta">
                        <h3>${job.titulo}</h3>
                        <p>${job.empresa} | ${job.ubicacion}</p>
                    </header>
                    <p>${job.descripcion}</p>
                </div>
            `;
            
            displayOfertas.appendChild(article);
        });
    })