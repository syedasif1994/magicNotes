console.log("Welcome to js")
shownotes();


let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function () {
    let addtxt = document.getElementById('addtxt')
    let notes = localStorage.getItem("notes")

    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }

    noteobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(noteobj));
    addtxt.value = "";
    shownotes();
})

function shownotes() {
    let notes = localStorage.getItem("notes");
    
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }

    let html = "";
    noteobj.forEach(function (element, index) {
        html += `
            <div class="notecards my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">NOTE ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>`;
    })

    let notesEle = document.getElementById("notes")
    if (notes.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = "Nothing";
    }
}

function deletenote(index) {

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes);
    }

    noteobj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(noteobj));
    shownotes()
}

let search = document.getElementById('searchtxt')

search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('notecards')
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText;

        if (cardtxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})