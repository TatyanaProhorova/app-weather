import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import useWeatherData from "./hooks/useWeatherData";
import ForecastCard from './components/ForecastCard/ForecastCard';
import Header from "./components/Header/Header";
import {ThemeContext} from "./contexts/ThemeContext";

import './App.scss';

function App() {
  const { data, forecast, isLoading, error, fetchData } = useWeatherData();

  // if (forecast) {
  // for (const i of forecast) forecast // Type 'ForecastDays' must have a '[Symbol.iterator]()' method that returns an iterator.

  // if (forecast) {
  //   const forecast3Days = forecast.filter((key) => {forecast[key].dt_txt !== forecast[0].dt_txt});
  // }

  const [cityName, setCityName] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData({ name: cityName });
    setCityName('');
  }

  const currentDate = data ? new Date(data.dt * 1000).toDateString() : new Date().toDateString()

  const handleChangeCityName = (event: ChangeEvent<HTMLInputElement>) => {
      setCityName(event.target.value);
  }

  useEffect(() => {
    fetchData({});
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
}, [theme])

  return (
    <ThemeContext.Provider value={{ value: theme, changeValue: setTheme }}>
      <div className="info_panel">
        <Header />
        <form name="myForm" className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={cityName}
              onChange={handleChangeCityName}
              className="input_field"
              placeholder="Введите название города"
            />
            <button className="search-button" type="submit" disabled={!cityName}>
              Поиск
            </button>
        </form>

        {isLoading ? (
            <div>Загрузка...</div>
        ) : (
              <div className="city-info">
                <div className='city_name'>
                  {error ? error : data?.name}
                </div>

                <div className="current_date">
                  {currentDate && (
                    <div>сегодня {currentDate}</div>
                  )}
                </div>

                <div className='temp'>
                  <span>{data?.main?.temp.toFixed(1)}</span><span>&deg;C</span>
                </div>

                <div className='forecast'>
                  <div>
                    <span>прогноз погоды</span>
                  </div>
                  <div className='forecast__daily'>
                    {forecast ? Object.keys(forecast).map((key) => {
                        console.log(key)
                        return (
                          <ForecastCard key={key} day={forecast[key].dt_txt} hours={forecast[key].hours}/>
                        )
                    }) : (
                        <span>Данных о прогнозе погоды нет</span>
                    )}

                  </div>
                </div>
              </div>
            )
        }
      </div>
    </ThemeContext.Provider>
  )
}

export default App
