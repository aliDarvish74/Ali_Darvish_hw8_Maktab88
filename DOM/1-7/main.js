(() => {
  const body = document.querySelector("body");
  let newUserData = dataStorageGet(userData);
})();
function dataLogger(parent, data) {
  const dataTable = document.createElement("table");
  parent.appendChild(dataTable);

  const tableHeaders = ["row", ...Object.keys(data[0])];
  const thRow = rowGenerator(dataTable);
  for (let th of tableHeaders) {
    thGenerator(thRow, th);
  }

  data.forEach((user, index) => {
    let row = rowGenerator(userDataTable);
    tdGenerator(row, index + 1);
    tdGenerator(row, user.uid);
    tdGenerator(row, user.firstname);
    tdGenerator(row, user.lastname);
    tdGenerator(row, user.city);
    tdGenerator(row, user.postalCode);
    tdGenerator(row, user.phoneNumber);
    tdGenerator(row, user.position);
  });
  return dataTable;
}

function rowGenerator(parentTable) {
  let row = document.createElement("tr");
  parentTable.appendChild(row);
  return row;
}

function thGenerator(parent, innerText) {
  let th = document.createElement("th");
  th.innerText = innerText;
  parent.appendChild(th);
  return th;
}
function tdGenerator(parent, innerText) {
  let td = document.createElement("td");
  td.innerText = innerText;
  parent.appendChild(td);
  return td;
}

// body.addEventListener("click", (e) => {
//   if (e.target.tagName === "TH") {
//     let sortTarget = e.target.innerHTML;
//     if (sortTarget === "row") {
//       return;
//     }
//     userData.sort(
//       (obj1, obj2) =>
//         obj2[sortTarget] - obj1[sortTarget] ||
//         obj2[sortTarget].localeCompare(obj1[sortTarget])
//     );
//     bodyUpdate();
//   }
// });

function bodyUpdate() {
  body.innerHTML = "";
  tableGenerator(body, userData);
}

function dataStorageGet(altData) {
  return JSON.parse(localStorage.getItem("userData")) || altData;
}
function dataStorageSet(inputKey, inputData) {
  localStorage.setItem(inputKey, JSON.stringify(inputData));
}
