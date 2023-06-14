function buildFormHandler({ fields, feedback, submitButton, submitParams: { path, method = 'POST' }, onSuccess }) {
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let errorMsg = '';
        const values = {};
        fields.forEach(([name, control, msg]) => {
            const val = control.value.trim();
            values[name] = val;
            if (!val) {
                errorMsg += msg + '  ';
            }
        });
        if (errorMsg) {
            feedback.textContent = errorMsg;
            return;
        }
        try {
            const result = await fetch(path, {
                method,
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await result.json();
            if (result.ok) {
                onSuccess(data);
            } else {
                feedback.textContent = data.msg;
            }
        } catch (err) {
            feedback.textContent = err;
        }
    })
}

const loginForm = {
    fields: [
        ['username', document.getElementById('loginUsername'), 'User name is required.'],
        ['password', document.getElementById('loginPassword'), 'Password is required,']
    ],
    feedback: document.getElementById('loginFeedback'),
    submitButton: document.getElementById('loginSubmit'),
    submitParams: {
        path: '',
        method: 'POST'
    },
    onSuccess(data) {

    }
}
