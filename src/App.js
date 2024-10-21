import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import mistImage from './assets/mist.png';
import rainImage from './assets/rain.png';
import clearskuImage from './assets/clear.png';
import defaultImage from './assets/cloud.png'
function App() {
  const [city,setCity]=useState('');
  const [cityName,setCityName]=useState('');
  const [longitude,setLongitude]=useState('');
  const [latitudde,setLatitude]=useState('');
  const [temperature,setTemperature]=useState('');
  const[description,setDiscription]=useState('');
  const[windspeed,setwindSpeed]=useState('');
  var percentage;
  useEffect(()=>{
   async function apiCall(){
      try{
        if(city)
        {
          const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=213c9a4ce59213a71ca46144a54b3513`);
          setCityName(response.data.name);
          setLongitude(response.data.coord.lon);
          setLatitude(response.data.coord.lat);
          console.log(cityName)
          const minTemp = -30;
          const maxTemp = 50;
          setTemperature(response.data.main.temp);
          percentage = ((temperature - minTemp) / (maxTemp - minTemp)) * 100;
          setwindSpeed(response.data.wind.speed);
          setDiscription(response.data.weather[0].description);
        }
      }
      catch(error)
      {
  
      }
    }
    if(city)
    {
      apiCall();
    }
      
  },[city]);
  return (
    <>
     <div className='w-screen h-screen flex justify-center items-center flex-col bg-blackabsolute inset-0 -z-10 px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
      <div className='w-[30%] h-[30rem] border-white border-2 flex justify-start items-center flex-col gap-4'>
      <div className='w-[100%] h-[20%] bg-white text-center font-bold text-black flex justify-center items-center text-2xl'>
       <h1>Weather</h1>
      </div>
      <div className='flex items-center justify-center w-full h-[10%]'>
        <input type='text' placeholder="Enter the city Name" className='outline-none p-2 w-[60%] h-[50px] rounded-3xl' onChange={(e)=>setCity(e.target.value)}></input>
      </div>
      {cityName&&<div className='w-full h-[70%] flex flex-col'>
        <div className='h-[20%] w-[100%] flex justify-start items-center'>
          <div className='h-full w-[50%] ml-2 flex justify-start items-center flex-col'>
           <h1 className='font-bold text-white text-l'>cityname: {cityName}</h1>
           <h1 className='font-bold text-white text-l'>condition: {description}</h1>
          </div>
          <div className='h-full w-[50%] flex justify-start items-center flex-col'>
          <h1 className='font-bold text-white text-l'>lat: {latitudde}</h1>
          <h1 className='font-bold text-white text-l'>lan: {longitude}</h1>
          </div>
        </div>
          <div className='h-[60%] w-full flex items-start justify-center'>
            {description&&(
              <>
             {description.includes('mist')&&<img src={mistImage} alt='clear sky' className='w-[50%] h-[80%]'></img>}
             {description.includes('rain')&&<img src={rainImage} alt='clear sky' className='w-[50%] h-[100%]'></img>}
             {description.includes('clear')&&<img src={clearskuImage} alt='clear sky' className='w-[50%] h-[100%]'></img>}
             {!description.includes('clear') && !description.includes('rain') && !description.includes('mist') && (
        <img src={defaultImage} alt="Default Weather" className="h-[100px] w-[100px]" />
      )}
              </>
            )}
          </div>
          <div className='h-[20%] w-[100%] flex justify-start items-center'>
          <div className='h-full w-[50%] ml-2 flex justify-start items-center flex-col'>
           <h1 className='font-bold text-white text-l'>tempearature: {temperature}</h1>
          </div>
          <div className='h-full w-[50%] flex justify-start items-center flex-col'>
           <h1 className='font-bold text-white text-l'>windspeed: {windspeed}</h1>
          </div>
        </div>
      </div>}
      </div>

     </div>
    </>
  );
}

export default App;
