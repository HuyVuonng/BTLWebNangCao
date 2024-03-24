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
function dataword() {
    const language = document.getElementById('Language').value;
    const idWordType = document.getElementById('WordTypes').value;
    const word = document.getElementById('Word').value;
    const definition = document.getElementById('Definition').value;
    const languageTrans = document.getElementById('Languagetrans').value;
    const idUser = document.getElementById('Id_user').value;
    const example = document.getElementById('Example').value;
    const wordTrans = document.getElementById('WordTrans').value;
    const idRow = document.getElementById('edit').getAttribute('data-id');
    if (!language || !idWordType || !word || !definition || !languageTrans || !idUser || !example || !wordTrans) {
        alert('Bạn chưa nhập đủ dữ liệu!');
        return; 
    }
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
    const btnadd = document.getElementById("btnAdd");
    const btnaddtext = btnadd.innerText;
    if (btnaddtext.trim() === "Add") {
        let result = [];
        // Tìm từ trong cơ sở dữ liệu
        const searchXhttp = new XMLHttpRequest();
        searchXhttp.onreadystatechange = () => {
            if (searchXhttp.readyState === 4 && searchXhttp.status === 200) {
                result = JSON.parse(searchXhttp.responseText);
                if (result.length === 0) {
                    xhttp.open("POST", "/addNewWord", true);
                    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    xhttp.send(JSON.stringify(data));
                } else {
                    alert('Từ này đã có sẵn trong từ điển! Mời bạn nhập từ mới!')
                }
            }
            else {
                console.log('Error:', searchXhttp.statusText);
            }
        };
        searchXhttp.open(
            "GET",
            `/searchWord?Id_Language=${language}&Id_Language_trans=${languageTrans}&sWord=${word}`,
            true
        );
        searchXhttp.send();
        console.log(result);
    }
    else {
        xhttp.open("POST", "/manager/word/edit", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify(data));
    }
};

function clearData() {
    var a = document.getElementById("clear");
    var b = a.innerText;
    if (b === "Clear") {
        const selects = document.querySelectorAll('select');

        // Lặp qua tất cả các input và select để xóa dữ liệu
        document.getElementById('Word').value = '';
        document.getElementById('Definition').value = '';
        document.getElementById('Example').value = '';
        document.getElementById('WordTrans').value = '';

        selects.forEach(select => {
            select.value = 'disable'; // Chọn giá trị mặc định trong select
        });
    }
    else {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState !== 4 && xhttp.status !== 200) {
                console.log(xhttp.statusText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location = "/manager/word";
            }
        };
        xhttp.open("GET", "/manager/word", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify());
    }
    
}
function getword(){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState !== 4 && xhttp.status !== 200) {
                console.log(xhttp.statusText);
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location = "/manager/word";
            }
        };
        xhttp.open("GET", "/manager/word", true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhttp.send(JSON.stringify());
}

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

    document.getElementById('Language').value = language;
    document.getElementById('Languagetrans').value = languageTrans;
    document.getElementById('WordTypes').value = wordtypes;
    document.getElementById('Id_user').value = idUser;
    document.getElementById('Word').value = word;
    document.getElementById('Example').value = example;
    document.getElementById('Definition').value = definition;
    document.getElementById('WordTrans').value = wordTrans;

    document.getElementById('edit').setAttribute('data-id', idRow);

    document.getElementById('btnAdd').innerHTML = "Update";
    document.getElementById('clear').innerHTML = "Hủy";

    scrolltoTop();
};

function scrolltoTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.querySelector("input#Id_user").value = localStorage.getItem('id')