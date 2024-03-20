import { generateElement } from "./core.js";

function header(headerTitle){
    const heroHeader = generateElement({tag:'header',classes:['heroHeader'],})
    const contentWrapper = generateElement({tag:'div',classes:['contentWrapper']})
    heroHeader.append(contentWrapper)
    contentWrapper.append(getUserSection())
    const windowTitle = generateElement({tag:'h1',classes:['mainTitle'],textContent: headerTitle})
    contentWrapper.append(windowTitle);
    return heroHeader
}
function getContentLayout(){
    const content = generateElement({
        tag:'section',
        classes:['content']
    })
    const contentWrapper = generateElement({
        tag:'div',
        classes:['contentWrapper']
    })
    content.append(contentWrapper);
    return content
}
function getUserSection(){
    const userDetail = generateElement({tag:'section',classes:['userDetails']})
    const username = generateElement({tag:'span',classes:['username'],textContent:"Leny Lopez"})
    const img = generateElement({
        tag:'img',
        classes:['userProfilePicture'],
        imgUrl:'assets/profilePicture/defaultPicture.jpg'
    })
    userDetail.append(username, img)
    return userDetail
}

function renderExpenses(){
    if (this.classList.contains("selected")){
        return
    }
    this.classList.add("selected")
    const incomesBtn = document.querySelector('#showIncomes')
    incomesBtn.classList.remove('selected')
    const categoryDetails = generateElement({tag:'article',classes:['categoryDetails']})
    const categoryDetailsTopBar = generateElement({tag:'section',classes:['categoryDetailsTopBar']})
    categoryDetailsTopBar.append(
        generateElement({tag:'h2',classes:['categoryTitle','expenseColor'],textContent:'Expenses Details'})
    )
    const editBtn = generateElement({tag:'button',classes:['btn','edit']})
    editBtn.append(
        generateElement({tag:'img',imgUrl:'assets/icons/expense.png'}),
        generateElement({tag:'span',textContent:'Edit'})
    )
    categoryDetailsTopBar.append(editBtn)

    const categoryDetailsContent = categoryTitle()
    for (let i=0;i<5;i++){
        const categoryDetailsItem = categoryItem()
        categoryDetailsContent.append(categoryDetailsItem)
    }
    categoryDetails.append(categoryDetailsTopBar,categoryDetailsContent)

    const renderTarget = document.querySelector('.categoryDetails')
    renderTarget.innerHTML= ''
    renderTarget.append(categoryDetails)
    // return categoryDetails
}

function renderIncomes(){
    if(this.classList.contains("selected")){
        return
    }
    this.classList.add("selected")
    const expenseBtn = document.querySelector('#showExpenses')
    expenseBtn.classList.remove('selected')
    const categoryDetails = generateElement({tag:'article',classes:['categoryDetails']})
    const categoryDetailsTopBar = generateElement({tag:'section',classes:['categoryDetailsTopBar']})
    categoryDetailsTopBar.append(
        generateElement({tag:'h2',classes:['categoryTitle','incomeColor'],textContent:'Incomes Details'})
    )
    const editBtn = generateElement({tag:'button',classes:['btn','edit']})
    editBtn.append(
        generateElement({tag:'img',imgUrl:'assets/icons/income.png'}),
        generateElement({tag:'span',textContent:'Edit'})
    )
    categoryDetailsTopBar.append(editBtn)

    const categoryDetailsContent = categoryTitle()
    for (let i=0;i<5;i++){
        const categoryDetailsItem = categoryItem()
        categoryDetailsContent.append(categoryDetailsItem)
    }
    categoryDetails.append(categoryDetailsTopBar,categoryDetailsContent)
    const renderTarget = document.querySelector('.categoryDetails')
    renderTarget.innerHTML= ''
    renderTarget.append(categoryDetails)
    
}
function categoryTitle(){
    const categoryDetailsContent = generateElement({tag:'section',classes:['categoryDetailsContent']})
    const categoryTitleContainer = generateElement({tag:'div',classes:['categoryTitleContainer']})
    categoryTitleContainer.append(
    generateElement({tag:'h3',classes:['categoryTitle'],textContent:'🪴Grass'}),
    generateElement({tag:'span',classes:['categoryTotalAmount'],textContent:'RD$ 13,500'})
    )
    categoryDetailsContent.append(categoryTitleContainer)
    return categoryDetailsContent
}
function categoryItem(){
    const categoryDetailsItem = generateElement({tag:'div',classes:['categoryDetailsItem']})
    const detailItemTitle = generateElement({tag:'h4',classes:['categoryDetailsItemTitle'],textContent:'Orquidea'})
    const detailItemDate = generateElement({tag:'span',classes:['categoryDetailsItemDate'],textContent:'24/12/23'})
    const detailItemAmount = generateElement({tag:'span',classes:['categoryDetailsItemAmount'],textContent:'RD$ 6500'})
    detailItemTitle.append(detailItemDate)
    categoryDetailsItem.append(detailItemTitle,detailItemAmount)
    return categoryDetailsItem
}

