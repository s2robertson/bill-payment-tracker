const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
    try {
        const result = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (result.ok) {
            location.assign('/');
        } else {
            console.log(`Failed to sign out: ${result}`);
        }
    } catch (err) {
        console.log(`Failed to sign out: ${err}`);
    }
})