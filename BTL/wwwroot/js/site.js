// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const searchInput = document.querySelector("#search-input");
const searchBTN = document.querySelector("#search-button");
const listSearch = document.querySelector("#list_search");
const result = document.querySelector("#result");
const word = document.querySelector("#word");
const wordTrans = document.querySelector("#wordTrans");
const type = document.querySelector("#type");
const definition = document.querySelector("#definition");
const example = document.querySelector("#example");
const laban = document.querySelector("#laban");
const selectLanguage = document.querySelector("#selectLanguage");
const selectLanguageTran = document.querySelector("#selectLanguageTran");
const phonetic = document.querySelector("#phonetic");
const HomeTab = document.querySelector("#HomeTab");
const ManagerWordTab = document.querySelector("#ManagerWordTab");
const ManagerUserTab = document.querySelector("#ManagerUserTab");
const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");

const setTabActive = () => {
  if (window.location.pathname === "/") {
        HomeTab.classList.add("active");
    } else if (window.location.pathname.includes("/manager/user")) {
      ManagerUserTab.classList.add("active");
     
  } else if (window.location.pathname === "/manager/word") {
    ManagerWordTab.classList.add("active");
  } else if (window.location.pathname === "/Home/Login") {
      loginBtn.classList.add("active");
    }
  else if (window.location.pathname === "/Home/Register") {
      registerBtn.classList.add("active");
  }
};


const guardRole = () => {
    const roleLoginCheck = localStorage.getItem("role") ? localStorage.getItem("role") : ""
    if (window.location.pathname === "/manager/user") {
        if (roleLoginCheck !== "Admin") {
            location.replace("/")

        }
    } else if (window.location.pathname === "/manager/word") {
        if (roleLoginCheck !== "Admin" && roleLoginCheck !== "CTV") {
            location.replace("/")
        }
    }
}

guardRole();


setTabActive();
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
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      result = JSON.parse(xhttp.responseText);
        /*handleSearch(result);*/
        console.log(result);
    }
  };
  xhttp.open(
    "GET",
    `searchWord?Id_Language=${selectLanguage.value}&Id_Language_trans=${selectLanguageTran.value}&sWord=${searchInput.value}`,
    true
  );
    xhttp.send();
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
    wordTrans.innerHTML = result[0].sWordTrans;
  } else if (selectLanguage.value === "1" && selectLanguageTran.value === "1") {
    const wordSearch = searchInput.value;
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`
    );
    if (res.status === 200) {
      const data = await res.json();
      word.innerHTML = data[0].word;
      phonetic.innerHTML = data[0].phonetic ? data[0].phonetic : "none";
      type.innerHTML =
        data[0]?.meanings[0]?.partOfSpeech ||
        data[0]?.meanings[1]?.partOfSpeech ||
        data[1]?.meanings[0]?.partOfSpeech;
      definition.innerHTML =
        data[0]?.meanings[0]?.definitions[0].definition ||
        data[0]?.meanings[1]?.definitions[0].definition ||
        data[1]?.meanings[0]?.definitions[0].definition;
      example.innerHTML =
        data[0]?.meanings[0]?.definitions[0].example ||
        data[0]?.meanings[1]?.definitions[0].example ||
        data[0]?.meanings[1]?.definitions[1]?.example ||
        data[1]?.meanings[0]?.definitions[0]?.example ||
        "none";
      laban.classList.add("hidden");
      const typeID =
        type.innerHTML === "noun"
          ? 2
          : type.innerHTML === "verb"
          ? 1
          : type.innerHTML === "adjective"
          ? 3
          : 4;

      const dataPost = {
        IdLanguage: 1,
        IdLanguageTrans: 1,
        IdWordtype: typeID,
        IdUser: 1,
        SWord: word.innerHTML,
        SExample: example.innerHTML,
        SDefinition: definition.innerHTML,
        SWordTrans: "",
      };
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState !== 4 && xhttp.status !== 200) {
          console.log(xhttp.statusText);
        }
      };
      xhttp.open("POST", "addNewWord", true);
      xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhttp.send(JSON.stringify(dataPost));
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
    wordTrans.innerHTML =
      "";
  laban.classList.add("hidden");
};

const handlePreSearch = () => {
  listSearch.innerHTML = "";

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const data = JSON.parse(xhttp.responseText);
      if (data.length > 0) {
        let html = "";
        data.forEach((result) => {
          html += `<div class='resultPreSearch w-full h-9 p-4' onclick="searchByResultSearch('${result.sWord}','${selectLanguage.value}','${selectLanguageTran.value}')">${result.sWord}</div>`;
        });
        listSearch.innerHTML = html;
      } else {
        listSearch.innerHTML = "";
      }
    }
  };
  xhttp.open(
    "GET",
    `preSearchWord?Id_Language=${selectLanguage.value}&Id_Language_trans=${selectLanguageTran.value}&sWord=${searchInput.value}`,
    true
  );
  xhttp.send();
};

const searchByResultSearch = (word, lang, langtrans) => {
  clear();
  searchInput.value = word;
  handlePreSearch();
  let result = [];
  // search Db
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(xhttp.responseText);
      result = JSON.parse(xhttp.responseText);
      handleSearch(result);
    }
  };
  xhttp.open(
    "GET",
    `searchWord?Id_Language=${lang}&Id_Language_trans=${langtrans}&sWord=${word}`,
    true
  );
  xhttp.send();
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
  if (searchInput.value) {
    handlePreSearch();
    searchClick();
  }
});

selectLanguageTran.addEventListener("change", () => {
  if (searchInput.value) {
    handlePreSearch();
    searchClick();
  }
});

let idTimeOut;
searchInput.addEventListener("keyup", (e) => {
  clearTimeout(idTimeOut);
  if (e.keyCode === 13) {
    if (searchInput.value) {
      searchClick();
      listSearch.classList.add("hidden");
    }
  } else {
    idTimeOut = setTimeout(() => {
      handlePreSearch();
    }, 800);
  }
});

const searchForcus = () => {
  listSearch.classList.remove("hidden");
};
const searchOutForcus = () => {
  setTimeout(() => {
    listSearch.classList.add("hidden");
  }, 300);
};
