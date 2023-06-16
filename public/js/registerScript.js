const usernameInput = document.getElementById('signupUsername');
const emailInput = document.getElementById('signupEmail');
const passwordInput = document.getElementById('signupPassword');
const submitButton = document.getElementById('signupSubmit');
const feedbackEl = document.getElementById('signupFormFeedback');

submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let errorMsg = '';
    if (!username) {
        errorMsg += 'Login id is required.  ';
    }
    if (!email) {
        errorMsg += 'Email is required.  ';
    }
    if (!password) {
        errorMsg += 'Password is required.';
    }
    if (errorMsg) {
        feedbackEl.textContent = errorMsg;
        return;
    }
    feedbackEl.textContent = '';

    try {
        const result = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            const { message } = await result.json();
            feedbackEl.textContent = message;
        } else {
            location.assign('/dashboard');
        }
    } catch (err) {
        feedbackEl.textContent = err;
    }
})