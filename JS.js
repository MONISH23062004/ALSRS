// Show the appropriate form/page based on button clicks
document.getElementById("loginButton").onclick = function() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("citizenPage").classList.add("hidden");
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("newUserForm").classList.add("hidden");
};

document.getElementById("citizenLoginButton").onclick = function() {
    document.getElementById("citizenPage").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("newUserForm").classList.add("hidden");
};

document.getElementById("newUserButton").onclick = function() {
    document.getElementById("newUserForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("citizenPage").classList.add("hidden");
};

// Authenticate User
function authenticateUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        loginError.innerText = "";
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("loginPage").classList.remove("hidden");
        loadPatientRecords(); // Load records on successful login
    } else {
        loginError.innerText = "Invalid username or password";
    }
}

// Register New User
function registerUser() {
    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;
    const newPassword = document.getElementById("newPassword").value;
    const retypePassword = document.getElementById("retypePassword").value;
    const registerError = document.getElementById("registerError");
    const registerSuccess = document.getElementById("registerSuccess");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(org|gov|in|net)$/;
    if (!emailRegex.test(newEmail)) {
        registerError.innerText = "Please enter a valid email with domain .org, .gov, .in, or .net";
        registerSuccess.innerText = "";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[newUsername]) {
        registerError.innerText = "Username already exists";
        registerSuccess.innerText = "";
    } else if (newPassword !== retypePassword) {
        registerError.innerText = "Passwords do not match";
        registerSuccess.innerText = "";
    } else {
        users[newUsername] = { password: newPassword, email: newEmail };
        localStorage.setItem("users", JSON.stringify(users));
        registerError.innerText = "";
        registerSuccess.innerText = "Registration successful! You can now login.";

        document.getElementById("newUsername").value = "";
        document.getElementById("newEmail").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("retypePassword").value = "";
    }
}

// Add new record to the Patient Records table and save it to localStorage
document.getElementById("addRecordButton").onclick = function() {
    const tableBody = document.getElementById("patientRecords");
    const rowCount = tableBody.rows.length;

    const date = new Date().toISOString().slice(0, 10); 
    const time = new Date().toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
    const patientName = prompt("Enter Patient Name:");
    const age = prompt("Enter Age:");
    const sex = prompt("Enter Sex (M/F):");
    const status = prompt("Enter Status:");

    const row = tableBody.insertRow();
    row.insertCell(0).innerText = rowCount + 1;
    row.insertCell(1).innerText = date;
    row.insertCell(2).innerText = time;
    row.insertCell(3).innerText = patientName;
    row.insertCell(4).innerText = age;
    row.insertCell(5).innerText = sex;
    row.insertCell(6).innerText = status;

    const newRecord = { date, time, patientName, age, sex, status };
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    records.push(newRecord);
    localStorage.setItem("patientRecords", JSON.stringify(records));
};

// Load existing records from localStorage on page load
function loadPatientRecords() {
    const tableBody = document.getElementById("patientRecords");
    tableBody.innerHTML = ""; 

    const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    records.forEach((record, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = record.date;
        row.insertCell(2).innerText = record.time;
        row.insertCell(3).innerText = record.patientName;
        row.insertCell(4).innerText = record.age;
        row.insertCell(5).innerText = record.sex;
        row.insertCell(6).innerText = record.status;
    });
}
