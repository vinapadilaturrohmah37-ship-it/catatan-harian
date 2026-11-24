
// AKUN DEMO
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "12345";

// ELEMEN HTML
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const displayUsername = document.getElementById("displayUsername");
const logoutBtn = document.getElementById("logoutBtn");

const noteInput = document.getElementById("noteInput");
const noteList = document.getElementById("noteList");
const addBtn = document.getElementById("addBtn");


// LOGIN
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let username = usernameInput.value.trim();
    let password = passwordInput.value;

    if (
        username === DEMO_USERNAME &&
        password === DEMO_PASSWORD
    ) {

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("activeUser", username);

        loginMessage.textContent = "";

        showDashboard();

    } else {

        loginMessage.textContent =
            "Username atau password salah!";

    }

});


// TAMPILKAN DASHBOARD
function showDashboard() {

    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

    let activeUser = sessionStorage.getItem("activeUser");

    displayUsername.textContent = activeUser || "";

    showNotes();

}


// LOGOUT
logoutBtn.addEventListener("click", function() {

    let confirmLogout = confirm(
        "Apakah kamu yakin ingin logout?"
    );

    if (confirmLogout) {

        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("activeUser");

        dashboardPage.classList.add("hidden");
        loginPage.classList.remove("hidden");

        loginForm.reset();

        loginMessage.textContent = "";

    }

});


// DATA CATATAN
let notes = JSON.parse(
    localStorage.getItem("dailyNotes")
) || [];


// SIMPAN CATATAN
function saveNotes() {

    localStorage.setItem(
        "dailyNotes",
        JSON.stringify(notes)
    );

}


// TAMBAH CATATAN
function addNote() {

    let value = noteInput.value.trim();

    if (value === "") {

        alert("Silakan isi catatan terlebih dahulu!");

        return;

    }

    notes.push({
        id: Date.now(),
        text: value
    });

    saveNotes();

    noteInput.value = "";

    showNotes();

}


// HAPUS CATATAN
function deleteNote(id) {

    if (!confirm("Yakin ingin menghapus catatan?")) {
        return;
    }

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    saveNotes();

    showNotes();

}


// TAMPILKAN CATATAN
function showNotes() {

    noteList.innerHTML = "";

    if (notes.length === 0) {

        noteList.innerHTML =
            '<p class="empty">Belum ada catatan.</p>';

        return;

    }

    notes.forEach(function(note) {

        let item = document.createElement("div");
        item.className = "note";

        let paragraph = document.createElement("p");
        paragraph.textContent = note.text;

        let button = document.createElement("button");

        button.className = "delete-btn";
        button.textContent = "Hapus";

        button.addEventListener("click", function() {
            deleteNote(note.id);
        });

        item.appendChild(paragraph);
        item.appendChild(button);

        noteList.appendChild(item);

    });

}


// TOMBOL TAMBAH
addBtn.addEventListener("click", addNote);


// CEK LOGIN SAAT APLIKASI DIBUKA
if (
    sessionStorage.getItem("loggedIn") === "true"
) {

    showDashboard();

} else {

    loginPage.classList.remove("hidden");
    dashboardPage.classList.add("hidden");

}
