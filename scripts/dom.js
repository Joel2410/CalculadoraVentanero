const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");
const bodiesElement = document.getElementById("bodies");
const tableBodyElement = document.getElementsByTagName("tbody")[0];
const optionElement = document.getElementById("option");

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

const validateKeys = (value, event) => {
  if (event.key.length === 1 && !validKeys.test(event.key))
    event.preventDefault();

  if (event.key == " " && value.includes(" ")) event.preventDefault();

  if (event.key == "." && value.includes(".")) event.preventDefault();

  if (event.key == "/" && value.includes("/")) event.preventDefault();

  return true;
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

const generateDeleteButton = (index) => {
  const deleteButton = document.createElement("button");
  deleteButton.title = "Borrar medida";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/delete.png";
  deleteIcon.alt = "Delete";
  deleteIcon.classList.add("icon");

  deleteButton.appendChild(deleteIcon);

  deleteButton.classList.add("delete-button");
  deleteButton.onclick = () => {
    deleteRow(index);
  };

  return deleteButton;
};
