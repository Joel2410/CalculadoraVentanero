const regex = /^\d+(\.\d+)?( \d+\/\d+)?$/;
const validKeys = /^[0-9. /]$/;

const decimals = 4;

const getValues = (width, height, bodies) => {
  const option = +optionElement.value;

  let cabezal = 0;
  let llavin = 0;
  let riel = 0;
  let lateral = 0;
  let vidrioWidth = 0;
  let vidrioHeight = 0;

  switch (option) {
    case 1:
      cabezal = (width / bodies - (bodies == 2 ? 5 / 16 : 0)).toFixed(decimals);
      riel = (width - 1 / 4).toFixed(decimals);
      lateral = (height - 9 / 16).toFixed(decimals);
      llavin = (height - 7 / 8).toFixed(decimals);
      vidrioWidth = (width / 2 - (2 + 1 / 8)).toFixed(decimals);
      vidrioHeight = (height - 4).toFixed(decimals);
      break;

    case 2:
      cabezal = width / bodies;
      if (bodies == 2) cabezal -= 5 / 8;
      else if (bodies == 3) cabezal += 1 / 16;
      cabezal = cabezal.toFixed(decimals);

      riel = (width - (1 + 1 / 2)).toFixed(decimals);
      lateral = (height - 1 / 8).toFixed(decimals);
      llavin = (height - (2 + 1 / 8)).toFixed(decimals);

      vidrioWidth = width / bodies;
      if (bodies == 2) vidrioWidth -= 3 + 5 / 16;
      else if (bodies == 3) vidrioWidth -= 2 + 9 / 16;
      vidrioWidth = vidrioWidth.toFixed(decimals);

      vidrioHeight = (height - 5).toFixed(decimals);
      break;

    case 3:
      break;

    case 4:
      break;
  }

  return {
    cabezal,
    llavin,
    riel,
    lateral,
    vidrioWidth,
    vidrioHeight,
  };
};

const calculateGCD = (a, b) => {
  if (b === 0) {
    return a;
  }
  return calculateGCD(b, a % b);
};

const decimalToFraction = (decimal, count = 0) => {
  const maxPrecision = 1000000;
  let numerador = decimal;
  let denominador = 1;

  decimal = +decimal;

  while (Math.abs(numerador - Math.round(numerador)) > 1 / maxPrecision) {
    denominador *= 10;
    numerador = decimal * denominador;
  }

  const mcd = calculateGCD(Math.round(numerador), denominador);

  numerador = Math.round(numerador) / mcd;
  denominador = denominador / mcd;

  if (count < 3 && denominador.toString().length > 2) {
    return decimalToFraction(decimal.toFixed(3 - count), ++count);
  }

  const fraction = `${Math.floor(decimal)} ${
    numerador % denominador ? (numerador % denominador) + "/" + denominador : ""
  }`;

  return denominador.toString().length > 3 ? `${decimal}` : fraction;
};
