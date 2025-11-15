// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector('.form'), 
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const delay = Number(refs.form.elements.delay.value);
    const state = refs.form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { 
            if (state === 'fulfilled') {
                resolve({ position: 'topRight', message: `✅ Fulfilled promise in ${delay}ms` });
            } else {
                reject({ position: 'topRight', message: `❌ Rejected promise in ${delay}ms` });
            }
        }, delay);
    });

    promise
        .then(({ position, message }) => {
            iziToast.success({
                title: 'Success',
                message: message,
                position: position,
            });
        })
        .catch(({ position, message }) => {
            iziToast.error({
                title: 'Error',
                message: message,
                position: position,
            });
        });

    refs.form.reset(); 
}