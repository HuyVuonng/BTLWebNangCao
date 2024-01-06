// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const searchInput = document.querySelector("#search-input");
const searchBTN = document.querySelector("#search-button");
const result = document.querySelector("#result");
const word = document.querySelector("#word");
const type = document.querySelector("#type");
const definition = document.querySelector("#definition");
const example = document.querySelector("#example");
const laban = document.querySelector("#laban");
const selectLanguage = document.querySelector("#selectLanguage");
const selectLanguageTran = document.querySelector("#selectLanguageTran");
const phonetic = document.querySelector("#phonetic");

const valueLanguages = [
  {
    value: 1,
    lang: "Tiếng Việt",
  },
  {
    value: 2,
    lang: "Tiếng Anh",
  },
];
let html = "";
valueLanguages.forEach((e) => {
  html += `<option value=${e.value}>${e.lang}</option>`;
  selectLanguage.innerHTML = html;
  if (e.value !== 1) {
    selectLanguageTran.innerHTML = `<option value=${e.value}>${e.lang}</option>`;
  }
});

const searchClick = async () => {
  const wordSearch = searchInput.value;
  clear();
  // search Db

  // search api Anh-Anh
  if (selectLanguage.value === "2" && selectLanguageTran.value === "2") {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`
    );
    if (res.status === 200) {
      const data = await res.json();
      word.innerHTML = data[0].word;
      phonetic.innerHTML = data[0].phonetic ? data[0].phonetic : "";
      type.innerHTML = data[0].meanings[0].partOfSpeech;
      definition.innerHTML = data[0].meanings[0].definitions[0].definition;
      example.innerHTML =
        data[0].meanings[0].definitions[0].example ||
        data[0].meanings[0].definitions[1].example ||
        "";
      laban.classList.add("hidden");
    } else {
      laban.classList.remove("hidden");
    }
  } else {
    laban.classList.remove("hidden");
  }
};

const clear = () => {
  word.innerHTML =
    type.innerHTML =
    definition.innerHTML =
    example.innerHTML =
    phonetic.innerHTML =
      "";
  laban.classList.add("hidden");
};

// Event
searchBTN.addEventListener("click", searchClick);
selectLanguage.addEventListener("change", () => {
  let html = "";
  clear();
  if (selectLanguage.value === "1") {
    const newValueLang = valueLanguages.filter((e) => e.value !== 1);
    newValueLang.forEach((e) => {
      html += `<option value=${e.value}>${e.lang}</option>`;

      selectLanguageTran.innerHTML = html;
    });
  } else {
    valueLanguages.forEach((e) => {
      html += `<option value=${e.value}>${e.lang}</option>`;
      selectLanguageTran.innerHTML = html;
    });
  }
});
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (searchInput.value) searchClick();
  }
});
