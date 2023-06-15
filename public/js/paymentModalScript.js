const makePaymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
const paymentAmountInput = document.getElementById('paymentAmount');
const paymentFeedbackEl = document.getElementById('paymentFormFeedback');
const paymentSubmitButton = document.getElementById('paymentSubmitButton');
const billIdHiddenInput = document.getElementById('billIdHidden');

paymentSubmitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const bill_id = billIdHiddenInput.value;
    const paid_amount = paymentAmountInput.value.trim();
    let errorMsg;
    if (!paid_amount) {
        errorMsg = 'Payment amount missing';
    } else if (paid_amount <= 0) {
        errorMsg = 'Payment must be > 0';
    }
    if (errorMsg) {
        paymentFeedbackEl.textContent = errorMsg;
        return;
    }
    paymentFeedbackEl.textContent = '';
    try {
        const result = await fetch('/api/payments', {
            method: 'POST',
            body: JSON.stringify({ bill_id, paid_amount }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            paymentFeedbackEl.textContent = 'Saving payment failed';
            return;
        }
        makePaymentModal.hide();
    } catch (err) {
        console.log(err);
        paymentFeedbackEl.textContent = 'Saving payment failed';
    }
});

const makePaymentBillInfoEl = document.getElementById('makePaymentBillInfo');
const launchButtons = document.querySelectorAll('button[data-bill-id]');
launchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dueDate = new Date(button.dataset.dueDate)
        makePaymentBillInfoEl.textContent = `${button.dataset.description}, due on ${dueDate.toLocaleDateString()}`
        billIdHiddenInput.value = button.dataset.billId;
        makePaymentModal.show();
    })
})