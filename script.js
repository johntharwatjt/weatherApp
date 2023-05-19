const apiKey = '511488ae70e44f18956df79e9d2b5188' 
const googleApiKey = 'AIzaSyB6WGci9VMgJACipDj_9R2J_Db9B13zJDw' 

const form = document.querySelector('#searchForm')
const input = document.querySelector('#input')
const wdCol1 = document.querySelector('.wd-col1')
const wdCol2 = document.querySelector('.wd-col2')
const h3 = document.createElement('h3')
const test = document.querySelector('.feels-like')
const temperature = document.querySelector('.temperature')
const timeClass = document.querySelector('.time')
const countryName = document.querySelector('.country-name')
const monthdDay = document.querySelector('.month-day')
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];



setInterval(() => {
    const time= new Date();
    const month=time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hourIn12HrFormat=hour>= 13? hour %12: hour;
    const ampm = hour >= 12? 'PM' : 'AM';
    timeClass.innerHTML=`${hourIn12HrFormat}:${minutes} ${ampm}, `;
    monthdDay.innerHTML = `${months[month]} ${date}, ${days[day]}`;
}, 1000);


form.addEventListener('submit',async function (e){
e.preventDefault();
const searchTerm = form.elements.query.value

console.log(searchTerm);

data(searchTerm)

})

const data = async (searchTerm) =>{   
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`)
   
    const feels_like= Math.round(res.data.main.feels_like);
    const temp_max= Math.round(res.data.main.temp_max);
    const temp_min= Math.round(res.data.main.temp_min);

    const humidity= Math.round(res.data.main.humidity);
    const clouds= Math.round(res.data.clouds.all);
    const wind= res.data.wind.speed;

    const temp= Math.round(res.data.main.temp);
    const icon= res.data.weather.icon;
console.log(res);
    wdCol1.innerHTML=` <h3>Feels Like ${feels_like} &#8451</h3> <h3>Minimum temperature ${temp_min}&#8451</h3> <h3>Maximum temperature ${temp_max}&#8451</h3>`;
    wdCol2.innerHTML=` <h3>Humidity ${humidity} % </h3> <h3>Clouds ${clouds}%</h3> <h3>Wind ${wind}km/h</h3>`;
  
    temperature.innerHTML=`${temp}&#8451`
    countryName.innerHTML=`${searchTerm}`
    // temperature.innerHTML=`<img src="${icon}" </img>`
    // console.log(icon)
  
}


  
    // h3.innerText='hey'
    // wdCol1.appendChild(h3);


    
 
    let options = {
        types: ['(cities)']
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    data('cairo')