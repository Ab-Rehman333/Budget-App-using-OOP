class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }
    submitBudgetForm() {
        const budgetFromValue = this.budgetInput.value;
        if (budgetFromValue === "" || budgetFromValue < 0) {
            this.budgetFeedback.classList.add("showItem")
            this.budgetFeedback.innerHTML = `<p>Value Cannot be empty or less than zero</p>`
            const self = this;
            setTimeout(() => {
                self.budgetFeedback.classList.remove("showItem")
            }, 4000);
        } else {
            this.budgetAmount.textContent = budgetFromValue;
            this.budgetInput.value = ""
            this.showBalance()

        }
    }
    showBalance() {
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if (total < 0) {
            this.balance.classList.remove("showGreen", "showBlack")
            this.balance.classList.add("showRed")
        }
        else if (total > 0) {
            this.balance.classList.remove("showRed", "showBlack")
            this.balance.classList.add("showGreen")
        }
        else if (total === 0) {
            this.balance.classList.remove("showGreen", "showRed")
            this.balance.classList.add("showBlack")
        }


    }
    totalExpense() {
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce((acc, curr) => {
                acc += curr.amount;
                return acc
            }, 0)
        }
        this.expenseAmount.textContent = total;
        return total;
    }
    submitExpenseFrom() {
        const expenseValue = this.expenseInput.value;
        const amoutValue = this.amountInput.value;
        if (expenseValue === "" || amoutValue === "" || amoutValue < 0) {
            this.expenseFeedback.classList.add("showItem")
            this.expenseFeedback.innerHTML = `<p>Value Cannot be empty or less than zero</p>`
            const self = this;
            setTimeout(() => {
                self.expenseFeedback.classList.remove("showItem")
            }, 4000);
        } else {
            const amount = parseInt(amoutValue)
            this.expenseInput.value = ""
            this.amountInput.value = ""


            let expense = {
                id: this.itemID,
                title: expenseValue,
                amount: amount
            }
            this.itemID++;
            this.itemList.push(expense)
            this.addExpens(expense)
            this.showBalance()
        }


    }
    addExpens(expense) {
        const parentEl = document.createElement("div")
        parentEl.classList.add("expense")
        parentEl.innerHTML = `
        
        
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
            <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
            <div class="expense-icons list-item">
                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
                </a>
            </div>
       </div>        
        `;
        this.expenseList.appendChild(parentEl)
    }
    editExpense(element){
        let id = parseInt(element.dataset.id);
        let parent= element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);

        // removing from an list 
        let expense = this.itemList.filter(item => item.id === id)
        let tempExpense = this.itemList.filter(item => item.id !== id)

        this.expenseInput.value = expense[0].title;
        this.expenseAmount.value = expense[0].amount;

        this.itemList = tempExpense;
        this.showBalance()

    }
    deleteExpense(element){
        let id = parseInt(element.dataset.id);
        let parent= element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let tempExpense = this.itemList.filter(item => item.id !== id)
        this.itemList = tempExpense;
        this.showBalance()


    }


}
function listeners() {
    const budgetForm = document.querySelector("#budget-form")
    const expenseForm = document.querySelector("#expense-form")
    const expenseList = document.querySelector("#expense-list")




    // calling the class 
    const callingClass = new UI();



    // events 
    budgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        callingClass.submitBudgetForm()
    })
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        callingClass.submitExpenseFrom()
    })
    expenseList.addEventListener("click", (e) => {
        const targetE = e.target.parentElement;
        if (targetE.classList.contains("edit-icon")) {
            callingClass.editExpense(targetE);
        } else if (targetE.classList.contains("delete-icon")) {
            callingClass.deleteExpense(targetE)
        }

    })
}



window.addEventListener("DOMContentLoaded", () => {
    listeners();
})

