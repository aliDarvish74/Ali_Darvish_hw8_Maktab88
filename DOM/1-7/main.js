(() => {
  const body = document.querySelector("body");
  const tableContainer = document.getElementById("tableContainer");
  let newUserData = dataStorageGet("userData", userData);
  let modalContainer = document.getElementById("modalContainer");
  dataLogger(tableContainer, newUserData);
  let createBtn = document.getElementById("createBtn");
  let modalCreateBtn = document.getElementById("modalCreateBtn");
  let updateBtn = document.getElementById("updateBtn");
  let submitBtn = document.getElementById("submitBtn");
  let deleteBtn = document.getElementById("deleteBtn");

  body.addEventListener("click", (e) => {
    if (e.target.tagName === "TH") {
      sort(e.target, newUserData, tableContainer);
    }
  });

  body.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "TD") {
      userLogger(e.target, newUserData, modalContainer);
    }
  });

  updateBtn.addEventListener("click", (e) => {
    updateToggle();
  });

  submitBtn.addEventListener("click", (e) => {
    updateSubmit();
  });

  deleteBtn.addEventListener("click", (e) => {
    deleteUser();
  });
  createBtn.addEventListener("click", (e) => {
    createToggle();
  });
  modalCreateBtn.addEventListener("click", (e) => {
    createUser();
  });
})();

function dataLogger(parent, data) {
  parent.innerHTML = "";
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

function userLogger(target, data, modal) {
  let uid = +target.parentElement.children[1].innerHTML;
  modal.style.display = "block";
  let targetObj = data.find((item) => item.uid === uid);
  document.getElementById("uidInput").value = targetObj.uid;
  document.getElementById("firstnameInput").value = targetObj.firstname;
  document.getElementById("lastnameInput").value = targetObj.lastname;
  document.getElementById("cityInput").value = targetObj.city;
  document.getElementById("postalCodeInput").value = targetObj.postalCode;
  document.getElementById("phoneNumberInput").value = targetObj.phoneNumber;
  document.getElementById("positionInput").value = targetObj.position;
}

function createToggle() {
  modalContainer.style.display = "block";
  modalCreateBtn.style.display = "inline-block";
  deleteBtn.style.display = "none";
  updateBtn.style.display = "none";
  let formData = document.querySelectorAll("#userDataForm input");
  for (const input of formData) {
    input.removeAttribute("disabled");
    input.style.borderTop = "1px solid #002546";
    input.style.borderRight = "1px solid #002546";
  }
}
function createUser() {
  let newUserData = dataStorageGet("userData", userData);
  let formData = document.querySelectorAll("#userDataForm input");
  let uid = Number(document.getElementById("uidInput").value);
  for (const input of formData) {
    if (input.value === "") {
      alert(`All inputs must be filled!`);
      return;
    }
  }
  let duplicateObj = newUserData.filter((item) => item.uid === uid);
  console.log(duplicateObj);
  if (duplicateObj.length != 0) {
    alert(`Duplicate UID found. please enter another UID`);
    return;
  }
  if (isNaN(uid)) {
    alert(`UID must be a number!`);
    return;
  }
  let newUser = {
    uid: +document.getElementById("uidInput").value,
    firstname: document.getElementById("firstnameInput").value,
    lastname: document.getElementById("lastnameInput").value,
    city: document.getElementById("cityInput").value,
    postalCode: document.getElementById("postalCodeInput").value,
    phoneNumber: document.getElementById("phoneNumberInput").value,
    position: document.getElementById("positionInput").value,
  };

  newUserData.push(newUser);
  dataLogger(tableContainer, newUserData);
  dataStorageSet("userData", newUserData);
  modalClose();
}

function updateToggle() {
  let formData = document.querySelectorAll("#userDataForm input");

  for (const input of formData) {
    input.removeAttribute("disabled");
    input.style.borderTop = "1px solid #002546";
    input.style.borderRight = "1px solid #002546";
  }

  document.getElementById("uidInput").setAttribute("disabled", "true");
  document.getElementById("uidInput").style.borderTop = "none";
  document.getElementById("uidInput").style.borderRight = "none";
  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "inline-block";
}

function updateSubmit() {
  let newUserData = dataStorageGet("userData", userData);
  let formData = document.querySelectorAll("#userDataForm input");
  for (const input of formData) {
    if (input.value === "") {
      alert(`All Data Fields Must Fill!`);
      return;
    }
  }
  let updatedUser = {
    uid: +document.getElementById("uidInput").value,
    firstname: document.getElementById("firstnameInput").value,
    lastname: document.getElementById("lastnameInput").value,
    city: document.getElementById("cityInput").value,
    postalCode: document.getElementById("postalCodeInput").value,
    phoneNumber: document.getElementById("phoneNumberInput").value,
    position: document.getElementById("positionInput").value,
  };

  let uid = document.getElementById("uidInput").value;
  newUserData = newUserData.map((item) => {
    if (item.uid === +uid) {
      return { ...item, ...updatedUser };
    }
    return item;
  });
  dataStorageSet("userData", newUserData);
  dataLogger(tableContainer, newUserData);
  modalClose();
}

function deleteUser() {
  const userId = +document.getElementById("uidInput").value;
  let newUserData = dataStorageGet("userData", userData);
  const tableContainer = document.getElementById("tableContainer");
  newUserData = newUserData.filter((item) => item.uid !== userId);
  dataStorageSet("userData", newUserData);
  dataLogger(tableContainer, newUserData);
  modalClose();
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

function sort(target, data, tableParent) {
  let newUserData = dataStorageGet("userData", userData);
  let sortTarget = target.innerHTML;
  if (sortTarget === "row") {
    return;
  }
  data.sort(
    (obj1, obj2) =>
      obj2[sortTarget] - obj1[sortTarget] ||
      obj2[sortTarget].localeCompare(obj1[sortTarget])
  );
  dataStorageSet("userData", newUserData);
  dataLogger(tableParent, data);
}

function modalClose() {
  let formData = document.querySelectorAll("#userDataForm input");
  for (const input of formData) {
    input.style.borderTop = "none";
    input.style.borderRight = "none";
    input.setAttribute("disabled", "true");
    input.value = "";
  }

  deleteBtn.style.display = "inline-block";
  submitBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
  modalCreateBtn.style.display = "none";
  modalContainer.style.display = "none";
}
