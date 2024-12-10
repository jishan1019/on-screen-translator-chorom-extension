document.addEventListener("mouseup", async (event) => {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    const translatedText = await translateToBangla(selection);
    displayTranslation(selection, translatedText);
  }
});

async function translateToBangla(text) {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|bn`
  );
  const data = await response.json();
  return data.responseData.translatedText;
}

function displayTranslation(original, translated) {
  const overlay = document.createElement("div");
  overlay.className = "translation-overlay";
  overlay.innerHTML = `
      <strong>${translated}</strong>
    `;
  document.body.appendChild(overlay);

  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();

  overlay.style.top = `${window.scrollY + rect.top - overlay.offsetHeight}px`;
  overlay.style.left = `${window.scrollX + rect.left}px`;

  // Remove the overlay when clicking anywhere on the page
  document.addEventListener(
    "click",
    () => {
      overlay.remove();
    },
    { once: true }
  ); // { once: true } ensures the event listener is called only once
}
