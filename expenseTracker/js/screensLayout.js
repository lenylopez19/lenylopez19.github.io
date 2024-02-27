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
        generateElement({
            tag:'img',
            imgUrl:'assets/categoriesIcons/uberEats.png'
        })
        ,
        generateElement({
            tag:'span',
            classes:['formTitle'],
            textContent:'uber Eat'
        })
        ,
        generateElement({
            tag:'button',
            classes:['addExpense','saveButton'],
            textContent:'Save'
        })
    )
    const form = generateElement({tag:'form',classes:['defaultForm']})
    form.append(
        generateElement({
            tag:'label',
            classes:['defaultLabel'],
            textContent:'Category Name'
        })
        ,
        generateElement({
            tag:'input',
            type:'text',
            id:'categoryName',
            classes:['defaultInput']
        })
        ,
        generateElement({
            tag:'label',
            classes:['defaultLabel'],
            textContent:'Icon'
        })
        ,
        generateElement({
            tag:'input',
            type:'text',
            id:'categoryIcon',
            classes:['defaultInput']
        })
        ,
        generateElement({
            tag:'div',
            classes:['iconBox']
        })
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