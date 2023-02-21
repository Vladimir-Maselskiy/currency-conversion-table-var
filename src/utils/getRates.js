import axios from 'axios';

export const getRates = () => {
  return axios
    .get(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    )
    .then(resp => {
      console.log(resp);
      return resp;
    });
};
