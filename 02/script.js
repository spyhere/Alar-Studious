
    // DATA BASE
    let db = [["Евгений Пономарев", "+380962468671"], ["Lorem ipsum dolor", "+380962468671"], ["Lorem ipsum", "+380962468671"], ["Lorem", "+380962468671"], ["Eugene Ponomarov", "+971508979966"]];   


    // AJAX
    // var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    // const req = new XMLHttpRequest();
    // req.open("GET", '/json/db', true);
    // req.timeout = 10000;
    // req.send();

    // req.onload = () => {
    //     if (req.status !== 200) {
    //         console.log("Error");
    //     } else {
    //         db = JSON.parse(req.responseText);
    //     }
    // }
    // req.onerror = (error) => {
    //     console.error(error);
    // }

    // RENDERING THE LIST
    function buildUp() {

        let table = document.querySelector(".list table");
        if (table.hasChildNodes()) {
            let list = document.querySelector(".list");
            list.removeChild(table);
            list.appendChild(document.createElement("table"));
        }
        
       db.forEach((elem, ind) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `<th>${elem[0]}</th>
                        <th>${elem[1]}</th>
                        <th class="tr__buttons">
                            <button data-index="${ind}" onclick="editFunc(this)">Edit</button>
                            <button data-index="${ind}" onclick="deleteFunc(this)">Delete</button>
                        </th>`;
        document.querySelector("table").appendChild(tr);
        }); 
    }

    buildUp();

    // EDITING
    function editFunc(e) {
        if (!document.querySelectorAll('.input__edit').length || e.innerText === "Save") {
            if (e.innerText === "Edit") {
                e.innerText = "Save";
                e.classList.toggle("save");

                let tr = e.parentNode.parentNode;
                let thName = tr.childNodes[0];
                let thNumber = tr.childNodes[2];

                let inputName = document.createElement("input");
                let inputNumber = document.createElement("input");

                inputName.setAttribute('value', thName.innerText);
                inputName.setAttribute('class', "input__edit");
                inputNumber.setAttribute('value', thNumber.innerText);
                inputNumber.setAttribute('class', "input__edit");

                thName.innerText = '';
                thNumber.innerText = '';

                thName.appendChild(inputName);
                thNumber.appendChild(inputNumber);
            } else {
                saveEdits(e);
            }
        }
    }

    // SAVING CHANGINGS
    function saveEdits(e) {
        let data = document.querySelectorAll('.input__edit');
        let newName = data[0].value;
        let newNumber = data[1].value;

        if (validation(newName, newNumber)) {
            data[0].parentElement.innerHTML = newName;
            data[1].parentElement.innerHTML = newNumber;
            db[e.dataset.index] = [newName, newNumber];

            e.innerText = "Edit";
            e.classList.toggle("save");

            // AJAX
            // req.open("POST", '/json/db', true);
            // req.send(JSON.stringify(db));
        } else {
            warningPopOut(e);
        }
    }

    // DELETING THE PERSON
    function deleteFunc(e) {
        db.splice(e.dataset.index, 1);
        buildUp();

        // AJAX
        // req.open("POST", '/json/db', true);
        // req.send(JSON.stringify(db));
    }

    // CREATING NEW PERSON IN THE LIST
    function createFunc(e) {

        let parent = e.parentElement.parentElement;
        let newName = parent.childNodes[1].childNodes[1];
        let newNumber = parent.childNodes[3].childNodes[1];
        
        if (validation(newName.value, newNumber.value)) {
            db.push([newName.value, newNumber.value]);

            newName.value = '';
            newNumber.value = '';

            buildUp();

            // AJAX
            // req.open("POST", '/json/db', true);
            // req.send(JSON.stringify(db));
        } else {
            warningPopOut(e);
            
        }  
    }

    // VALIDATION FUNCTION
    function validation(newName, newNumber) {
        let validationName = newName.match(/(([a-z]|[A-Z]|[\u0400-\u04FF]|[ ])+){2,}/g); 
        let validationNumber = newNumber.match(/((^[+]|^\d+|[-])([-]|)?(\d{2,}))+/g);

        if (validationName && validationName[0].length === newName.length &&
            validationNumber && validationNumber[0].length === newNumber.length && newNumber.length >= 6) {
            return true;
        } else {
            return false;
        }
    }

    // WARNING POPOUT
    function warningPopOut(e) {
        let warning = document.querySelector(".warning");
            if (warning.style.display === "none") {
                warning.style.display = "block";
                let coordinates = e.getBoundingClientRect();
                warning.style.top = `${coordinates.top - warning.getBoundingClientRect().height - 3}px`;
                warning.style.left = coordinates.left - warning.getBoundingClientRect().width / 4 + "px";
                setTimeout(() => warning.style.display = "none", 4000);
            }
    }