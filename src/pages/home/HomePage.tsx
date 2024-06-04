import Header from "../../components/Header/Header";
import ForecastCard from "../../components/ForecastCard/ForecastCard";
import useWeatherData from "../../hooks/useWeatherData";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";


function HomePage() {
    const { data, forecast, isLoading, error, fetchData } = useWeatherData();

    const [cityName, setCityName] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchData({ name: cityName });
        setCityName('');
    }

    const currentDate = data ? new Date(data.dt * 1000).toDateString() : new Date().toDateString()

    const handleChangeCityName = (event: ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    }

    // const handieGoTologinPage=()=>{
    //     window.location.assign('')
    // }

    useEffect(() => {
        fetchData({});
    }, []);

    return (
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
    )
}

export default HomePage;