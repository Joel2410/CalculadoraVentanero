const init = () => {
  //widthElement.value = "85";
  //heightElement.value = "90";
  bodiesElement.value = "2";
  optionElement.value = "1";

  widthElement.focus();
};

const generate = () => {
  let width = +eval(widthElement.value.replace(" ", "+"));
  let height = +eval(heightElement.value.replace(" ", "+"));

  let bodies = +bodiesElement.value;

  if (!validateForm(width, height, bodies)) return;

  generateRow(width, height, bodies);

  optionElement.disabled = tableBodyElement.rows.length > 0;

  clearInputs();

  widthElement.focus();
};

const generateRow = (width, height, bodies) => {
  const row = tableBodyElement.insertRow(-1);

  const cSequence = row.insertCell(0);
  cSequence.setAttribute("scope", "row");
  cSequence.classList.add("row-head");

  const cSize = row.insertCell(1);
  const cBodies = row.insertCell(2);
  const cCabezal = row.insertCell(3);
  const cLlavin = row.insertCell(4);
  const cRiel = row.insertCell(5);
  const cLateral = row.insertCell(6);
  const cVidrio = row.insertCell(7);

  const cActions = row.insertCell(8);
  cActions.classList.add("col-actions");
  cActions.classList.add("no-print");

  cSequence.innerText = row.rowIndex;

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

  cActions.appendChild(generateDeleteButton(row.rowIndex));
};

const deleteRow = (row) => {
  tableBodyElement.deleteRow(row - 1);

  optionElement.disabled = tableBodyElement.rows.length > 0;

  const rows = tableBodyElement.rows;
  for (let i = row - 1; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1;
  }
};

const clearInputs = () => {
  widthElement.value = "";
  heightElement.value = "";

  widthElement.style.color = "black";
  heightElement.style.color = "black";
};

init();
