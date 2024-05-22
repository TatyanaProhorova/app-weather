import {useState} from "react";
import {ForecastDays, ForecastDayHour} from "../utils/types";
// import webpack  from  "webpack";  // доустановили
// import dotenv from "dotenv";      // пакеты   "webpack": "^5.91.0",
// "webpack-cli": "^5.1.4"


// module.exports = () => {
//   // dotenv вернет объект с полем parsed
//   const env = dotenv.config().parsed;

//   сделаем reduce, чтобы сделать объект
//   const envKeys = Object.keys(env).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(env[next]);
//     return prev;
//   }, {});

//   return {
//     plugins: [
//       new webpack.DefinePlugin(envKeys)
//     ]
//   };
// }
const API_KEY = "aa31822992d867d5cdbc0d5461abd90a";

// const API_KEY = process.env.REACT_APP_API_KEY;

//была ошибка useWeatherData.tsx:5 Uncaught ReferenceError: process is not defined,
// ввели `npm i --save-dev @types/node` - не помогло
// This solved it for me let process = {} adding that to one of my root files- не помогло.

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    },
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ],
    base: string;
    main: {
        temp: number; // текущая температура
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    },
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    },
    timezone: number;
    id: number;
    dt: number;
    name: string; // название города
    cod: number; // код города
}

// http://api.geonames.org/

// Google Geocoding API.
// Активизируйте в своем гугл-аккаунте этот сервис, создайте API Key для запросов,
//  после чего посылайте запрос
//  с именем населенного пункта и указанием русского языка для возврата данных:
//  https://maps.googleapis.com/maps/api/geocode/json?key=сгенерированныйключ&language=ru&address=Dzyarzhynsk


interface FetchDataProps {
    name?: string;
}

// https://api.openweathermap.org/data/3.0/
// onecall?lat={lat}&lon={lon}&exclude=hourly,daily,alerts&appid={API key}
interface ForecastResponseData {
    city: {
        coord:{
            country: string;
            id: number;
            name: string;
        }
    },

    list: [
        {
            dt: number;
            dt_txt: string;
            main: {
                feels_like: number;
                humidity: number;
                pressure: number;
                temp: number;
                temp_kf: number;
                temp_max: number;
                temp_min: number;
            };
            // wind_speed: number;
            // wind_deg: number;
            // weather: [
            //     {
            //         id: number;
            //         main: string;
            //         icon: string;
            //     }
            // ];
        }]

}

// метод для преобразования наших данных
const transformData = (forecastResponseData: ForecastResponseData): ForecastDays => {
    const result: ForecastDays = {};
    forecastResponseData.list?.map((item) => {

        const date = String(new Date(item.dt_txt).getDate());
        // const date = (new Date(item.dt_txt).getDate()); // date: number
        const dayOfMonth = 1;
        // const monthName = new Date(item.dt_txt).toLocaleString('default', { month: 'long' });

        const hour = new Date(item.dt_txt).getHours();
        const newHour: ForecastDayHour = {
            hour,
            feels_like: item.main.feels_like,
            temp: item.main.temp,
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min,
        }
        if (result[date]) {
            result[date].hours.push(newHour)
        } else {
            result[date] = {
                dt_txt: item.dt_txt,
                hours: [newHour]
            }
        }
    });

    return result;
}

const useWeatherData = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastDays | null>(null);
    const [isLoading, setLoading] = useState(false);


    // запрос за текущими данными
    const fetchData = ({ name = 'Moscow' }: FetchDataProps) => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${API_KEY}`
        )
            .then(res => res.json())
            .then((responseData: WeatherData) => {
                setData(responseData);
                fetchForecast(responseData.coord.lat, responseData.coord.lon);
            }).finally(() => {
            setLoading(false);
        });
    }
    // запрос за прогнозом на 5 дней
    const fetchForecast = (lat: number, lon: number) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        )
            .then(res => res.json()) // about https://developer.mozilla.org/en-US/docs/Web/API/Response/json
            .then((forecastResponseData: ForecastResponseData) => {
                setForecast(transformData(forecastResponseData));
            })
    }

    return { data, forecast, isLoading, fetchData };
};
export default useWeatherData;
