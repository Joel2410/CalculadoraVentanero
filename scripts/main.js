const init = () => {
  // widthElement.value = "85";
  // heightElement.value = "90";
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

  refresh();

  clearInputs();

  widthElement.focus();
};

const generateRow = (width, height, bodies) => {
  const option = +optionElement.value;
  const row = tableBodyElement.insertRow(-1);

  let cellCount = 0;
  const cSequence = row.insertCell(cellCount++);
  cSequence.setAttribute("scope", "row");
  cSequence.classList.add("row-head");

  const cSize = row.insertCell(cellCount++);
  const cBodies = row.insertCell(cellCount++);

  let cCabezal = undefined;
  if (![3, 4].includes(option)) cCabezal = row.insertCell(cellCount++);

  let cAlfeizar = undefined;
  if (option != 5) cAlfeizar = row.insertCell(cellCount++);

  const cLlavin = row.insertCell(cellCount++);
  const cEnganche = row.insertCell(cellCount++);
  const cRiel = row.insertCell(cellCount++);
  const cLateral = row.insertCell(cellCount++);
  const cVidrio = row.insertCell(cellCount++);

  const cActions = row.insertCell(cellCount++);
  cActions.classList.add("col-actions");
  cActions.classList.add("no-print");

  cSequence.innerText = row.rowIndex;

  cSize.innerText =
    decimalToFraction(width) + " x " + decimalToFraction(height);

  cBodies.innerText = bodies;

  const values = getValues(width, height, bodies);

  if (cCabezal)
    cCabezal.innerText = bodies + " - " + decimalToFraction(values.cabezal);

  if (cAlfeizar)
    cAlfeizar.innerText =
      bodies * ([3, 4].includes(option) ? 2 : 1) +
      " - " +
      decimalToFraction(values.alfeizar);

  cLlavin.innerText = bodies + " - " + decimalToFraction(values.llavin);

  if (cEnganche)
    cEnganche.innerText = bodies + " - " + decimalToFraction(values.enganche);

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

  refresh();

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

const refresh = () => {
  const option = +optionElement.value;

  subtitleElement.innerText = `Corredera ${
    optionElement.options[optionElement.selectedIndex].text
  }`;

  if (tableBodyElement.rows.length > 0) {
    optionElement.disabled = true;
    if ([3, 4].includes(option)) {
      colHeadElement.hidden = true;
    }
    if (option == 5) {
      colLedgeElement.hidden = true;
    }
  } else {
    optionElement.disabled = false;
    colHeadHitchElement.hidden = false;
    colLedgeElement.hidden = false;
  }
};

init();
