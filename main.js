const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");
const bodiesElement = document.getElementById("bodies");
const resultsElement = document.getElementById("results");
const tableElement = resultsElement.getElementsByTagName("tbody")[0];
const optionElement = document.getElementById("option");

const regex = /^\d+(\.\d+)?( \d+\/\d+)?$/;
const validKeys = /^[0-9. /]$/;

const decimals = 4;

bodiesElement.addEventListener("keydown", (event) => {
  validateEnter(bodiesElement, event);
});

widthElement.addEventListener("input", () => {
  const value = widthElement.value.trim();
  const valid = regex.test(value);

  widthElement.style.color = valid ? "black" : "red";
});

widthElement.addEventListener("keydown", (event) => {
  validateKeys(widthElement.value, event);
  validateEnter(widthElement, event);
});

heightElement.addEventListener("input", () => {
  const value = heightElement.value.trim();
  const valid = regex.test(value);

  heightElement.style.color = valid ? "black" : "red";
});

heightElement.addEventListener("keydown", (event) => {
  validateKeys(heightElement.value, event);
  validateEnter(heightElement, event);
});

const init = () => {
  widthElement.value = "47";
  heightElement.value = "39 1/2";
  bodiesElement.value = "2";

  widthElement.focus();
};

const validateKeys = (value, event) => {
  if (event.key.length === 1 && !validKeys.test(event.key))
    event.preventDefault();

  if (event.key == " " && value.includes(" ")) event.preventDefault();

  if (event.key == "." && value.includes(".")) event.preventDefault();

  if (event.key == "/" && value.includes("/")) event.preventDefault();

  return true;
};

const validateEnter = (input, event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const nextIndex = parseInt(input.getAttribute("tabindex"), 10) + 1;
    const nextInput = document.querySelector('[tabindex="' + nextIndex + '"]');
    if (nextInput) {
      nextInput.focus();
    }
  }
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
  cSize.setAttribute("scope", "row");
  cSize.classList.add("rowHead");

  const cBodies = row.insertCell(1);
  const cCabezal = row.insertCell(2);
  const cLlavin = row.insertCell(3);
  const cRiel = row.insertCell(4);
  const cLateral = row.insertCell(5);
  const cVidrio = row.insertCell(6);

  cSize.innerText =
    decimalToFraction(width) + " x " + decimalToFraction(height);

  cBodies.innerText = bodies;

  const values = getValues(width, height, bodies);

  cCabezal.innerText = bodies + " - " + decimalToFraction(values.cabezal);
  cLlavin.innerText = bodies + " - " + decimalToFraction(values.llavin);
  cRiel.innerText = 2 + " - " + decimalToFraction(values.riel);
  cLateral.innerText = 2 + " - " + decimalToFraction(values.lateral);

  cVidrio.innerText =
    bodies +
    " - " +
    decimalToFraction(values.vidrioWidth) +
    " x " +
    decimalToFraction(values.vidrioHeight);
};

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

const clearInputs = () => {
  widthElement.value = "";
  heightElement.value = "";

  widthElement.style.color = "black";
  heightElement.style.color = "black";
};

init();
