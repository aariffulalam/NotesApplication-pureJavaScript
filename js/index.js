// const { json } = require("express/lib/response");

console.log("this is Notes application");


showNotes();


// if user add a note , Add it to the Localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    // console.log(addtxt.value)
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addtxt.value = ""
    // console.log(addtxt)
    console.log(localStorage)

    // this following function is for to show notes
    showNotes();
})

// this is the function to show Notes
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = ""

    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2" style="width: 15.6rem">
          <div class="card-body">
            <h5 class="card-title"> Note ${index + 1}</h5>
            <p>${element}</p>
            <button href="#" id=${index} onclick='deleteNote(this.id)' class="btn btn-primary">delete</button>
          </div>
          </div>`
        //   onclick='deleteNote(this.id)  =>   if anyone will cick the delete button then onclick will call deleteNote functoin by it's id.

    })
    let collection = document.getElementById("notes");
    if (notesObj.length != 0) {
        collection.innerHTML = html;

    } else {
        collection.innerHTML = `Hey coder today write your notes .`
    }
}







// function for delete an item
function deleteNote(index) {
    console.log("this delete function is called")
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
}








//  search sectoin
let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {

    let searchVal = search.value.toLowerCase();
    // console.log(searchVal)

    // 
    let notesCards = document.getElementsByClassName("noteCard");
    // console.log(notesCards)
    Array.from(notesCards).forEach(function (element) {
        // console.log(element);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);

        if (cardTxt.includes(searchVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    })

})