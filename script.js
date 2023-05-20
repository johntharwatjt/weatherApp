//Setting variables
const apiKey = '511488ae70e44f18956df79e9d2b5188' 
const clockApiKey = '89e696ddd0164a009f0d9e43c0d158ee' 
const googleApiKey = 'AIzaSyB6WGci9VMgJACipDj_9R2J_Db9B13zJDw' 

const form = document.querySelector('#searchForm')
const input = document.querySelector('#input')
const wdCol1 = document.querySelector('.wd-col1')
const wdCol2 = document.querySelector('.wd-col2')
const daysClass = document.querySelector('.days')
const monthClass = document.querySelector('.month')
const dayClass = document.querySelector('.days')
const h3 = document.createElement('h3')
const test = document.querySelector('.feels-like')
const temperature = document.querySelector('.temperature')
const timeClass = document.querySelector('.time')
const sunMoon = document.querySelector('.sun-moon')
const countryName = document.querySelector('.country-name')
const monthdDay = document.querySelector('.month-day')
const weatherStatus = document.querySelector('.weather-status')

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
//----------------------------

//Setting Date and time
const time= new Date();
const date = time.getDate();
const day = time.getDay();
const month=time.getMonth();
monthdDay.innerHTML = `${months[month]} ${date}, ${days[day]}`;

//-------refreshing time---------
setInterval(() => {
   
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hourIn12HrFormat=hour>= 13? hour %12: hour;
    const ampm = hour >= 12? 'PM' : 'AM';
    // timeClass.innerHTML=`${hourIn12HrFormat}:${minutes} ${ampm}, `;
   
}, 1000);

//-------Search input---------
form.addEventListener('submit',async function (e){
e.preventDefault();
const searchTerm = form.elements.query.value
data(searchTerm)
futerFunc(searchTerm);
})
//-------------------------------------------------------
//----------------Creating the Api---------------------------
const data = async (searchTerm,num=0) =>{   

    try{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`)
    const lon= res.data.coord.lon;
    const lat= res.data.coord.lat;
    const resLonLat = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    

    const resLonLatData =  resLonLat.data.list[num];
    const feels_like= Math.round(resLonLatData.main.feels_like);
    const temp_max= Math.round(resLonLatData.main.temp_max);
    const temp_min= Math.round(resLonLatData.main.temp_min);
    const humidity= Math.round(resLonLatData.main.humidity);
    const clouds= Math.round(resLonLatData.clouds.all);
    const wind= resLonLatData.wind.speed;
    const temp= Math.round(resLonLatData.main.temp);
    const description= resLonLatData.weather[0].description;
    const icon= res.data.weather.icon;
   
    wdCol1.innerHTML=` <h3>Feels Like ${feels_like} &#8451</h3> <h3>Minimum temperature ${temp_min}&#8451</h3> <h3>Maximum temperature ${temp_max}&#8451</h3>`;
    wdCol2.innerHTML=` <h3>Humidity ${humidity} % </h3> <h3>Clouds ${clouds}%</h3> <h3>Wind ${wind}km/h</h3>`;
    temperature.innerHTML=`${temp}&#8451`
    countryName.innerHTML=`${searchTerm}`  
    weatherStatus.innerHTML=`${description}`  
    dateTime(lat,lon);
    }
    catch(e){
        return "No weather data available"
      }
}

//-------------------------------------------------------

//----------------setting google autocomplete---------------------------
    let options = {
        types: ['(cities)']
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options);
//-------------------------------------------------------

//----------------Next Days date---------------------------
    const futureDays = function(month,day,date){
        daysClass.innerHTML='';
        for(let i=1;i<=5;i++){
        let newDate=date+i;
        daysClass.innerHTML+=
        ` <h2> 
        <span class="month">${month} ${newDate}</span>
         <span class="day">${day}</span>
        </h2>
        `;
      
        }
    }
        futureDays(months[month],days[day],date)
//-------------------------------------------------------        
//----------------Next Weather info---------------------------      
      
const futerFunc = function(searchTerm='cairo'){
      for(let i=1;i<=5;i++){
        const future=document.querySelector(`.days h2:nth-child(${i})`);
        future.addEventListener('click',()=>{data(searchTerm,i)       
        })  
      }
    }
//-------------------------------------------------------     
       

       
//----------------Setting World time Api--------------------------
const dateTime = async(lat,lon)=>{
    try{
    const result = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${clockApiKey}&lat=${lat}&long=${lon}`)
    const time12 =result.data.time_12;
    const time24 =result.data.time_24;
    timeClass.innerHTML=time12;
    
    if(time24[1]>6 && time24[1]<19){
        sunMoon.innerHTML='<img src="assets/sun.svg " alt="" width="200px" height="200px" sun-moon">'
        
    } else {
        sunMoon.innerHTML='<img src="assets/moon.svg " alt="" width="200px" height="200px" sun-moon">'
        
    }
    }
    catch(e){
        return('Time is not available right now')
    }
}//------------------------------------------------------- 
