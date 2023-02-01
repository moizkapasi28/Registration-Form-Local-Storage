const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const address = document.getElementById('address');
const password = document.getElementById('password');
const formerror = document.querySelectorAll('formerror');
const btnSubmit = document.getElementById('btnSubmit');
const btnEdit = document.getElementById('btnEdit');

function validationForm() {
    let returnVal = true;
    if (fullname.value == "") {
        document.getElementsByClassName('formerror')[0].innerHTML = "*Name is empty";
        returnVal = false;
    } else if (fullname.value.length < 5) {
        document.getElementsByClassName('formerror')[0].innerHTML = "*Name is too Short";
        returnVal = false;
    } 
    else if(!/^[a-zA-Z]+[a-zA-Z]+$/.test(fullname.value)){
        document.getElementsByClassName('formerror')[0].innerHTML = "*Please Enter Valid Name";
        returnVal = false;
    }
     else {
        document.getElementsByClassName('formerror')[0].innerHTML = "";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        document.getElementsByClassName('formerror')[1].innerHTML = "*Please Enter Valid Email";
        returnVal = false;
    } else {
        document.getElementsByClassName('formerror')[1].innerHTML = "";
    }
    if (!/^\+?[1-9][0-9]{7,14}$/.test(contact.value)) {
        document.getElementsByClassName('formerror')[2].innerHTML = "*Please Enter Valid Contact Number";
        returnVal = false;
    } else {
        document.getElementsByClassName('formerror')[2].innerHTML = "";
    }
    if (password.value.length < 8 || password.value.length > 15) {
        document.getElementsByClassName('formerror')[4].innerHTML = "*Please Enter Valid Password";
        returnVal = false;
    } else {
        document.getElementsByClassName('formerror')[4].innerHTML = "";
    }
    return returnVal
}
//functon to show data
function showData(list) {
    var list;
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
    let text = "<table style='border: 5px solid black;'>"
    for (i = 0; i < list.length; i++) {
        text += "<tr>";
        text += "<td>" + list[i].fullname + "</td>";
        text += "<td>" + list[i].email + "</td>";
        text += "<td>" + list[i].contact + "</td>";
        text += "<td>" + list[i].address + "</td>";
        text += "<td>" + list[i].password + "</td>";
        text += `<td><button id='btnEdit' onclick='editData(${list[i].id})'>Edit</button></td>`;
        text += `<td><button id='btnEdit' onclick='deleteData(${i})'>Delete</button></td>`;
        text += "</tr>";
    }
    text += "</table>"
    document.getElementById('tbody').innerHTML = text
}
document.onload = showData();
//function to add data
let userStorage = localStorage.getItem('demo') ? JSON.parse(localStorage.getItem('demo')) : [];
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (validationForm()) {
        var list;
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }
        let user = {
            id: list.length,
            fullname: fullname.value,
            email: email.value,
            contact: contact.value,
            address: enCode(address.value),
            password: password.value,
        }
        list.push(user)
        localStorage.setItem("list", JSON.stringify(list));
        showData(list);
        form.reset();
    }
})
//function to edit data
function editData(id) {
    btnSubmit.style.display = "none"
    btnEdit.style.display = "block"
    var list;
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
    let currentUser = list[id]
    document.getElementById('fullname').value = currentUser.fullname;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('contact').value = currentUser.contact;
    document.getElementById('address').value = deCode(currentUser.address);
    document.getElementById('password').value = currentUser.password;

    btnEdit.onclick = (e) => {
        e.preventDefault();
        updateRecord(currentUser.id)
    }
}
function updateRecord(id) {
    if (validationForm()) {
        var list;
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }
        let updateUser = {
            fullname: fullname.value,
            email: email.value,
            contact: contact.value,
            address: enCode(address.value),
            password: password.value,
            id: id
        }
        list[id] = updateUser;
        localStorage.setItem("list", JSON.stringify(list));
        showData(list);
        form.reset();
        btnSubmit.style.display = "block"
        btnEdit.style.display = "none"
    }
}
// function to deleteData
function deleteData(id) {
    var list;
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
    console.log(id)
    let confirmation = confirm('Are you Sure You want to Delete');
    if (confirmation) {
        list.splice(id, 1);
        localStorage.setItem("list", JSON.stringify(list));
        console.log('deleted');
        showData();
        form.reset();
    } else {
        return
    }
}
function enCode(text){
    const entities ={
        "<":"&lt;",
        ">":"&gt;",
        "/":"&#47;",
        ":":"&#58;",
        ".":"&#xb7;",
    };
    let arr = text.split("").map(function(elem){
        if(entities.hasOwnProperty(elem)){
            return entities[elem]; 
        }else{
            return elem;
        }
    });
    return arr.join("") 
}
function deCode(text){
    let txt = new DOMParser().parseFromString(text,"text/html");
    return txt.documentElement.textContent;
}
function showPassword(){
    if(password.type === "password"){
        password.type = "text";
    }else{
        password.type = "password"
    }
}

