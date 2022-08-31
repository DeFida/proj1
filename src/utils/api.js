// const W_API_KEY = 'b98da4a31a63965e746cbfda28834321';
// const C_API_KEY = 'f6fb5185da929f3bd95ad47169aa370c';
// const C_API_KEY2 = '86dd55a8faf297d88a2cc42eefa4c9db';

// export const W_API_END_POINT = 'api.openweathermap.org/data/2.5/forecast?APPID=b98da4a31a63965e746cbfda28834321&units=metric&q=';
// export const C_API_END_POINT = 'http://api.positionstack.com/v1/forward?access_key=f6fb5185da929f3bd95ad47169aa370c&query=';
import axios from "axios";



export default class Api {
    constructor(options) {
        this.W_API_END_POINT = 'http://api.openweathermap.org/data/2.5/weather?APPID=b98da4a31a63965e746cbfda28834321&units=metric';
        this.WF_API_END_POINT = 'http://api.openweathermap.org/data/2.5/forecast?APPID=b98da4a31a63965e746cbfda28834321&units=metric';
        // this.C_API_END_POINT = 'http://api.positionstack.com/v1/forward?access_key=86dd55a8faf297d88a2cc42eefa4c9db&query=';

        this.headers = options['headers'];
        this.authHeader = {
            'Content-Type': 'application/json',
        }
    }
    
    _handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getCityAPI(city) {
        console.log(city);
        const options = {
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places/autocomplete',
            params: {limit: '10', skip: '0', q: city, type: 'CITY'},
            headers: {
              'X-RapidAPI-Key': 'b74831ef87msh6566152d8a88ea9p1e17ebjsnbd9cb6367bfa',
              'X-RapidAPI-Host': 'spott.p.rapidapi.com'
            }
          };
        return axios.request(options)

    }
    
        // const options = {
        //     method: 'GET',
        //     url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        //     params: {limit: '10', namePrefix: 'oral'},
        //     headers: {
        //       'X-RapidAPI-Key': '91df5f39c2mshda0beeaa5834e34p129eb9jsn04b7f060b113',
        //       'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        //     }
        //   };
          
        //   return axios.request(options)


    getWeatherAPI(latitude, longitude) {
        console.log(`${this.WF_API_END_POINT}&lat=${latitude}&lon=${longitude}`);
        return axios.get(`${this.WF_API_END_POINT}&lat=${latitude}&lon=${longitude}`,  {
            headers: {
                'Content-Type': 'application/json',
            } 
        })
    }

    getCurrentWeatherAPI(latitude, longitude) {
        return axios.get(`${this.W_API_END_POINT}&lat=${latitude}&lon=${longitude}`,  {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }


}