const body = document.querySelector("body");
let paragraph = document.createElement("p");
let paragraphNodeText = document.createTextNode(
  "Click here and watch the text change!"
);
paragraph.appendChild(paragraphNodeText);
body.appendChild(paragraph);

paragraph.style.backgroundColor = "green";
paragraph.style.width = "400px";
paragraph.style.height = "250px";
paragraph.style.color = "white";
paragraph.style.padding = "15px";

paragraph.onclick = function () {
  paragraph.innerHTML += " Click added some text!";
};

paragraph.onwheel = function () {
  paragraph.innerHTML = "Click here and watch the text change!";
};
