const scheduleReminderModal = new bootstrap.Modal(document.getElementById('scheduleReminderModal'));
const reminderDatePicker = document.getElementById('reminderDatePicker');
const reminderFeedbackEl = document.getElementById('reminderFormFeedback');
const reminderSubmitButton = document.getElementById('reminderSubmitButton');
const reminderBillIdHiddenInput = document.getElementById('reminderBillIdHidden');

// let reminderModalOpenButton;

reminderSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const bill_id = reminderBillIdHiddenInput.value;
    const scheduled_date = reminderDatePicker.value;
    let errorMsg;
    if (!scheduled_date) {
        errorMsg = 'Date missing';
    }
    if (errorMsg) {
        reminderFeedbackEl.textContent = errorMsg;
        return;
    }
    reminderFeedbackEl.textContent = '';

    try {
        const result = await fetch('/api/reminders', {
            method: 'POST',
            body: JSON.stringify({ bill_id, scheduled_date }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            reminderFeedbackEl.textContent = 'Saving reminder failed';
        } else {
            scheduleReminderModal.hide();
        }
    } catch (err) {
        console.log(err);
        reminderFeedbackEl.textContent = 'Saving reminder failed';
    }
});

const reminderModalDueDateEl = document.getElementById('reminderModalDueDate');
const reminderModalLaunchButtons = document.querySelectorAll('button[data-reminder-bill-id]');
reminderModalLaunchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dueDate = new Date(button.dataset.dueDate);
        reminderModalDueDateEl.textContent = `Due on ${dueDate.toLocaleDateString()}`;

        const defaultReminderDate = new Date(dueDate);
        defaultReminderDate.setDate(defaultReminderDate.getDate() - 1);
        reminderDatePicker.value = defaultReminderDate.toISOString().substring(0, 10);
        
        reminderBillIdHiddenInput.value = button.dataset.reminderBillId;
        scheduleReminderModal.show();
    })
})