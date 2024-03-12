const LogoutBtn = document.querySelector("#LogoutBtn");
const CTV = document.querySelectorAll(".CTV");
const Admin = document.querySelectorAll(".admin");

const roleLogin = localStorage.getItem("role") ? localStorage.getItem("role") : ""

if (roleLogin) {
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    LogoutBtn.classList.remove('hidden')
}

if (roleLogin === "CTV") {
    CTV.forEach(e => {
        e.classList.remove("hidden")
    })
} else if (roleLogin === "Admin") {
    Admin.forEach(e => {
        e.classList.remove("hidden")
    })
}

LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem("role")
    window.location.reload();
})