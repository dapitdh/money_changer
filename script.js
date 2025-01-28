//Catch Currency API
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
const API_KEY = 'cceb9200d0b48723e6900f922c42f328c';

let currency;
let arr;
let listCurrency;
let amount;
let result;


const drop1 = document.getElementById('dp1').querySelector('ul');
const drop2 = document.getElementById('dp2').querySelector('ul');
let entriesCurrency;
let select1 = document.getElementById('dp1').querySelector('button');
let select2 = document.getElementById('dp2').querySelector('button');
let convert = document.getElementById('convert');
let onlyCurrency = [];
const modal = new bootstrap.Modal(document.getElementById('modal'));

fetch(API_URL)
    .then(response => response.json())
    .then((result) => {
        currency = Object.entries(result.rates);
        arr = Object.values(currency);
        for (let [key, value] of arr) {
            onlyCurrency.push(value);
        }
        for(let x = 0; x < arr.length; x++){
            let option = document.createElement('li');
            let isi = document.createTextNode(`${arr[x][0]}`);
            option.appendChild(isi);
            drop1.appendChild(option);
        }
        for(let x = 0; x < arr.length; x++){
            let option = document.createElement('li');
            let isi = document.createTextNode(`${arr[x][0]}`);
            option.appendChild(isi);
            drop2.appendChild(option);
        }
        listCurrency1 = drop1.querySelectorAll('li');

        listCurrency1.forEach((item) => {
            item.addEventListener('click', () => {
              document.getElementById(`dp1`).querySelector(`button`).textContent = item.textContent;
            })  
        });
        
        listCurrency2 = drop2.querySelectorAll('li');

        listCurrency2.forEach((item) => {
            item.addEventListener('click', () => {
              document.getElementById(`dp2`).querySelector(`button`).textContent = item.textContent;
            })  
        });  

        convert.addEventListener(`click`, () => {
            document.getElementById(`hasil`).value = ``;
            amount = parseFloat(document.getElementById(`input`).value);
            if(isNaN(amount) || amount === 0 || select1.textContent === `Select Currency` || select2.textContent === `Select Currency`){
                // alert(`Please input the amount you want to convert!`);
                modal.show();
            } else {
                let rate1, rate2;
                for(let x = 0; x < arr.length; x++){
                    if(select1.textContent === arr[x][0]){
                        rate1 = arr[x][1];
                    }
                    if(select2.textContent === arr[x][0]){
                        rate2 = arr[x][1];
                    }
                }
                result = (amount / rate1) * rate2;
                document.getElementById(`hasil`).value = result.toFixed(2);
            }
        });
    }).catch((error) => {
        console.error('Error:', error); 
    });