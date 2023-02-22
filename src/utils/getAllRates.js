export const getAllRates = res => ({
  eur_buy: +parseFloat(res[0].buy).toFixed(2),
  eur_sale: +parseFloat(res[0].sale).toFixed(2),
  usd_buy: +parseFloat(res[1].buy).toFixed(2),
  usd_sale: +parseFloat(res[1].sale).toFixed(2),
  btc_buy: 11500.0,
  btc_sale: 11700.0,
  uah_buy: 1,
  uah_sale: 1,
});
