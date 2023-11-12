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
    case 1: //Tradicional
      cabezal = (width / bodies - (bodies == 2 ? 5 / 16 : 0)).toFixed(decimals);
      riel = (width - 1 / 4).toFixed(decimals);
      lateral = (height - 9 / 16).toFixed(decimals);
      llavin = (height - 7 / 8).toFixed(decimals);
      vidrioWidth = (width / 2 - (2 + 1 / 8)).toFixed(decimals);
      vidrioHeight = (height - 4).toFixed(decimals);
      break;

    case 2: //P-65
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

    case 3: //P-92
      cabezal = width / bodies;
      if (bodies == 2) cabezal -= 7 / 16;
      else if (bodies == 3) cabezal += 3 / 16;
      cabezal = cabezal.toFixed(decimals);

      riel = (width - (1 + 5 / 8)).toFixed(decimals);
      lateral = (height - 1 / 4).toFixed(decimals);
      llavin = (height - (2 + 1 / 2)).toFixed(decimals);

      vidrioWidth = width / bodies;
      if (bodies == 2) vidrioWidth -= 3 + 3 / 4;
      else if (bodies == 3) vidrioWidth -= 2 + 9 / 16;
      vidrioWidth = vidrioWidth.toFixed(decimals);

      vidrioHeight = (height - (6 + 1 / 2)).toFixed(decimals);

      break;

    case 4: //C-70
      cabezal = width / bodies;
      if (bodies == 2) cabezal -= 1 / 4;
      else if (bodies == 3) cabezal += 1 / 2;
      cabezal = cabezal.toFixed(decimals);

      riel = (width - 1 / 4).toFixed(decimals);
      lateral = (height - 1 / 4).toFixed(decimals);
      llavin = (height - (2 + 3 / 4)).toFixed(decimals);

      vidrioWidth = width / bodies;
      if (bodies == 2) vidrioWidth -= 4 + 1 / 8;
      else if (bodies == 3) vidrioWidth -= 3 + 3 / 8;
      vidrioWidth = vidrioWidth.toFixed(decimals);

      vidrioHeight = (height - (6 + 5 / 8)).toFixed(decimals);
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
