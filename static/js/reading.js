//BOOK DATA

class Book {
	constructor(title, author) {
		this.title = title
		this.author = author
	}
}

let fictionBooks = {
    "Three Body Problem": "Cixin Liu",
    "The Fountainhead": "Ayn Rand",
    "Infinite Jest": "David Foster-Wallace",
    "Zen and Art of Motorcyle Maintenance": "Robert Pirsig"
}

let nonfictionBooks = {
    "Sapiens": "Yuval Noah Harrari",
    "Thinking Fast & Slow": "Daniel Khaneman",
    "Outlive": "Peter Attia",
    "Metabolical": "Robert Lustig",
    "Sovereign Individual": "James Dale Davidson"
}

let onDeckBooks = {
    "Fooled By Randomness": "Nassim Nicholas Taleb",
    "Poor Charlies Almanack": "Charles Munger",
    "Beginning of Infinity": "David Deutsch"
}

let currentBookData = [new Book("The Song of the Cell", "Siddhartha Mukherjee")]

function initData(bookObject) {
	return Object.entries(bookObject).map(([title,author]) => {
		return new Book(title,author)
	})
}

let fictionData = initData(fictionBooks)
let nonfictionData = initData(nonfictionBooks)
let onDeckData = initData(onDeckBooks)

// DOM STUFF

let buttons = [];
let currentButton = document.getElementById("current");
let fictionButton = document.getElementById("fiction");
let nonfictionButton = document.getElementById("nonfiction");
let nextButton = document.getElementById("next");

buttons.push(currentButton);
buttons.push(fictionButton);
buttons.push(nonfictionButton);
buttons.push(nextButton);

buttons.forEach((button) => {
	button.classList.add("book-button")
	button.setAttribute("isActive", "false");

	const buttonDataMapping = {
		"current": currentBookData,
		"fiction": fictionData,
		"nonfiction": nonfictionData,
		"next": onDeckData
	};

	if(buttonDataMapping.hasOwnProperty(button.id)) {
		button.addEventListener('click', () => {
			toggleActive(button)
			button.getAttribute("isActive") == "true" ? showContent(createContent(buttonDataMapping[button.id])) : hideContent()
		})
	}
});

function createContent(data) {
	let content = document.createElement("div")
	data.forEach(book => {
		let label = document.createElement("h3")
		label.innerHTML = `<strong> ${book.title} </strong> &nbsp; <small> by ${book.author} </small>`
		content.appendChild(label)
	})

	return content
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
