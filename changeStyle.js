// Check cookie value on page load
let stylesheet = document.querySelector("#stylesheet");
if (document.cookie.includes("mode=dark")) {
  stylesheet.setAttribute("href", "../styles/darkStyle.css");
}
if (document.cookie.includes("mode=light")) {
  stylesheet.setAttribute("href", "../styles/lightStyle.css");
}
function changeMode() {
  if (stylesheet.getAttribute("href") === "styles/lightStyle.css") {
    document.cookie = "mode=dark";
    stylesheet.setAttribute("href", "styles/darkStyle.css");
  } else if (stylesheet.getAttribute("href") === "../styles/lightStyle.css") {
    document.cookie = "mode=dark";
    stylesheet.setAttribute("href", "../styles/darkStyle.css");
  } else if (stylesheet.getAttribute("href") === "../styles/darkStyle.css") {
    document.cookie = "mode=light";
    stylesheet.setAttribute("href", "../styles/lightStyle.css");
  } else {
    document.cookie = "mode=light";
    stylesheet.setAttribute("href", "styles/lightStyle.css");
  }
}
