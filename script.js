// Catch Currency API
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let currency, arr, amount, result;
const drop1 = document.getElementById('dp1').querySelector('ul');
const drop2 = document.getElementById('dp2').querySelector('ul');
const select1 = document.getElementById('dp1').querySelector('button');
const select2 = document.getElementById('dp2').querySelector('button');
const convert = document.getElementById('convert');
const modal = new bootstrap.Modal(document.getElementById('modal'));

fetch(API_URL)
    .then(response => response.json())
    .then(result => {
        currency = Object.entries(result.rates);
        arr = Object.values(currency);

        arr.forEach(([key]) => {
            const option1 = document.createElement('li');
            const option2 = document.createElement('li');
            option1.classList.add('dropdown-item');
            option2.classList.add('dropdown-item');
            option1.textContent = key;
            option2.textContent = key;
            drop1.appendChild(option1);
            drop2.appendChild(option2);
        });

        const listCurrency1 = drop1.querySelectorAll('li');
        const listCurrency2 = drop2.querySelectorAll('li');

        listCurrency1.forEach(item => {
            item.addEventListener('click', () => {
                select1.textContent = item.textContent;
            });
        });

        listCurrency2.forEach(item => {
            item.addEventListener('click', () => {
                select2.textContent = item.textContent;
            });
        });

        convert.addEventListener('click', () => {
            document.getElementById('hasil').value = '';
            amount = parseFloat(document.getElementById('input').value);
            if (isNaN(amount) || amount === 0 || select1.textContent === 'Select Currency' || select2.textContent === 'Select Currency') {
                modal.show();
            } else {
                const rate1 = arr.find(([key]) => key === select1.textContent)[1];
                const rate2 = arr.find(([key]) => key === select2.textContent)[1];
                result = (amount / rate1) * rate2;
                document.getElementById('hasil').value = result.toFixed(2);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
