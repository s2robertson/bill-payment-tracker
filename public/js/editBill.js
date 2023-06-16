const submitPathHidden = document.getElementById('submitPathHidden');
const submitMethodHidden = document.getElementById('submitMethodHidden');
const billDescriptionInput = document.getElementById('billDescription');
const dueDateInput = document.getElementById('dueDate');
const totalDueInput = document.getElementById('totalDue');
const minimumDueInput = document.getElementById('minimumDue');
const billFormFeedbackEl = document.getElementById('billFormFeedback');
const billSubmitButton = document.getElementById('billSubmitButton');

billSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const path = submitPathHidden.value;
    const method = submitMethodHidden.value;
    const description = billDescriptionInput.value.trim();
    const due_date = dueDateInput.value.trim();
    const total_due = totalDueInput.value.trim();
    const minimum_due = minimumDueInput.value.trim();

    let errorMsg = '';
    if (!description) {
        errorMsg = 'Description missing.  ';
    }
    if (!due_date) {
        errorMsg += 'Due date missing.  ';
    }
    if (!total_due) {
        errorMsg += 'Total due missing.  ';
    }
    if (!minimum_due) {
        errorMsg += 'Minimum due missing.  ';
    }
    console.log(`errorMsg = ${errorMsg}`);
    if (errorMsg) {
        billFormFeedbackEl.textContent = errorMsg;
        return;
    }
    billFormFeedbackEl.textContent = '';

    try {
        console.log(`Beginning fetch`);
        const result = await fetch(path, {
            method,
            body: JSON.stringify({ description, due_date, total_due, minimum_due }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            billFormFeedbackEl.textContent = 'Saving bill failed.'
        } else {
            location.assign('/dashboard');
        }
    } catch (err) {
        console.log(err);
        billFormFeedbackEl.textContent = 'Saving bill failed.';
    }
});