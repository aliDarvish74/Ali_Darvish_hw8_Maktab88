(() => {
  const body = document.querySelector("body");
  let newUserData = dataStorageGet("userData", userData);
  dataLogger(body, newUserData);
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
    let row = rowGenerator(dataTable);
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

function dataStorageGet(inputKey, altData) {
  return JSON.parse(localStorage.getItem(inputKey)) || altData;
}

function dataStorageSet(inputKey, inputData) {
  localStorage.setItem(inputKey, JSON.stringify(inputData));
}
