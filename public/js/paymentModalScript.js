const makePaymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
const paymentAmountInput = document.getElementById('paymentAmount');
const paymentFeedbackEl = document.getElementById('paymentFormFeedback');
const paymentSubmitButton = document.getElementById('paymentSubmitButton');
const billIdHiddenInput = document.getElementById('billIdHidden');

const paymentDeleteButton = document.getElementById('paymentDeleteButton');
const paymentConfirmDeleteDiv = document.getElementById('paymentConfirmDeleteDiv');
const paymentConfirmDeleteText = document.getElementById('paymentConfirmDeleteText');
const paymentConfirmDeleteButton = document.getElementById('paymentConfirmDeleteButton');

let paymentModalOpenButton;

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

    let path = '/api/payments';
    let method = 'POST';
    let paymentDataEl;
    let paymentData;
    if (paymentModalOpenButton.dataset.paymentInfoId) {
        paymentDataEl = document.getElementById(paymentModalOpenButton.dataset.paymentInfoId);
        paymentData = JSON.parse(paymentDataEl.value);
        path = `/api/payments/${paymentData.id}`;
        method = 'PUT';
    }
    try {
        const result = await fetch(path, {
            method,
            body: JSON.stringify({ bill_id, paid_amount }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            paymentFeedbackEl.textContent = 'Saving payment failed';
        } else {
            const payment = await result.json();
            try {
                if (paymentDataEl) {
                    const outputEl = document.getElementById(`amountPaidPara${paymentData.id}`);
                    outputEl.textContent = `Amount paid: $${paid_amount}`;
                    paymentData.paid_amount = paid_amount;
                    paymentDataEl.value = JSON.stringify(paymentData);
                } else {
                    const billDataEl = document.getElementById(paymentModalOpenButton.dataset.billInfoId);
                    const billData = JSON.parse(billDataEl.value);
                    const paymentListEl = document.getElementById(`paymentList${billData.id}`);
                    paymentListEl.append(buildListItemForPayment(payment));
                }
            } catch(err) {
                console.log(err);
            } finally {
                paymentDeleteButton.classList.add('d-none');
                paymentConfirmDeleteDiv.classList.add('d-none');
                makePaymentModal.hide();
            }
        }
    } catch (err) {
        console.log(err);
        paymentFeedbackEl.textContent = 'Saving payment failed';
    }
});

function buildListItemForPayment(payment) {
    const base = document.createElement('li');
    base.classList.add('list-group-item');

    const paidAmountEl = document.createElement('p');
    paidAmountEl.textContent = `Amount paid: $${payment.paid_amount}`;
    const paidOnEl = document.createElement('p');
    const paidOnDate = new Date(payment.payment_date);
    paidOnEl.textContent = `Paid on ${paidOnDate.toLocaleDateString()}`;
    const paymentInfoHidden = document.createElement('input');
    paymentInfoHidden.id = `paymentInfo${payment.id}`;
    paymentInfoHidden.type = 'hidden';
    paymentInfoHidden.value = JSON.stringify(payment);
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('btn', 'd-block', 'mt-3');
    editButton.textContent = 'Edit Amount';
    editButton.dataset.billInfoId = `billInfo${payment.bill_id}`;
    editButton.dataset.paymentInfoId = `paymentInfo${payment.id}`;
    editButton.addEventListener('click', makePaymentModalOpenListener(editButton));

    base.append(paidAmountEl, paidOnEl, paymentInfoHidden, editButton);
    return base;
}

const makePaymentBillInfoEl = document.getElementById('makePaymentBillInfo');
const paymentModalLaunchButtons = document.querySelectorAll('button[data-bill-info-id]');
paymentModalLaunchButtons.forEach(button => {
    button.addEventListener('click', makePaymentModalOpenListener(button));
});
    
function makePaymentModalOpenListener(button) {
    return () => {
        paymentModalOpenButton = button;
        try {
            const billDataEl = document.getElementById(button.dataset.billInfoId);
            const billData = JSON.parse(billDataEl.value);
    
            if (button.dataset.paymentInfoId) {
                const paymentDataEl = document.getElementById(button.dataset.paymentInfoId);
                const paymentData = JSON.parse(paymentDataEl.value);
                paymentAmountInput.value = paymentData.paid_amount;
                paymentDeleteButton.classList.remove('d-none');
                paymentConfirmDeleteText.textContent = 'Warning: Deleting this bill cannot be undone!';
            } else {
                paymentDeleteButton.classList.add('d-none');
            }
            paymentConfirmDeleteDiv.classList.add('d-none');
    
            const dueDate = new Date(billData.due_date)
            makePaymentBillInfoEl.textContent = `${billData.description}, due on ${dueDate.toLocaleDateString()}`
            billIdHiddenInput.value = billData.id;
            makePaymentModal.show();
        } catch (err) {
            console.log(err);
        }
    }
}

paymentDeleteButton.addEventListener('click', () => {
    paymentConfirmDeleteDiv.classList.remove('d-none');
})

paymentConfirmDeleteButton.addEventListener('click', async () => {
    try {
        if (!paymentModalOpenButton || !paymentModalOpenButton.dataset.paymentInfoId) {
            return;
        }
        const paymentDataEl = document.getElementById(paymentModalOpenButton.dataset.paymentInfoId);
        const paymentData = JSON.parse(paymentDataEl.value);
        const result = await fetch(`/api/payments/${paymentData.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!result.ok) {
            const { message } = await result.json();
            paymentConfirmDeleteText.textContent = message || 'Deleting payment failed.';
        } else {
            paymentModalOpenButton.parentElement.remove();
            makePaymentModal.hide();
        }
    } catch (err) {
        console.log(err);
        paymentConfirmDeleteText.textContent = 'Deleting payment failed.';
    }
})