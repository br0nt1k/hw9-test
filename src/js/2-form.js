const refs = {
    form: document.querySelector('.feedback-form'),
    emailInput: document.querySelector('.js-email-input'),
    messageInput: document.querySelector('.js-message-input'),
}

const STORAGE_KEY = 'feedback-form-state';

const formData = {
    email: "",
    message: ""
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);


function onFormInput(event) { 
    const email = event.currentTarget.elements.email.value;
    const message = event.currentTarget.elements.message.value;

    formData.email = email;
    formData.message = message;

    saveToLS(STORAGE_KEY, formData);

}

function onFormSubmit(event) {
    event.preventDefault();

    if (formData.email === "" || formData.message === "") {
        return alert("Fill please all fields");
    }

    console.log("Submitted form data:", formData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    formData.email = "";
    formData.message = "";    
}

document.addEventListener('DOMContentLoaded', () => {
    const lsData = getFromLS(STORAGE_KEY, {});
  try {
    Object.assign(formData, lsData);
    refs.form.elements.email.value = lsData.email;
    refs.form.elements.message.value = lsData.message;
  } catch {}
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}

