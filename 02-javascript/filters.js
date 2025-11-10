const filterTechnology = document.querySelector('#filter-technology');

filterTechnology?.addEventListener('change', function () {
  const selectedValue = filterTechnology.value;
  console.log('Filtro de tecnología seleccionado:', selectedValue);
});

const filterLocation = document.querySelector('#filter-location');

filterLocation?.addEventListener('change', function () {
  const selectedValue = filterLocation.value;
  console.log('Filtro de ubicación seleccionado:', selectedValue);
});

const filterExperience = document.querySelector('#filter-experience');

filterExperience?.addEventListener('change', function () {
  const selectedValue = filterExperience.value;
  console.log('Filtro de experiencia seleccionado:', selectedValue);
});


// const filter = document.querySelector('#filter-location')

// filter.addEventListener('change', function () {
//     const jobs = document.querySelectorAll('.oferta')

//     const selectedValue = filter.value;

//     jobs.forEach(job => {
//         const location = job.getAttribute('data-location');
//         const isShown = selectedValue === 'all' || selectedValue === '' || selectedValue === location;


//         job.classList.toggle('is-hidden', !isShown );
//     });
// });


const filters = document.querySelector('.filters');
const techFilter = document.querySelector('#filter-technology');
const locFilter = document.querySelector('#filter-location');
const expFilter = document.querySelector('#filter-experience');

filters.addEventListener('change', function () {
  const selectedTech = (techFilter.value || '').toLowerCase().trim();
  const selectedLoc  = (locFilter.value  || '').toLowerCase().trim();
  const selectedExp  = (expFilter.value  || '').toLowerCase().trim();

  const jobs = document.querySelectorAll('.oferta');

  jobs.forEach(job => {
    const jobTechs = (job.getAttribute('data-technology') || '')
      .split(',')
      .map(t => t.toLowerCase().trim())
      .filter(Boolean);

    const jobLoc = (job.getAttribute('data-location')   || '').toLowerCase().trim();
    const jobExp = (job.getAttribute('data-experience') || '').toLowerCase().trim();

    const techSelected = !selectedTech || jobTechs.includes(selectedTech);
    const locSelected  = !selectedLoc  || selectedLoc === jobLoc;
    const expSelected  = !selectedExp  || selectedExp === jobExp;

    const isShown = techSelected && locSelected && expSelected;
    job.classList.toggle('is-hidden', !isShown);
  });
});



const searchBar = document.querySelector('#job-search');

searchBar.addEventListener('input', function () {
  const searchTerm = searchBar.value.toLowerCase();
  const jobs = document.querySelectorAll('.oferta');

  jobs.forEach(job => {
    const jobTitle = job.querySelector('.job-title').textContent.toLowerCase();
    const isShown = jobTitle.includes(searchTerm);
    job.classList.toggle('is-hidden', !isShown);
  });
});


