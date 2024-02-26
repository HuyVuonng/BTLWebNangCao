const btnCTV = document.querySelector("#updateToCTV");
const btnUser = document.querySelector("#toUser");
const popupModal = document.querySelector("#popup-modal");

const openModal = (e) => {
  popupModal.classList.toggle("hidden");
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

const deleteUser = (id) => {
  const dataDelete = {
    Id: id,
  };

  /*if (confirm("Bạn có chắc chắn muốn xóa User này?")) {*/
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState !== 4 && xhttp.status !== 200) {
      console.log(xhttp.statusText);
    } else if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = "/manager/user";
    }
    /*};*/
    xhttp.open("DELETE", "/manager/user/delete", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(dataDelete));
  };
};
