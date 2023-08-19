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

renderScheme();