function populateDropDown(){

    const MONTHS =[
        {
            id: 1,
            month:'January',
            icon:'assets/icons/01.png'
        },
        {
            id: 2,
            month:'February',
            icon:'assets/icons/02.png'
        },
        {
            id: 3,
            month:'March',
            icon:'assets/icons/03.png'
        },
        {
            id: 4,
            month:'April',
            icon:'assets/icons/04.png'
        },
        {
            id: 5,
            month:'May',
            icon:'assets/icons/05.png'
        },
        {
            id: 6,
            month:'June',
            icon:'assets/icons/06.png'
        },
        {
            id: 7,
            month:'July',
            icon:'assets/icons/07.png'
        },
        {
            id: 8,
            month:'August',
            icon:'assets/icons/08.png'
        },
        {
            id: 9,
            month:'September',
            icon:'assets/icons/09.png'
        },
        {
            id: 10,
            month:'October',
            icon:'assets/icons/10.png'
        },
        {
            id: 11,
            month:'November',
            icon:'assets/icons/11.png'
        },
        {
            id: 12,
            month:'December',
            icon:'assets/icons/12.png'
        },
    ]
    function genDropDownItem(obj){ 
        const itemContainer = generateElement({tag:"div", classes:['itemContainer']})
        itemContainer.append(
            generateElement({tag:'img',imgUrl:obj.icon}),
            generateElement({tag:'div',classes:['defaultItem'],textContent: obj.month}),
        )
        return itemContainer
    }
   
    const dropDown = this
    dropDown.classList.add("open")
    dropDown.style.height = '570px'

    //fetch de data in question, perhaps with a callbackfunction.

    for(let i = 0 ; MONTHS.length; i++){
        dropDown.append(
            genDropDownItem(MONTHS[i])
        )

    }
   
}

function genDropDown(){
    const dropDown = generateElement({tag:'div',classes:['dropDown']})
    const selectedItem = generateElement({tag:'div',classes:['selectedItem']})
    selectedItem.append(
        generateElement({tag:'img',imgUrl:'assets/icons/calendarNormal.png'}),
        generateElement({tag:'div',classes:['defaultItem'],textContent:'December'}),
        generateElement({tag:'div',classes:['arrow']})
    )
    dropDown.append(selectedItem)
    dropDown.addEventListener("click",populateDropDown)
    return dropDown
}

export function showMonthDetail(){
    const view = generateElement({tag:'main',classes:['appWrapper']})
    const heroHeader = header('Month')
    const inHeader = heroHeader.querySelector('.contentWrapper')
    const dropDown = genDropDown()
        //DROP DOWN GENERATION
    
        //END DROP DOWN
    const widgetContainer =  generateElement({tag:'div',classes:['widgetContainer']})
    const totalIncomeWidget = generateElement({tag:'div',classes:['totalWidget','totalIncomeWidget']})
    totalIncomeWidget.append(
        generateElement({tag:'img',imgUrl:'assets/icons/income.png'}),  
        generateElement({tag:'h3',classes:['widgetTitle'],textContent:'Income'}),
        generateElement({tag:'div',classes:['widgetAmount'],textContent:'RD$\n 42,400'})
    )
    const totalExpenseWidget = generateElement({tag:'div',classes:['totalWidget','totalExpenseWidget']})
    totalExpenseWidget.append(
        generateElement({tag:'img',imgUrl:'assets/icons/expense.png'}),
        generateElement({tag:'h3',classes:['widgetTitle'],textContent:'Expenses'}),
        generateElement({tag:'div',classes:['widgetAmount'],textContent:'RD$\n 42,400'})
    )
    widgetContainer.append(totalIncomeWidget,totalExpenseWidget)
    inHeader.append(dropDown,widgetContainer)
    //content
    const content = getContentLayout()
    const inContent = content.querySelector(".contentWrapper")
    const contentTitle = generateElement({tag:'h2',classes:['buttonTitle'],textContent:'View'})
    const categoryButtonContainer = generateElement({tag:'div',classes:['categoryButtonContainer']})
    categoryButtonContainer.append(
        generateElement({id:'showExpenses',tag:'button',classes:['btn','expenseColor','categoryButton'],textContent:'Expenses'}),
        generateElement({id:'showIncomes',tag:'button',classes:['btn','incomeColor','categoryButton'],textContent:'Incomes'})
    )
    const expensesBtn = categoryButtonContainer.querySelector('#showExpenses')
    const incomesBtn = categoryButtonContainer.querySelector('#showIncomes')
    incomesBtn.prepend(generateElement({tag:'img',imgUrl:'assets/icons/income.png'}))
    expensesBtn.prepend(generateElement({tag:'img',imgUrl:'assets/icons/expense.png'}))
    incomesBtn.addEventListener("click",renderIncomes)
    expensesBtn.addEventListener("click",renderExpenses)
    const categoryDetails = generateElement({tag:'article',classes:['categoryDetails']})
    
    
    // let categoryDetailsContent
    // for (let i=0;i<5;i++){
    //     if (i==0){
    //         categoryDetailsContent = categoryTitle()
    //     } 
    //     const categoryDetailsItem = categoryItem()
    //     categoryDetailsContent.append(categoryDetailsItem)
    // }
    
    // categoryDetails.append(categoryDetailsContent)
    inContent.append(contentTitle,categoryButtonContainer,categoryDetails)
    view.append(heroHeader,content)
    // renderExpenses()
    return view
}


