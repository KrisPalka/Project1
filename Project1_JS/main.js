//OVERALL SECTION//
const addRevenue = document.getElementById("addRevenue");
const addRevText = document.getElementById("addRevenueText");
const revenueList = document.getElementById("listItemRev");
const addRevNumber = document.getElementById("addRevValue");
const output = document.getElementById("output");
const totalRevenue = document.getElementById("totalRevenue");
const incomeArray = [];
const expenseArray = [3];

//REVENUE SECTION//
addRevenue.addEventListener("submit", (event) => {
  event.preventDefault();
  const revenueText = addRevText.value;
  const revenueElem = document.createElement("li");
  const revenueNumber = addRevNumber.value;
  const createDltBtn = createDeleteBtn(revenueNumber);
  const createEditBtn = createEditButton();

  incomeArray.push(Number(revenueNumber));

  revenueElem.innerText = revenueText + " - " + revenueNumber + "zł";

  revenueElem.appendChild(createEditBtn);
  revenueElem.appendChild(createDltBtn);
  revenueList.appendChild(revenueElem);
  sumRevenue();
  outputVal();
  toggleModal();
});

// edit_button.addEventListener("click", function () {
//   paragraph.contentEditable = true;
//   paragraph.style.backgroundColor = "#dddbdb";
// });

// end_button.addEventListener("click", function () {
//   paragraph.contentEditable = false;
//   paragraph.style.backgroundColor = "#ffe44d";
// });

function createEditButton() {
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("editBtn");
  editBtn.addEventListener("click", edit);
  return editBtn;

  function edit(event) {
    event.preventDefault();
    editBtn.contentEditable = true;
    editBtn.style.backgroundColor = "#dddbdb";
  }
}
function createDeleteBtn(revenueNumber) {
  const dltBtn = document.createElement("button");
  dltBtn.innerText = "Del";
  dltBtn.classList.add("dltBtn");
  dltBtn.addEventListener("click", deleteParent);
  return dltBtn;

  function deleteParent(event) {
    event.preventDefault();
    revenueList.removeChild(event.target.parentNode);
    incomeArray.push(Number(-revenueNumber));
    sumRevenue();
    outputVal();
    toggleModal();
  }
}
function sumRevenue() {
  const totalRev = incomeArray.reduce((acc, element) => {
    return acc + element;
  });
  totalRevenue.innerText = totalRev;
}

function outputVal() {
  const calcRev = incomeArray.reduce((acc, element) => {
    return acc + element;
  });
  const calcExp = expenseArray.reduce((acc, element) => {
    return acc + element;
  });
  return (output.innerText = calcRev - calcExp);
}

const toggleModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  const modalText = document.getElementById("modalText");
  if (outputVal() > 0) {
    modalText.innerText = "Możesz jeszcze wydać " + outputVal() + " złotych";
    modal.style.backgroundColor = "lightgreen";
  } else if (outputVal() === 0) {
    modalText.innerText = "Bilans wynosi zero";
    modal.style.backgroundColor = "lightgrey";
  } else {
    modalText.innerText =
      "Bilans jest ujemny. Jesteś na minusie " + outputVal() + " złotych";
    modal.style.backgroundColor = "red";
    document.body.style.backgroundColor = "red";
  }
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.backgroundColor = "white";
  }, 3000);
};

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  revenueList.innerText = "";
  output.innerText = "";
  incomeArray.length = 0;
  expenseArray.length = 0;
});
// document.getElementById("addRevenue").reset();
// revenueList.innerText = "";
// const totalNumb = document.getElementById("totalRevenue");
// totalNumb.innerText = "";
// output.innerText = "";

//EXPENSES SECTION//
