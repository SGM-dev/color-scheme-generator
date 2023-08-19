let colorArray = ["#F55A5A", "#2B283A", "#FBF3AB", "#AAD1B6", "#A626D3"];

const form = document.getElementById("color-scheme");

function renderScheme() {
  let colorHtml = "";
  let hexCodeHtml = "";
  for (let color of colorArray) {
    colorHtml += `<div class="color" style="background: ${color}" data-hex="${color}"></div>`;
    hexCodeHtml += `<span class="hex" data-hex="${color}">${color}</span>`;
  }
  document.getElementById("colors").innerHTML = `${colorHtml}${hexCodeHtml}`;
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

function copyHex(hexValue) {
  navigator.clipboard.writeText(hexValue);
  document.getElementById(
    "modal-content"
  ).innerText = `You have copied ${hexValue}!`;
  document.getElementById("notification-modal").style.display = "block";
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

document.addEventListener("click", (e) => {
  if (e.target.dataset.hex) {
    copyHex(e.target.dataset.hex);
    setTimeout(() => {
      document.getElementById("notification-modal").style.display = "none";
    }, 2000);
  }
});

renderScheme();
