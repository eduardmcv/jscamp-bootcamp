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