document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const typewriterText = document.querySelector(".typewriter");

    // Step 1: Show initial typewriter animation, then show form smoothly
    setTimeout(() => {
        gsap.to(typewriterText, {
            duration: 1,
            y: -50,
            ease: "power2.out",
        });

        gsap.fromTo(
            feedbackForm,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.5,
                ease: "power3.out",
            }
        );
    }, 2200);

    // Step 2: Handle form submission
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        // First, hide the initial typewriter text quickly
        gsap.to(typewriterText, {
            duration: 0.5, // Faster disappearance
            opacity: 0,
            onComplete: () => {
                typewriterText.style.display = "none"; // Fully hide after fading out

                // Then fade out the form quickly
                gsap.to(feedbackForm, {
                    duration: 0.6, // Faster disappearance
                    opacity: 0,
                    onComplete: () => {
                        feedbackForm.style.display = "none"; // Hide form after animation completes

                        // Show the thank-you message with typing animation
                        const thankYouText = document.createElement("div");
                        thankYouText.classList.add("thank-you-text");
                        thankYouText.textContent = "Thank you for your feedback!";
                        typewriterText.parentElement.appendChild(thankYouText);

                        // Apply the typing animation class
                        thankYouText.classList.add("typing-animation");

                        // Redirect to the main page after showing thank you message
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 3000); // 3-second delay
                    }
                });
            }
        });
    });
});
