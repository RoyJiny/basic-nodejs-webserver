//works only in client side javascript

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');

const errorMsg = document.querySelector('#errorMsg');
const forecastMsg = document.querySelector('#forecastMsg');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = input.value;

    fetch(`/weather?location=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                errorMsg.textContent = data.error;
                forecastMsg.textContent = '';
            } else {
                forecastMsg.textContent = `The forecast for ${data.location} is: \n${data.forecast}`;
                errorMsg.textContent = '';
            }
        })
    })
});