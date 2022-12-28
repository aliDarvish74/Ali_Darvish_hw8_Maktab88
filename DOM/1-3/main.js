// Get body
let body = document.querySelector("body");

// Create and style parent div
let parentDiv = document.createElement("div");
divStyler(parentDiv, function (inputDiv) {
  let textNode = document.createTextNode("Parent node's text.");
  inputDiv.appendChild(textNode);
});

// Create and style target div
let targetDiv = document.createElement("div");
divStyler(targetDiv, function (inputDiv) {
  let textNode = document.createTextNode("The target node.");
  inputDiv.appendChild(textNode);
  inputDiv.style.margin = "20px auto 20px 30px";
});

// Create and style child node
let childNode = document.createElement("div");
divStyler(childNode, function (inputDiv) {
  let textNode = document.createTextNode("The main node's child node!");
  inputDiv.appendChild(textNode);
  inputDiv.style.margin = "20px auto 20px 30px";
  inputDiv.style.paddingBottom = "60px";
});

// create copy parent text button
let copyParentBtn = document.createElement("button");
let copyParentBtnText = document.createTextNode("Copy Parent Text");
copyParentBtn.style.marginRight = "10px";

// create copy child text button
let copyChildBtn = document.createElement("button");
let copyChildText = document.createTextNode("Copy Child Text!");

// make buttons group
let btnGroup = document.createElement("div");
btnGroup.style.marginTop = "20px";

// append childs to parents
// divs
targetDiv.appendChild(childNode);
parentDiv.appendChild(targetDiv);
body.appendChild(parentDiv);

// buttons
copyParentBtn.appendChild(copyParentBtnText);
copyChildBtn.appendChild(copyChildText);
btnGroup.appendChild(copyParentBtn);
btnGroup.appendChild(copyChildBtn);
body.appendChild(btnGroup);

// copy child on click function
copyChildBtn.onclick = function () {
  targetDiv.innerHTML = `${childNode.innerText} ${targetDiv.innerHTML}`;
};

// copy parent on click function
copyParentBtn.onclick = function () {
  targetDiv.innerHTML = `${parentDiv.innerText} ${targetDiv.innerHTML}`;
};

// div styler function
function divStyler(inputDiv, cb) {
  inputDiv.style.backgroundColor = "rgb(50,255,0)";
  inputDiv.style.width = "60%";
  inputDiv.style.border = "1px solid black";
  cb(inputDiv);
}
