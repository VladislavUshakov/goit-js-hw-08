import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackFormPastState = JSON.parse(
  localStorage.getItem('feedback-form-state')
);
let feedbackFormCurrentState = { ...feedbackFormPastState };

if (feedbackFormPastState) {
  formAutocomplete(feedbackFormPastState, feedbackForm);
}

feedbackForm.addEventListener(
  'input',
  throttle(saveFeedbackFormCurrentState, 500)
);
feedbackForm.addEventListener('submit', clearFeedbackForm);

function saveFeedbackFormCurrentState(event) {
  const currentName = event.target.name;
  const currentValue = event.target.value;
  feedbackFormCurrentState[currentName] = currentValue;

  const formDataJSON = JSON.stringify(feedbackFormCurrentState);
  localStorage.setItem('feedback-form-state', formDataJSON);
}

function formAutocomplete(dataObj = {}, form) {
  const formElements = Object.keys(dataObj);

  formElements.forEach(el => {
    form[el].value = dataObj[el];
  });
}

function clearFeedbackForm(event) {
  event.preventDefault();

  console.log(feedbackFormCurrentState);
  feedbackFormCurrentState = {};
  localStorage.removeItem('feedback-form-state');
  feedbackForm.reset();
}
