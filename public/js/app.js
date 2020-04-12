console.log('js file');

const getDataForecast = (address) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then(data => {
            const { error, forecast, location } = data;
            if (error) {
                return messageOne.textContent = error;
            }
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
        });
    });
} 
const weatherForm = document.querySelector('form');
const search = document.querySelector('input[name="address"]');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    getDataForecast(address);
});