console.log("Welcome to my library");
//book class
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
    setstorage() {//adding up a book to local storage
        let sname = localStorage.getItem('name');
        let sauthor = localStorage.getItem('author');
        let stype = localStorage.getItem('type');
        if (sname == null) {
            //if local storage is blank
            var namearr = [];
            var authorarr = [];
            var typearr = [];
            
        }
        else {
            //string to object through json 
            var namearr = JSON.parse(sname);
            var authorarr = JSON.parse(sauthor);
            var typearr = JSON.parse(stype);
        }
        //pushing the entered value to array
        namearr.push(this.name);
        authorarr.push(this.author);
        typearr.push(this.type);
        //updating the local storage
        localStorage.setItem('name', JSON.stringify(namearr));
        localStorage.setItem('author', JSON.stringify(authorarr));
        localStorage.setItem('type', JSON.stringify(typearr));
    }
    static showbooks() {//show record on screen
        let sname = localStorage.getItem('name');
        let sauthor = localStorage.getItem('author');
        let stype = localStorage.getItem('type');
        let table = document.getElementById('tablebody');
        //check if anthing is present
        if (sname==null) {
            table.innerHTML="<h3>Added books will be shown here</h3>"
            var namearr = [];
            var authorarr = [];
            var typearr = [];
        }
        else {
            var namearr = JSON.parse(sname);
            var authorarr = JSON.parse(sauthor);
            var typearr = JSON.parse(stype);
        
        let string = ''
        namearr.forEach(function (element, index) {
            string += `<tr>
            <th scope="row">${index+1}.</th>
            <td>${element}</td>
            <td>${authorarr[index]}</td>
            <td>${typearr[index]}</td>
            <td><button type="button" id=${index} onclick="deletetext(this.id)" class="btn btn-danger">Delete</button></td>
          </tr>`
        });
        table.innerHTML = string;
    }
    }
    formvalidation()
    {
        if(this.name.length>2&&this.author.length>2)
        return true;
        else 
        return false;
    }
    
}
function deletetext(index){
    let sname = localStorage.getItem('name');
    let sauthor = localStorage.getItem('author');
    let stype = localStorage.getItem('type');
    if (sname == null) {
        //if local storage is blank
        var namearr = [];
        var authorarr = [];
        var typearr = [];
        
    }
    else {
        //string to object through json 
        var namearr = JSON.parse(sname);
        var authorarr = JSON.parse(sauthor);
        var typearr = JSON.parse(stype);
    }
    namearr.splice(index,1);
    authorarr.splice(index,1);
    typearr.splice(index,1);
    localStorage.setItem('name', JSON.stringify(namearr));
        localStorage.setItem('author', JSON.stringify(authorarr));
        localStorage.setItem('type', JSON.stringify(typearr));
        Book.showbooks()

}

Book.showbooks();//showbook is static function

//adding an event listener to form
let addbookform = document.getElementById('addbookform');
addbookform.addEventListener("submit", onsubmit)
function onsubmit(e) {
    e.preventDefault();
    let bookname = document.getElementById('bookname');
    let authorname = document.getElementById('authorname');
    let radio1 = document.getElementById('Radio1');
    let radio2 = document.getElementById('Radio2');
    let radio3 = document.getElementById('Radio3');
    let typeval;
    if (radio1.checked)
        typeval = radio1.value;
    else if (radio2.checked)
        typeval = radio2.value;
    else
        typeval = radio3.value;
    let newbook = new Book(bookname.value, authorname.value, typeval);
    console.log(newbook);
    addbookform.reset();
    let showmsg=document.getElementById('alertbox');
    if(newbook.formvalidation())
    { 
        showmsg.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You entries are successfully submitted
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
        newbook.setstorage();
        Book.showbooks();
        
     }
    else{
        showmsg.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      
    }
    setTimeout(function(){
      showmsg.innerHTML="";
  }, 2000);
    
}


