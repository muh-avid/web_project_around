function showInputErrorMessage(
  form,
  input,
  { errorClass, inputErrorClass, ...rest }
) {
  const error = form.querySelector('#' + input.id + '-error');
  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
  error.textContent = input.validationMessage;
}

function hideInputErrorMessage(
  form,
  input,
  { errorClass, inputErrorClass, ...rest }
) {
  const error = form.querySelector('#' + input.id + '-error');
  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
  error.textContent = '';
}

function checkInputValidity(form, input, rest) {
  if (input.validity.valid) {
    hideInputErrorMessage(form, input, rest);
  } else {
    showInputErrorMessage(form, input, rest);
  }
}

function toggleButton(inputs, button, form, { inactiveButtonClass, ...rest }) {
  const isInvalid = inputs.some((input) => {
    return !input.validity.valid;
  });

  if (isInvalid) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  ...rest
}) {
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, rest);
        toggleButton(inputs, button, form, rest);
      });
    });
  });
}

enableValidation({
  formSelector: '.popup__form', //done
  inputSelector: '.popup__input', //done
  submitButtonSelector: '.popup__button', //done
  inactiveButtonClass: 'popup__button_disabled', //done
  inputErrorClass: 'popup__input_type_error', //done
  errorClass: 'popup__error_visible', //done
});