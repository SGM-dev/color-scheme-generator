let colorArray = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"];

const form = document.getElementById("color-scheme");

function renderScheme() {
  let colorHtml = "";
  let codeHtml = "";
  for (let color of colorArray) {
    colorHtml += `<div class="color" style="background: ${color}"></div>`;
    codeHtml += `<span class="hex">${color}</span>`;
  }
  document.getElementById("colors").innerHTML = `${colorHtml}${codeHtml}`;
  document.body.style.background = `linear-gradient(
    90deg,${colorArray.toString()}
  )`;
}

function getScheme(hex, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      colorArray = [];
      for (let color of data.colors) {
        colorArray.push(color.hex.value);
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const options = {
    hex: document.getElementById("color-picker").value.slice(1),
    mode: document.getElementById("mode-selector").value,
  };
  getScheme(options.hex, options.mode);
  renderScheme();
});

renderScheme();
