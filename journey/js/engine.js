
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
    const newUrl = 'url('+images[imgId-1]+')';
    imgContainer.style.backgroundImage = newUrl ; 
    imgContainer.dataset.imgid = imgId;
 
}

async function getProjectImagesNumber(projectId){
    const {images} = await getProjectFromId(projectId);
    return images.length;
}

async function nextImg(projectId){
    const numberOfImages = await getProjectImagesNumber(projectId);
    const actualImgId = getDisplayedImgId();
    const imgToDisplay = (actualImgId < numberOfImages)? actualImgId + 1: 1;
    displayImgWithId(imgToDisplay,projectId);
    setActiveDot(imgToDisplay);
}

async function prevImg(projectId){
    const actualImgId = getDisplayedImgId();
    const imgToDisplay = (actualImgId>1)?actualImgId-1:await getProjectImagesNumber(projectId)
    displayImgWithId(imgToDisplay,projectId);
    setActiveDot(imgToDisplay);
}

function setActiveDot(imgId){
    deactiveDot();
    const dot = document.getElementById(imgId);
    dot.classList.add('circleSelected');
}

function deactiveDot(){
    const selectedDot = document.querySelector(".circleSelected");
    selectedDot.classList.remove('circleSelected');
}

function getDisplayedImgId(){
    const img = document.querySelector('.pictureContainer');
    const currentImgId = img.dataset.imgid;
    return parseInt(currentImgId);
}

async function createProjectModal(element){
    lockPage();
    const projectId = seekProjectId(element);
    const {projectName,projectIcon,images} = await getProjectFromId(parseInt(projectId));
    const modalWindow = createModal(projectName,projectIcon);
    const nextBtn = modalWindow.querySelector(".next");
    nextBtn.addEventListener("click",() => {nextImg(projectId)});
    const prevBtn = modalWindow.querySelector(".prev");
    prevBtn.addEventListener("click", () => {prevImg(projectId)})
    const imageDots = modalWindow.querySelector(".pictureController");
    for(let i = 0; i < images.length ; i++ ){
       const dotElement = generateElement({
            tag:'div',
            classes:['circle'],
            id: i+1
       })
       if (i===0)dotElement.classList.add('circleSelected')
        imageDots.append(dotElement);
    }
    modalWindow.style.top = window.scrollY + "px";
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

async function getProjectFromId(id){
    const obj = await queryAllProjects();
    for (const project of obj.projects) {
        if (project.id === id) return project;
    }
    return null;
}

async function queryAllProjects(){
    const res = await fetch('data/data.json');
    return await res.json();
}

const clickableImg = document.querySelectorAll(".projectImg");
clickableImg.forEach((element) => {
    element.addEventListener("click",() => createProjectModal(element));
});


