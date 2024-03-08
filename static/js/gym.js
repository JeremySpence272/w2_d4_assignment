// GYM DATA

// I want to create a class.. this should have day of the week, exercise type (run rest gym), gym should have body parts
class Routine {
    constructor(day, type, bodypart = null) {
        this.day = day
        this.type = type
        this.bodypart = bodypart
    }
}

const exerciseData = {
    "Monday": {
        type: "Gym",
        bodypart: "Chest, Back, & Shoulders"
    },
    "Tuesday": {
        type: "Gym",
        bodypart: "Legs & Arms"
    },
    "Wednesday": {
        type: "Gym",
        bodypart: "Chest, Back, & Shoulders"
    },
    "Thursday": {
        type: "Run"
    },
    "Friday": {
        type: "Gym",
        bodypart: "Legs & Arms"
    },
    "Saturday": {
        type: "Gym",
        bodypart: "Chest, Back, & Shoulders"
    },
    "Sunday": {
        type: "Rest"
    },
}

const exerciseArr = Object.entries(exerciseData).map(([day, exercise]) => {
    let routine = new Routine(day, exercise.type, exercise.bodypart)
    return routine
})


// DOM STUFF

let dayButton = document.getElementById("day")
let typeButton = document.getElementById("type")

let buttons = [dayButton, typeButton]

buttons.forEach((button) => {
    button.classList.add("gym-button")
	button.setAttribute("isActive", "false");
})

dayButton.addEventListener('click', () => {
    toggleActive(dayButton)
    dayButton.getAttribute("isActive") == "true" ? showContent(createDaySortContent()) : hideContent();
}) 

typeButton.addEventListener('click', () => {
    toggleActive(typeButton)
    typeButton.getAttribute("isActive") == "true" ? showContent(createTypeSortContent()) : hideContent();
}) 

function createDaySortContent() {
    let content = document.createElement("ul")
    exerciseArr.forEach((el) => {
        let listItem = document.createElement("li")
        if(el.bodypart) {
            listItem.innerHTML = `${el.day}: Gym Day - ${el.bodypart}`
        } else {
            listItem.innerHTML = `${el.day}: ${el.type} Day`
        }
        content.appendChild(listItem)
    })
    
    return addListStyles(content, "vertical")
}

function filterDataByType() {
    return exerciseArr.reduce((newArr, el) => {
        if(!newArr.hasOwnProperty(el.type)) {
            newArr[el.type] = [] 
        }
        newArr[el.type].push(el)
        return newArr
    }, {})
}

function createTypeSortContent() {
    
    let data = filterDataByType(exerciseArr)
    console.log(data)
    let content = document.createElement("ul")

    Object.keys(data).forEach(type => {
        let list = document.createElement("li")
        let subList = document.createElement("ul")
        let listHeader = document.createElement("h4")
        listHeader.innerHTML = type
        listHeader.classList.add("exercise-type")
        data[type].forEach(routine => {
            let listItem = document.createElement("li")
            listItem.innerHTML = `${routine.day} &nbsp; ${routine.bodypart ?? ""}`
            subList.appendChild(listItem)
        })
        list.appendChild(listHeader)
        list.appendChild(addListStyles(subList, "vertical"))
        content.appendChild(list)
    })


    return addListStyles(content, "horizontal")
}

function toggleActive(button) {
	const isActive = button.getAttribute("isActive") == "true"
	button.setAttribute("isActive", `${!isActive}`)
}
function showContent(content) {
	hideContent()
	document.getElementById("content").appendChild(content)
}

function hideContent() {
	document.getElementById("content").innerHTML = "";
}

function addListStyles(el, style) {
    
    el.classList.add('list-group');
    const listItems = el.querySelectorAll('li');
    listItems.forEach(li => {
        li.classList.add('list-group-item');
    });
    if(style === "horizontal") {
        el.classList.add("list-group-horizontal")
    }
        

    return el
}

