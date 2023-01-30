const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const address = document.getElementById('address');
const password = document.getElementById('password');
const formerror = document.querySelectorAll('formerror');
const btnSubmit = document.getElementById('btnSubmit');
const btnEdit = document.getElementById('btnEdit');


function validationForm(){
    let returnVal = true;
    if(fullname.value==""){
        document.getElementsByClassName('formerror')[0].innerHTML="*Name is empty"
        returnVal=false;
    }
    else if(fullname.value.length<5){
        document.getElementsByClassName('formerror')[0].innerHTML="*Name is too Short"
        returnVal=false;
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        document.getElementsByClassName('formerror')[1].innerHTML="*Please Enter Valid Email"
        returnVal=false;
    }
    if(!/^\+?[1-9][0-9]{7,14}$/.test(contact.value)){
        document.getElementsByClassName('formerror')[2].innerHTML = "*Please Enter Valid Contact Number"
        returnVal=false;
    }
    if(password.value.length<8||password.value.length>15){
        document.getElementsByClassName('formerror')[4].innerHTML = "*Please Enter Valid Password";
        returnVal=false;
    }
    return returnVal
}
//functon to show data
function showData(){
    var list;
    if(localStorage.getItem("list") == null){
        list=[];
    }
    else{
        list = JSON.parse(localStorage.getItem("list"));
    }
    var html="";
    list.forEach(function(element,index){
        html+="<tr>";
        html+="<td>"+element.fullname+"</td>"
        html+="<td>"+element.email+"</td>"
        html+="<td>"+element.contact+"</td>"
        html+="<td>"+element.address+"</td>"
        html+="<td>"+element.password+"</td>"
        html+=`<td><button id='btnEdit' onclick='editData(${element.id})'>Edit</button></td>`
        html+=`<td><button id='btnDelete' onclick='deleteData(${index})'>Delete</button></td>`
        html+="</tr>"
    });
    document.querySelector('#datatable tbody').innerHTML = html;
}
document.onload = showData();

//function to add data

let userStorage = localStorage.getItem('demo')?JSON.parse(localStorage.getItem('demo')):[];
btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(validationForm() ){
    var list;
    if(localStorage.getItem("list") == null){
        list=[];
    }
    else{
        list = JSON.parse(localStorage.getItem("list"));
    }
        let user ={
            id:list.length,
            fullname:fullname.value,
            email:email.value,
            contact:contact.value,
            address:address.value,
            password:password.value,
        }
        list.push(user)
        localStorage.setItem("list",JSON.stringify(list))
        showData();
        form.reset();
    }
})
//function to edit data
function editData(id){
    btnSubmit.style.display = "none"
    btnEdit.style.display = "block"
    var list;
    if(localStorage.getItem("list") == null){
        list=[];
    }
    else{
        list = JSON.parse(localStorage.getItem("list"));
    }
    let currentUser = list[id]
    console.log(currentUser)
    document.getElementById('fullname').value = currentUser.fullname;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('contact').value = currentUser.contact;
    document.getElementById('address').value = currentUser.address;
    document.getElementById('password').value = currentUser.password;

    btnEdit.onclick=(e)=>{
        e.preventDefault();
        updateRecord(currentUser.id)
    }

}
function updateRecord(id){
    var list;
    if(localStorage.getItem("list") == null){
        list=[];
    }
    else{
        list = JSON.parse(localStorage.getItem("list"));
    }
    let updateUser = {
            fullname: fullname.value,
            email: email.value,
            contact: contact.value,
            address: address.value,
            password: password.value,
            id: id
    }
    list[id]=updateUser;
    localStorage.setItem("list",JSON.stringify(list));
    showData();
    form.reset();
    btnSubmit.style.display = "block"
    btnEdit.style.display = "none"
}
// function to deleteData
function deleteData(id){
    var list;
    if(localStorage.getItem("list") == null){
        list=[];
    }
    else{
        list = JSON.parse(localStorage.getItem("list"));
    }
    console.log(id)
    let confirmation = confirm('Are you Sure You want to Delete');
    if(confirmation){
        list.splice(id,1);
        localStorage.setItem("list",JSON.stringify(list));
        console.log('deleted');                       
        showData();
        form.reset();
    }
    else{
        return 
    }
    
}
