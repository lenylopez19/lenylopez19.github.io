
function generateElement(obj) {
    const { tag, type, id, value, classes, textContent, imgUrl } = obj;
    const newElement = document.createElement(tag);
    if (type) newElement.type = type;
    if (value) newElement.value = value;
    if (id) newElement.setAttribute("id", id);
    if (textContent) newElement.innerText = textContent;
    if (imgUrl) newElement.setAttribute("src",imgUrl);
    if (classes) {
      for (const _class of classes) {
        newElement.classList.add(_class);
      }
    }
    return newElement;
  }

function createModal(title,logoUrl){
    const modalWindow = generateElement(
        {
            tag:'div',
            classes:['projectCard','glassCard'],
            id:'imageViewerCard',
        }
    );
    const closeBtn = generateElement({
        tag:'button',
        classes:['closeBtn','hoverable'],
        textContent:'X'
    })
    closeBtn.addEventListener("click",closeModal);
    modalWindow.append(closeBtn);

    const modalHeader = generateElement(
        {
            tag:'section',
            classes:['subSectionTitleContainer']
        }
    );
    modalHeader.append(generateElement({
        tag:'img',
        classes:['projectLogo'],
        imgUrl:logoUrl
    }))
    modalHeader.append(generateElement({
        tag:'h3',
        classes:['projectName'],
        textContent:title
    }))
    modalHeader.append(generateElement({
        tag:'button',
        classes:['projectButton', 'prev', 'hoverable'],
        textContent:'< prev'
    }))
    modalHeader.append(generateElement({
        tag:'button',
        classes:['projectButton', 'next' , 'hoverable'],
        textContent:'Next >'
    }))
    modalWindow.append(modalHeader);

    const slideController = generateElement(
        {
            tag:'section',
            classes:['pictureController']
        }
    )
    modalWindow.append(slideController);

    const pictureContainer = generateElement(
        {
            tag:'section',
            classes:['pictureContainer']
        }
    )
    modalWindow.append(pictureContainer);

    return modalWindow;
}

function lockPage(){
    document.body.style.overflow = "hidden";
}
function unlockPage(){
    document.body.style.overflow = "auto";
}

function closeModal(){
    const modal = document.getElementById("imageViewerCard");
    modal.remove();
    unlockPage();
}


async function displayImgWithId(imgId,projectId){
    const imgContainer = document.querySelector(".pictureContainer");
    const {images} = await getProjectFromId(projectId);
    console.log(imgContainer);
    const newUrl = 'url('+images[imgId-1]+')';

    imgContainer.style.backgroundImage = newUrl ; 

    imgContainer.dataset.imgid = imgId;
 
}

async function getMaxProjectImages(projectId){
    const {images} = await getProjectFromId(projectId);
    return images.length;
}

async function nextImg(projectId){
    const numberOfImages = await getMaxProjectImages(projectId);
    const actualImgId = getDisplayedImgId();
    if (actualImgId < numberOfImages){
        const imgToDisplay = actualImgId + 1;
        displayImgWithId(imgToDisplay,projectId);
        setActiveDot(imgToDisplay);
    }
}

function prevImg(projectId){
    const actualImgId = getDisplayedImgId();
    if (actualImgId > 1){
        const imgToDisplay = actualImgId - 1;
        displayImgWithId(imgToDisplay,projectId);
        setActiveDot(imgToDisplay);
    }
}

function setActiveDot(imgId){
    deactiveDot();
    const dot = document.getElementById(imgId);
    dot.classList.add('circleSelected');
}

function deactiveDot(){
    const dotController = document.querySelectorAll(".circle");
    console.log(dotController);
    dotController.forEach(circle => {
        if(circle.classList.contains("circleSelected")){
            circle.classList.remove('circleSelected');
            return;
        }     
    });
}

function getDisplayedImgId(){
    const img = document.querySelector('.pictureContainer');
    const currentImgId = img.dataset.imgid;
    return parseInt(currentImgId);
}

async function createProjectModal(element){
    //conseguir el id del projecto que se clicko la foto
    const projectId = seekProjectId(element);
    //fetchear la data del projecto

    const {projectName,projectIcon,images} = await getProjectFromId(parseInt(projectId));
    // const projectData = await getProjectFromId(parseInt(projectId));
    // console.log(projectData);

    //enviarle los parametros del nombre y el icono a la funcion createModal
    const modalWindow = createModal(projectName,projectIcon);
    //por ahora agregarle los eventos a los botones de next y prev
    const nextBtn = modalWindow.querySelector(".next");
    nextBtn.addEventListener("click",() => {nextImg(projectId)});
    const prevBtn = modalWindow.querySelector(".prev");
    prevBtn.addEventListener("click", () => {prevImg(projectId)})
    //popular el widget de image selector
    const imageDots = modalWindow.querySelector(".pictureController");
    // console.log(images);
    for(let i = 0; i < images.length ; i++ ){
       const dotElement = generateElement({
            tag:'div',
            classes:['circle'],
            id: i+1
       })
       if (i===0)dotElement.classList.add('circleSelected')
        imageDots.append(dotElement);
    }
    lockPage();
    modalWindow.style.top = window.scrollY + "px";
    //mostrar una imagen por default en el picture content.
    const pictureContainer = modalWindow.querySelector('.pictureContainer');
    pictureContainer.style.backgroundImage = "url("+images[0]+")";
    pictureContainer.dataset.imgid = 1;
    document.body.appendChild(modalWindow);
}

function seekProjectId(elem){
    while(!elem.dataset.projectid){
        elem = elem.parentElement;
    }
    return parseInt(elem.dataset.projectid);
}

function figmaDesignsModal(){
    const modalWindow = createModal('Ui designs','../assets/icons/figma.png');
    const nextButton = modalWindow.querySelector('.next');
    // console.log(nextButton);
    nextButton.addEventListener('click',function(){
        alert('muy duro men');
    });
    const pictureCont = modalWindow.querySelector('.pictureContainer');
    return modalWindow;
}

async function getProjectFromId(id){
    const obj = await queryAllProjects();
    for (const project of obj.projects) {
        if (project.id === id) return project;
    }
    return null;
}

async function queryAllProjects(){
    const res = await fetch('../data/data.json');
    return await res.json();
}

// async function getImages(){
//     const imagesResponse = await fetch('../data/data.json');
//     const project = await imagesResponse.json();
//     return project;
// }

const clickableImg = document.querySelectorAll(".projectImg");
clickableImg.forEach((element) => {
    element.addEventListener("click",() => createProjectModal(element));
});