export function ShowAddExpense(){
    const app = generateElement({tag:'main',classes:['appWrapper']})
    //header
    const heroHeader = header('Category')
    const inHeader = heroHeader.querySelector('.contentWrapper')
    const dropDown = generateElement({tag:'div',classes:['dropDown']})
    dropDown.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/uberEats.png',}),
        generateElement({tag:'div',classes:['defaultItem'],textContent:'uber Eats'}),
        generateElement({tag:'div',classes:['arrow']})
    )
    const newCategoryWidget = generateElement({
        tag:'div',
        classes:['createNewCategoryWidget']
    })
    newCategoryWidget.append(generateElement({tag:'h4',textContent:'Want to be more specific?'}))
    const createNewCategoryBtn = generateElement({tag:'button',textContent:'+ Create new Category', classes:['createNewCategory','widgetButton']})
    //add event listener to the createNewCategorybtn
    createNewCategoryBtn.addEventListener("click",() =>{
        const app = document.querySelector('main.appWrapper')
        app.innerHTML=""
        app.append(manageCategories())
    },{once:true})
    //
    newCategoryWidget.append(createNewCategoryBtn);
    inHeader.append(dropDown,newCategoryWidget)

    //content
    const contentSection = getContentLayout()
    const inContent = contentSection.querySelector('.contentWrapper')
    const transactionTitleContainer = generateElement({
        tag:'div',
        classes:['addIncomeExpenseTitleContainer']
    })
    transactionTitleContainer.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/uberEats.png'}),
        generateElement({
            tag:'span',
            classes:['addIncomeExpenseTitle'],
            textContent:'Uber Eats'
        })
    )
    const form = generateElement({
        tag:'form',
        classes:['expenseIncomeForm']
    })
    form.append(
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Description'}),
        generateElement({tag:'input',type:'text',id:'expenseDesc',classes:['expenseIncomeInput']}),
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Amount spent'}),
        generateElement({tag:'input',type:'text',id:'amountSpent',classes:['expenseIncomeInput']}),
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Date'}),
        generateElement({tag:'input',type:'date',id:'expenseDate',classes:['expenseIncomeInput','inputDate']}),
    )
    const addButton = generateElement({tag:'button',classes:['addExpense','expenseIncomeButton'],textContent:'Add Expense'})
    addButton.append(generateElement({tag:'img',imgUrl:'assets/icons/expense.png'}))
    //create event listener for add button
    //
    form.append(addButton)
    inContent.append(transactionTitleContainer,form)

    app.append(heroHeader,contentSection)
    return app
}


