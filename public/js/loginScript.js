const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginFeedbackEl = document.getElementById('loginFormFeedback');
const loginSubmitButton = document.getElementById('loginSubmit');

loginSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();
    let errorMsg = '';
    if (!username) {
        errorMsg += 'User name is required.  ';
    }
    if (!password) {
        errorMsg += 'Password is required';
    }
    if (errorMsg) {
        loginFeedbackEl.textContent = errorMsg;
        return;
    }
    loginFeedbackEl.textContent = '';

    try {
        const result = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            const { message } = await result.json();
            loginFeedbackEl.textContent
        } else {
            location.assign('/dashboard');
        }
    } catch (err) {
        loginFeedbackEl.textContent = err;
    }
})
