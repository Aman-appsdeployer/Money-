document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const category = document.getElementById('category_select').value;
        const amount = parseFloat(document.getElementById('amount_input').value);
        const info = document.getElementById('info').value;
        const date = document.getElementById('date_input').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!info) {
            alert('Please enter valid info');
            return;
        }

        if (!date) {
            alert('Please select a date');
            return;
        }

        const expense = { category, amount, info, date };
        updateTotalAmount(expense);

        const newRow = expenseTableBody.insertRow();
        newRow.insertCell().textContent = expense.category;
        newRow.insertCell().textContent = expense.amount;
        newRow.insertCell().textContent = expense.info;
        newRow.insertCell().textContent = expense.date;

        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            removeExpense(expense, newRow);
        });
        deleteCell.appendChild(deleteBtn);
        
        form.reset(); // Reset the form fields
    });

    function updateTotalAmount(expense) {
        let totalAmount = parseFloat(totalAmountCell.textContent) || 0;
        if (expense.category === 'Income') {
            totalAmount += expense.amount;
        } else if (expense.category === 'Expense') {
            totalAmount -= expense.amount;
        }
        totalAmountCell.textContent = totalAmount.toFixed(2);
    }

    function removeExpense(expense, row) {
        let totalAmount = parseFloat(totalAmountCell.textContent) || 0;
        if (expense.category === 'Income') {
            totalAmount -= expense.amount;
        } else if (expense.category === 'Expense') {
            totalAmount += expense.amount;
        }
        totalAmountCell.textContent = totalAmount.toFixed(2);
        expenseTableBody.removeChild(row);
    }
});
