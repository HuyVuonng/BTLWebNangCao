const btnCTV = document.querySelector("#updateToCTV");
const btnUser = document.querySelector("#toUser");
const popupModal = document.querySelector("#popup-modal");

//-----------------------------MANAGER/USER----------------------------------

let dataIDDelete
const openModal = (e) => {
    popupModal.classList.toggle("hidden");
    if (e.target.dataset.id) {
        dataIDDelete = e.target.dataset.id
    }
     e.stopPropagation();


};
const upgradeRole = (id, role) => {
  const dataPost = {
    Id: id,
    SRole: role,
  };
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState !== 4 && xhttp.status !== 200) {
      console.log(xhttp.statusText);
    } else if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = "/manager/user";
    }
  };
  xhttp.open("POST", "/manager/user/upgrade", true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(JSON.stringify(dataPost));
};

const deleteUser = (e) => {
    const dataDelete = {
        Id: dataIDDelete,
    };
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState !== 4 && xhttp.status !== 200) {
            console.log(xhttp.statusText);
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location = "/manager/user";
        }
    };
    xhttp.open("Delete", "/manager/user/delete", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(dataDelete));
    e.stopPropagation()
};

//----------------------------------MANAGER/WORD-----------------------------------------------


//let html1 = "";
//valueLanguages.forEach((e) => {
//    html1 += `<option value=${e.value}>${e.lang}</option>`;
//    selectLanguage1.innerHTML = html1;

//    selectLanguageTran1.innerHTML = html1;

//});


const deleteWord = (id) => {
    const datadelete = {
        Id: id,
    };

    if (confirm("Bạn có chắc chắn muốn xóa Từ này?")) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState !== 4 && xhttp.status !== 200) {
                console.log(xhttp.statusText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location = "/manager/word";
            }
        };
        xhttp.open("DELETE", "/manager/word/delete", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify(datadelete));
    }
};

const getWordById = (event, id) => {
    console.log(event, id)
    const row = event.target.closest('tr');

    const idRow = row.querySelector('#id')?.innerText?.trim();
    const language = row.querySelector('#language').innerText.trim();
    const languageTrans = row.querySelector('#languageTrans').innerText.trim();
    const wordtypes = row.querySelector('#wordtypes').innerText.trim();
    const idUser = row.querySelector('#idUser').innerText.trim();
    const word = row.querySelector('#word').innerText.trim();
    const example = row.querySelector('#example').innerText.trim();
    const definition = row.querySelector('#definition').innerText.trim();
    const wordTrans = row.querySelector('#wordTrans').innerText.trim();

    document.getElementById('selectLanguage').value = language;
    document.getElementById('selectLanguageTran').value = languageTrans;
    document.getElementById('WordTypes').value = wordtypes;
    document.getElementById('Id_user').value = idUser;
    document.getElementById('Word').value = word;
    document.getElementById('Example').value = example;
    document.getElementById('Definition').value = definition;
    document.getElementById('WordTrans').value = wordTrans;

    document.getElementById('btnAdd').innerHTML = "Update";
    scrolltoTop();
};

function scrolltoTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function dataword() {

    const language = document.getElementById('selectLanguage').value;
    const idWordType = document.getElementById('WordTypes').value;
    const word = document.getElementById('Word').value;
    const definition = document.getElementById('Definition').value;
    const languageTrans = document.getElementById('selectLanguageTran').value;
    const idUser = document.getElementById('Id_user').value;
    const example = document.getElementById('Example').value;
    const wordTrans = document.getElementById('WordTrans').value;
    const id = document.querySelector('#id');
    const idRow = id.innerText;
    const data = {
        Id: idRow,
        IdLanguage: language,
        IdLanguageTrans: languageTrans,
        IdWordtype: idWordType,
        IdUser: idUser,
        SWord: word,
        SExample: example,
        SDefinition: definition,
        SWordTrans: wordTrans
    };
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState !== 4 && xhttp.status !== 200) {
            console.log(xhttp.statusText);
        } else if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location = "/manager/word";
        }
    };
    var btnadd = document.getElementById("btnAdd");
    var btnaddtext = btnadd.innerText;
    if (btnaddtext.trim() === "Add") {
        xhttp.open("POST", "/addNewWord", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify(data));
    } else {
        xhttp.open("POST", "/manager/word/edit", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify(data));
    }
};