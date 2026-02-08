const displayOfertas = document.querySelector('.display-ofertas');

fetch("./data.json")
    .then((response) => {
        return response.json()
    })
    .then((jobs) => {
        /* 
        Usamos document.createDocumentFragment() para mejorar el rendimiento al agregar elementos al DOM. Lo que hace esto es crear un contenedor "virtual" donde se agregan todos los elementos que queremos mostrar, y cuando todos los elementos estén listos, los agregamos al DOM en una sola operación. Esto mejora el rendimiento ya que evita hacer múltiples operaciones de renderizado en el DOM.
        */
        const jobsDocumentFragment = document.createDocumentFragment();

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

            jobsDocumentFragment.appendChild(article);
        });

        displayOfertas.appendChild(jobsDocumentFragment);
    })