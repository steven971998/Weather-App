// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=ec818d0159144c731f41ff1c1ee2cdb2

import React, {useState,useEffect} from 'react'
import './style.css'
import Weathercard from './weathercard'


const Temp = () => {

const [ searchValue, setSearchValue] = useState("airoli")
const [tempInfo,setTempInfo] =useState({})

const getWeatherInfo = async () => { 
    var input = document.getElementById("search");
    input.addEventListener("keyup",function(event){
        if (event.keyCode === 13){
            event.preventDefault();
            document.getElementById("btnSearch").click();
        }
    });
    try {
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ec818d0159144c731f41ff1c1ee2cdb2`

const res = await fetch(url)
const data = await res.json(); //converting the data into readable format.
console.log(data)

const {temp,humidity,pressure}=data.main; //our temperature and some other data is present inside main. 
const {main:weathermood}=data.weather[0]; //this data is present inside an array so as
const {name} = data ;
const {speed} = data.wind;
const {country,sunset}=data.sys;

const myNewWeatherInfo = {
    temp,humidity,pressure,weathermood,name,speed,country,sunset
};
setTempInfo(myNewWeatherInfo);
} catch (error) {
    console.log(error)
}
};

useEffect(() => {
    getWeatherInfo(); //weather app should open directly as default when we reload it and it should give data of our place.
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []) 


    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder='search...' autoFocus id="search" className='searchTerm' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}  />
                    <button className="searchButton" id='btnSearch' type='button' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>


            {/* our temp card */}
            <Weathercard  tempInfo={tempInfo}/>   {/* we are passing temp info as a props. */}
        </>
    )
}

export default Temp