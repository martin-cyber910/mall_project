function showMessage(form, msg, type) {
    const box = form.querySelector(".form-message");
    if (!box) return;
    box.textContent = msg;
    box.className = "form-message " + type;
}



const signup = document.getElementById("signupForm");

if (signup) {
    signup.addEventListener("submit", function(e) {
        e.preventDefault();

        let username = signup.username.value.trim();
        let email = signup.email.value.trim();
        let password = signup.password.value;
        let confirm = signup.confirmPassword.value;
        let age = signup.age.value;
        let gender = signup.gender.value;

        if (!username || !email || !password || !confirm || !age || !gender) {
            showMessage(signup, "Please fill all fields.", "error");
            return;
        }

        if (!email.includes("@")) {
            showMessage(signup, "Invalid email.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage(signup, "Password must be at least 6 characters.", "error");
            return;
        }

        if (password !== confirm) {
            showMessage(signup, "Passwords do not match.", "error");
            return;
        }

        let users = [];
        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch (err) {
            users = [];
        }

        if (users.some(u => u.email === email)) {
            showMessage(signup, "Email already exists.", "error");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showMessage(signup, "Account created successfully!", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}



const login = document.getElementById("loginForm");

if (login) {
    login.addEventListener("submit", function(e) {
        e.preventDefault();

        let email = login.email.value.trim();
        let password = login.password.value;

        if (!email || !password) {
            showMessage(login, "Please enter all fields.", "error");
            return;
        }

        let users = [];
        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch (err) {
            users = [];
        }

        if (users.length === 0) {
            showMessage(login, "No account found. Please sign up.", "error");
            return;
        }

        let user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showMessage(login, "Incorrect email or password.", "error");
            return;
        }

        // Save logged-in user to localStorage and cookie
        localStorage.setItem("loggedInUser", user.username);
        document.cookie = "user=" + user.username + "; path=/";

        showMessage(login, "Login successful!", "success");

        setTimeout(() => {
            window.location.href = "HTML/home.html";
        }, 1500);
    });
}



const theme = document.getElementById("theme-style");
const buttons = document.querySelectorAll(".theme-toggle");

let mode = localStorage.getItem("mode") || "light";

if (theme) {
    if (mode === "dark") {
        theme.href = theme.dataset.dark;
    } else {
        theme.href = theme.dataset.light;
    }
}

buttons.forEach(function(btn) {
    btn.onclick = function() {
        if (mode === "light") {
            theme.href = theme.dataset.dark;
            localStorage.setItem("mode", "dark");
            mode = "dark";
        } else {
            theme.href = theme.dataset.light;
            localStorage.setItem("mode", "light");
            mode = "light";
        }
    };
});
