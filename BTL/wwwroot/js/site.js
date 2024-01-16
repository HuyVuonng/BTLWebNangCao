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
    value: 2,
    lang: "Tiếng Việt",
  },
  {
    value: 1,
    lang: "Tiếng Anh",
  },
];
let html = "";
valueLanguages.forEach((e) => {
  html += `<option value=${e.value}>${e.lang}</option>`;
  selectLanguage.innerHTML = html;
  if (e.value !== 2) {
    selectLanguageTran.innerHTML = `<option value=${e.value}>${e.lang}</option>`;
  }
});

const searchClick = () => {
  const wordSearch = searchInput.value;
  clear();
  let result = [];
  // search Db
  const dataSearch =
    "Id_Language=" +
    selectLanguage.value +
    "&Id_Language_trans=" +
    selectLanguageTran.value +
    "&sWord=" +
    wordSearch;

  $.ajax({
    type: "get",
    url: "searchWord",
    data: dataSearch,
    success: function (data) {
      result = data;
      handleSearch(result);
    },
    error: function (e) {
      aler(e);
    },
  });
};

const handleSearch = async (result) => {
  if (result.length > 0) {
    word.innerHTML = result[0].sWord;
    if (selectLanguageTran.value === "1" && selectLanguage.value === "1") {
      console.log("here");
      result[0].sWordtype = result[0].sWordtype = "Danh từ"
        ? "noun"
        : (result[0].sWordtype = "Động từ")
        ? "verb"
        : (result[0].sWordtype = "Tính từ")
        ? "adjective"
        : "Adverb";
    }
    type.innerHTML = result[0].sWordtype;
    definition.innerHTML = result[0].sDefinition;
    example.innerHTML = result[0].sExample;
  } else if (selectLanguage.value === "1" && selectLanguageTran.value === "1") {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`
    );
    if (res.status === 200) {
      const data = await res.json();
      word.innerHTML = data[0].word;
      phonetic.innerHTML = data[0].phonetic ? data[0].phonetic : "";
      type.innerHTML =
        data[0].meanings[0]?.partOfSpeech ||
        data[0].meanings[1]?.partOfSpeech ||
        data[1].meanings[0]?.partOfSpeech;
      definition.innerHTML =
        data[0].meanings[0]?.definitions[0].definition ||
        data[0].meanings[1]?.definitions[0].definition ||
        data[1].meanings[0]?.definitions[0].definition;
      example.innerHTML =
        data[0].meanings[0]?.definitions[0].example ||
        data[0].meanings[1]?.definitions[0].example ||
        data[0].meanings[1]?.definitions[1]?.example ||
        data[1].meanings[0]?.definitions[0]?.example ||
        "";
      laban.classList.add("hidden");
      const typeID =
        type.innerHTML === "noun"
          ? 2
          : type.innerHTML === "verb"
          ? 1
          : type.innerHTML === "adjective"
          ? 3
          : 4;
      const dataString =
        "Id_Language=" +
        1 +
        "&Id_Language_trans=" +
        1 +
        "&Id_wordtype=" +
        typeID +
        "&Id_user=" +
        1 +
        "&sWord=" +
        word.innerHTML +
        "&sExample=" +
        example.innerHTML +
        "&sDefinition=" +
        definition.innerHTML;
      $.ajax({
        type: "post",
        url: "addNewWord",
        data: dataString,
        error: function ($e) {
          aler($e);
        },
      });
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
  if (selectLanguage.value === "2") {
    const newValueLang = valueLanguages.filter((e) => e.value !== 2);
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
