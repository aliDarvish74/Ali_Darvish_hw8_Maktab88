let body = document.querySelector("body");
let form = document.createElement("form");
body.appendChild(form);
form.style.width = "fit-content";
form.style.border = "1px solid black";
form.style.margin = "0 auto";
form.style.padding = "20px 70px 10px 20px";

let header = document.createElement("header");
header.innerText = "My Tasks";
header.style.color = "red";
header.style.fontSize = "32px";
header.style.fontWeight = "700";
header.style.margin = "0 auto 20px 10px";
form.appendChild(header);

let orderedList = document.createElement("ol");
form.appendChild(orderedList);
orderedList.type = "I";

listItemGen("user dashboard", orderedList);
listItemGen("admin dashboard", orderedList);
let authentication = listItemGen("authentication", orderedList);
listItemGen("about page", orderedList);
listItemGen(`<del> contact page </del>`, orderedList);

let authList = document.createElement("ul");
listItemGen("login", authList);
listItemGen(`<del>register</del>`, authList);
listItemGen("logout", authList);
authentication.appendChild(authList);

const textInput = document.createElement("input");
textInput.type = "text";

const submitbutton = document.createElement("button");
submitbutton.type = "submit";
submitbutton.innerText = "add task";
submitbutton.style.marginLeft = "5px";
form.appendChild(textInput);
form.appendChild(submitbutton);

function listItemGen(nodeText, parentList) {
  let listItem = document.createElement("li");
  listItem.innerHTML = nodeText;
  parentList.appendChild(listItem);
  return listItem;
}
