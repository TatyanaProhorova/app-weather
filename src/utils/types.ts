// данные для одного часа
export interface ForecastDayHour {

    hour: number;
    feels_like: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

// данные для всего дня
export interface ForecastDay {    // added
    // dayOfMonth: number;
    // monthName: string;
    
    
    dt_txt: string;
    hours: ForecastDayHour[];
}

export type ForecastDays = Record<string, ForecastDay>;
