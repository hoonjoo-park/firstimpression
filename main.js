const centerBox = document.querySelector('.centerBox');
const clock = document.querySelector('.clock');
const bg = document.querySelector('.bg');
const date = document.querySelector('.date');
const weatherBox = document.querySelector('.weather');
const quote = document.querySelector('.quote');
const greetingForm = document.getElementById('greetingForm');
const greetingInput = greetingForm.querySelector('#greetingInput')
const userBox = document.querySelector('.userBox');
const userID = document.getElementById('userID');
const deleteUser = document.getElementById('deleteUser');

greeting();
setInterval(timer,1000);
getWeather();
staticChage();
getQuotes();

function greeting(){
    if (localStorage.getItem('userName') === null){
        greetingForm.classList.remove('hide');
        centerBox.classList.add('hide');
    } else {
        greetingForm.classList.add('hide');
        centerBox.classList.remove('hide');
        userID.innerText = localStorage.getItem('userName');
    };
}
function handleGreeting(e){
    e.preventDefault();
    localStorage.setItem('userName', greetingInput.value);
    greeting();
}

function timer(){
    const time = new Date();
    const hour = String(time.getHours());
    const minute = String(time.getMinutes());
    clock.innerText = `${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
}

function staticChage(){
    const time = new Date();
    const month = time.getMonth();
    const dates = time.getDate();
    const day = time.getDay();
    const dayList = ['일','월','화','수','목','금','토'];
    date.innerText = `${month+1}월 ${dates}일 (${dayList[day]})`
    bg.style.backgroundImage = `url("https://source.unsplash.com/collection/1252677/1920x1080")`;
};

function getWeather(){
    weatherBox.innerText = "Loading..."
    navigator.geolocation.getCurrentPosition(async (position) => {
        const endpoint = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=kr&appid=9f4df5251dc5ab805f767d2ef22d2a3a`);
        const weather = await endpoint.json();
        const temp = (weather.main.temp - 273.15).toFixed(1);
        const main = weather.weather[0].description;
        const location = weather.name
        weatherBox.innerHTML = `<div class="temp">${temp}°C</div><div class="main">${main}</div><div class="main">${location}</div>`
    });
}

async function getQuotes(){
    const quotes = await fetch('./quotes.json');
    const quoteLists = await quotes.json();
    const random = Math.floor(Math.random() * quoteLists.quotes.length);
    quote.innerHTML = `${quoteLists.quotes[random].quote}<div>- ${quoteLists.quotes[random].name} -</div>`;
}
greetingForm.addEventListener('submit', handleGreeting);
deleteUser.addEventListener('click', ()=>{
    localStorage.getItem('userName')===null ? "" : localStorage.removeItem('userName');
    userID.innerText = "";
    greeting();
})