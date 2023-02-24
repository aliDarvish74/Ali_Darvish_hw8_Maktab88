let body = document.querySelector("body");

let div = document.createElement("div");
let divNode = document.createTextNode("Hover over me!");
div.appendChild(divNode);

body.appendChild(div);

div.style.backgroundColor = "blue";
div.style.color = "white";
div.style.width = "500px";
div.style.height = "200px";
div.style.padding = "15px";
div.style.margin = "0 auto";

div.onmouseenter = function () {
  div.style.backgroundColor = "red";
  div.style.cursor = "pointer";
};
div.onmouseleave = function () {
  div.style.backgroundColor = "blue";
};
