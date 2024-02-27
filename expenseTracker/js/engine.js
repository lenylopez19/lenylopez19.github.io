import { manageCategories, generateHomeScreen, ShowAddExpense, ShowAddIncome } from "./screensLayout.js";

const app = document.querySelector('.appWrapper')
// app.innerHTML = ""
// app.append(manageCategories("Manage\nCategories"))
// app.append(ShowAddExpense())
// app.append(ShowAddIncome())


const addExpense = document.querySelector('#addExpense')
addExpense.addEventListener('click',() =>{
    app.innerHTML = ""
    app.append(ShowAddExpense())
})

const addIncome = document.querySelector('#addIncome')
addIncome.addEventListener('click',() =>{
    app.innerHTML = ""
    app.append(ShowAddIncome())
})