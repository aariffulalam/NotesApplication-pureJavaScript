// const { json } = require("express/lib/response");

console.log("this is Notes application");


showNotes();


// if user add a note , Add it to the Localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let addTitle = document.getElementById("addTitle");
    // console.log(addtxt.value)
    let notes = localStorage.getItem("notes");
    // console.log(localStorage)

    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes);
        console.log(notesObj)
    }

    // we are creating object for to add title and store text with title in an notesObj array.
    let myObj = {
        title: addTitle.value,
        text: addtxt.value
    }


    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTitle.value = ""
    addtxt.value = ""
    // console.log(addtxt)
    // console.log(localStorage)

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
        html += `<div class=" my-2 mx-2" style="width: 16rem; display: flex;">
                    <div class="card-body">
                        <div class=" noteCard" style="width:14rem; background-color: rgb(196, 182, 182); >
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="form-control noteCard" style = "height: 10rem; width:14rem;"   >
                            <p>${element.text}</p>
                        </div>
                        <div class="my-2">
                            <button href="#" id=${index} onclick='deleteNote(this.id)' class="btn btn-primary">delete</button>
                        </div>
                    </div>
                </div>`
        //   onclick='deleteNote(this.id)  =>   if anyone will cick the delete button then onclick will call deleteNote functoin by it's id.

    })
    let collection = document.getElementById("notes");
    if (notesObj.length != 0) {
        collection.innerHTML = html;

    } else {
        collection.innerHTML = `<p><strong> What are you waiting for write your Notes.<strong></p>`
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





/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 