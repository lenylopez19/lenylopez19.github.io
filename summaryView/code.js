
const htmlPosition = document.querySelector(".summaryView");

fetch("data.json")
.then(response => response.json())
.then(data => {
    for(const item of data){
        const div = document.createElement("div");
        div.className = "summaryItem "+item.category.toLowerCase();
        div.innerHTML = '<img class="summaryIcon" src="'+item.icon +'" alt="summary icon"> <span class="summaryItemTitle">'+item.category+'</span> <span class="summaryScore"><strong>'+item.score+'</strong> <span class="ofScore">/ 100</span></span>';
        htmlPosition.appendChild(div);
    }
   const button = document.createElement("button")
   button.innerHTML = "continue"
   htmlPosition.appendChild(button)
})
.catch(error => console.log(error));

