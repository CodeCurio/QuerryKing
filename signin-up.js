document.getElementById("sign-in-btn").addEventListener("click", function() {
    document.getElementById("intro-container").style.opacity = "0";
    setTimeout(function() {
        document.getElementById("form-container").style.display = "block";
        document.getElementById("form-container").style.opacity = "1";
        document.getElementById("intro-container").style.display = "none";
        document.getElementById("form-heading").innerText = "Sign In";
    }, 1000); // Transition time
});

document.getElementById("sign-up-btn").addEventListener("click", function() {
    document.getElementById("intro-container").style.opacity = "0";
    setTimeout(function() {
        document.getElementById("sign-up-form-container").style.display = "block";
        document.getElementById("sign-up-form-container").style.opacity = "1";
        document.getElementById("intro-container").style.display = "none";
        document.getElementById("sign-up-form-heading").innerText = "Sign Up";
    }, 1000); // Transition time
});

document.getElementById("continue-btn").addEventListener("click", function() {
    // Add your sign-in action here (e.g., form submission)
    alert("Signing In...");
});

document.getElementById("continue-sign-up-btn").addEventListener("click", function() {
    // Add your sign-up action here (e.g., form submission)
    alert("Signing Up...");
});
