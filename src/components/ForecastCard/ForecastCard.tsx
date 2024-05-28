import { useState } from "react";

import { ForecastDayHour } from "../../utils/types";

import "./ForecastCard.css";

interface ForecastProps {
  
  day: string | null;
  hours: ForecastDayHour[];
}

function ForecastCard(props: ForecastProps) {
const { day, hours} = props;

const dayOfMonth = day ? new Date(day).getDate() : undefined;
const monthName = day ? new Date(day).toLocaleString('default', { month: 'long' }) : undefined; // ? ?
const year = day ? new Date(day).getFullYear() : undefined;

const [isOpen, setOpen] = useState(false);

return(
      <div className='forecast__card'>
        <button className="forecast__button" onClick={() => setOpen(!isOpen)}>
          <div>{dayOfMonth}</div>
          <div>{monthName}</div>
          <div>{year}</div>
        </button>

        <ul className={isOpen ? "dropdown-active" : "dropdown"}>
          {hours.map((hourItem) => (
              <li className="dropdown__item">
                  <div>{`${hourItem.hour}:00`}</div>
                  <div><span>{hourItem.temp.toFixed(0)}&deg;C</span></div>
              </li>
          ))}
        </ul>
      </div>  
  )
}


export default ForecastCard