export function ShowAddIncome(){
    const app = generateElement({tag:'main',classes:['appWrapper']})
    //header
    const heroHeader = header('Category')
    const inHeader = heroHeader.querySelector('.contentWrapper')
    const dropDown = generateElement({tag:'div',classes:['dropDown']})
    dropDown.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/income.png',}),
        generateElement({tag:'div',classes:['defaultItem'],textContent:'Paycheck'}),
        generateElement({tag:'div',classes:['arrow']})
    )
    const newCategoryWidget = generateElement({tag:'div',classes:['createNewCategoryWidget']})
    newCategoryWidget.append(generateElement({tag:'h4',textContent:'Want to be more specific?'}))
    const createNewCategoryBtn = generateElement({tag:'button',textContent:'+ Create new Category', classes:['createNewCategory','widgetButton']})
    //add event listener to the createNewCategorybtn
    createNewCategoryBtn.addEventListener("click",() =>{
        const app = document.querySelector('main.appWrapper')
        app.innerHTML=""
        app.append(manageCategories())
    },{once:true})
    //
    newCategoryWidget.append(createNewCategoryBtn);
    inHeader.append(dropDown,newCategoryWidget)

    //content
    const contentSection = getContentLayout()
    const inContent = contentSection.querySelector('.contentWrapper')
    const transactionTitleContainer = generateElement({
        tag:'div',
        classes:['addIncomeExpenseTitleContainer']
    })
    transactionTitleContainer.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/income.png'}),
        generateElement({
            tag:'span',
            classes:['addIncomeExpenseTitle'],
            textContent:'Paycheck'
        })
    )
    const form = generateElement({
        tag:'form',
        classes:['expenseIncomeForm']
    })
    form.append(
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Description'}),
        generateElement({tag:'input',type:'text',id:'incomeDesc',classes:['expenseIncomeInput']}),
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Income amount'}),
        generateElement({tag:'input',type:'text',id:'incomeSpent',classes:['expenseIncomeInput']}),
        generateElement({tag:'label',classes: ['expenseIncomeLabel'],textContent:'Date'}),
        generateElement({tag:'input',type:'date',id:'incomeDate',classes:['expenseIncomeInput','inputDate']}),
    )
    const addButton = generateElement({tag:'button',classes:['addIncome','expenseIncomeButton'],textContent:'Add Income'})
    addButton.prepend(generateElement({tag:'img',imgUrl:'assets/icons/income.png'}))
    //create event listener for add button
    //
    form.append(addButton)
    inContent.append(transactionTitleContainer,form)

    app.append(heroHeader,contentSection)
    return app
}

export function manageCategories(){
    const app = generateElement({
        tag:'main',
        classes:['appWrapper']
    })
    //header
    const heroHeader = header("Manage\nCategories")
    const inHeader = heroHeader.querySelector('.contentWrapper')
    const manageCategoryWidget = generateElement({tag:'div',classes:['manageCategoryWidget']})
    const newCategoryBtn = generateElement({tag:'button',classes:['widgetButtonMain', 'widgetButton'],textContent:'📝 Create new category'})
    const editCategoryBtn = generateElement({tag:'button',classes:['widgetButtonMain', 'widgetButton'],textContent:'✍️ Edit Existing category'})
    manageCategoryWidget.append(newCategoryBtn,editCategoryBtn)
    inHeader.append(manageCategoryWidget);

    // content
    const contentSection = getContentLayout()
    const inContent = contentSection.querySelector('.contentWrapper')
    const subtext = generateElement({tag:'span',classes:['subtext'],textContent:'Preview'})
    const formTitleContainer = generateElement({tag:'div',classes:['formTitleContainer']})
    formTitleContainer.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/uberEats.png'}),
        generateElement({tag:'span',classes:['formTitle'],textContent:'uber Eat'}),
        generateElement({tag:'button',classes:['addExpense','saveButton'],textContent:'Save'})
    )
    const form = generateElement({tag:'form',classes:['defaultForm']})
    form.append(
        generateElement({tag:'label',classes:['defaultLabel'],textContent:'Category Name'}),
        generateElement({tag:'input',type:'text',id:'categoryName',classes:['defaultInput']}),
        generateElement({tag:'label',classes:['defaultLabel'],textContent:'Icon'}),
        generateElement({tag:'input',type:'text',id:'categoryIcon',classes:['defaultInput']}),
        generateElement({tag:'div',classes:['iconBox']})
    )
    const iconBox = form.querySelector('.iconBox')
    iconBox.append(
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/pedidosYa.png'}),
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/didiFood.png'}),
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/uberEats.png'}),
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/pedidosYa.png'}),
        generateElement({tag:'img',imgUrl:'assets/categoriesIcons/didiFood.png'})
    )
    inContent.append(subtext,formTitleContainer,form)
    
    app.append(heroHeader,contentSection)
    return app
}

export function generateHomeScreen(title){
   return header(title)
}