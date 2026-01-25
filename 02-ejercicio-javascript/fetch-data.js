const displayOfertas = document.querySelector('.display-ofertas');

fetch("./data.json")
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        jobs.forEach(job => {
            const article = document.createElement('article');
            article.className = 'oferta';

            article.dataset.technology = job.data.technology;
            article.dataset.location = job.data.modalidad;
            article.dataset.experience = job.data.nivel;

            article.innerHTML = `
                <div>
                    <header class="header-oferta">
                        <h3 class="job-title">${job.titulo}</h3>
                        <p>${job.empresa} | ${job.ubicacion}</p>
                    </header>
                    <p>${job.descripcion}</p>
                </div>
                <div>
                    <button class="cta-button" href="">Aplicar</button>
                </div>
            `;

            displayOfertas.appendChild(article);
        });
    })