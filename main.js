const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");
const bodiesElement = document.getElementById("bodies");
const resultsElement = document.getElementById("results");
const tableElement = resultsElement.getElementsByTagName("table")[0];

const regex = /^\d+(\.\d+)?( \d+\/\d+)?$/;
const validKeys = /^[0-9\. \/]$/;

const decimals = 4;

widthElement.addEventListener("input", () => {
  const value = widthElement.value.trim();
  const valid = regex.test(value);

  widthElement.style.color = valid ? "black" : "red";
});

widthElement.addEventListener("keydown", (event) => {
  validateKeys(widthElement.value, event);
});

heightElement.addEventListener("input", () => {
  const value = heightElement.value.trim();
  const valid = regex.test(value);

  heightElement.style.color = valid ? "black" : "red";
});

heightElement.addEventListener("keydown", (event) => {
  validateKeys(heightElement.value, event);
});

init = () => {
  widthElement.value = "47 1/8";
  heightElement.value = "39 1/2";
  bodiesElement.value = "3";
};

const validateKeys = (value, event) => {
  if (event.key.length === 1 && !validKeys.test(event.key))
    event.preventDefault();

  if (event.key == " " && value.includes(" ")) event.preventDefault();

  if (event.key == "." && value.includes(".")) event.preventDefault();

  if (event.key == "/" && value.includes("/")) event.preventDefault();

  return true;
};

const generate = () => {
  let width = +eval(widthElement.value.replace(" ", "+"));
  let height = +eval(heightElement.value.replace(" ", "+"));

  let bodies = +bodiesElement.value;

  if (!validateForm(width, height, bodies)) return;

  generateRow(width, height, bodies);

  resultsElement.hidden = false;

  clearInputs();

  widthElement.focus();
};

const validateForm = (width, height, bodies) => {
  if (!width) {
    alert("Debe de digitar el ancho");
    widthElement.focus();
    return false;
  }

  if (!height) {
    alert("Debe de digitar el alto");
    heightElement.focus();
    return false;
  }

  if (!bodies) {
    alert("Debe de digitar la cantidad de cuerpos");
    bodiesElement.focus();
    return false;
  }

  if (bodies < 2 || bodies > 3) {
    alert("La cantidad de cuerpos debe ser entre 2 y 3");
    bodiesElement.focus();
  }

  return true;
};

const generateRow = (width, height, bodies) => {
  const row = tableElement.insertRow(-1);

  const cSize = row.insertCell(0);
  const cBodies = row.insertCell(1);
  const cCabezal = row.insertCell(2);
  const cLlavin = row.insertCell(3);
  const cRiel = row.insertCell(4);
  const cLateral = row.insertCell(5);
  const cVidrio = row.insertCell(6);

  cSize.innerText =
    decimalToFraction(width) + " x " + decimalToFraction(height);

  cBodies.innerText = bodies;

  let cabezal = 0;
  if (bodies == 2) cabezal = width / bodies - 5 / 16;
  else if (bodies == 3) cabezal = width / bodies;
  cabezal = cabezal.toFixed(decimals);

  cCabezal.innerText = bodies + " - " + decimalToFraction(cabezal);

  const llavin = (height - 7 / 8).toFixed(decimals);
  cLlavin.innerText = bodies + " - " + decimalToFraction(llavin);

  const riel = (width - 1 / 4).toFixed(decimals);
  cRiel.innerText = 2 + " - " + decimalToFraction(riel);

  const lateral = (height - 9 / 16).toFixed(decimals);
  cLateral.innerText = 2 + " - " + decimalToFraction(lateral);

  const vidrioWidth = (width / 2 - (2 + 1 / 8)).toFixed(decimals);
  const vidrioHeight = (height - 4).toFixed(decimals);

  cVidrio.innerText =
    bodies +
    " - " +
    decimalToFraction(vidrioWidth) +
    " x " +
    decimalToFraction(vidrioHeight);
};

const calculateGCD = (a, b) => {
  if (b === 0) {
    return a;
  }
  return calculateGCD(b, a % b);
};

const decimalToFraction = (decimal) => {
  const maxPrecision = 1000000;
  let numerador = decimal;
  let denominador = 1;

  while (Math.abs(numerador - Math.round(numerador)) > 1 / maxPrecision) {
    denominador *= 10;
    numerador = decimal * denominador;
  }

  const mcd = calculateGCD(Math.round(numerador), denominador);

  numerador = Math.round(numerador) / mcd;
  denominador = denominador / mcd;

  return denominador.toString().length > 3
    ? `${decimal}`
    : `${Math.floor(decimal)} ${
        numerador % denominador
          ? (numerador % denominador) + "/" + denominador
          : ""
      }`;
};

const clearInputs = () => {
  widthElement.value = "";
  heightElement.value = "";

  widthElement.style.color = "black";
  heightElement.style.color = "black";
};

init();
