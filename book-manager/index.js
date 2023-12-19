let books = [{title:"SDSADDSA", author:"sdadsd"}];

function Book(title, author){
    this.title = title;
    this.author= author;
}

function append_div(book){
    let elem = "<div class='card'><h2>"+book.title+"</h2><h3>"+book.author+"</h3></div>";
    let list = $(".list");
    list.append(elem);
    return
}

for (let i =0; i< books.length;i++){
    append_div(books[i]);
}

const dialog = $(".dialog-box");
let addButton = $(".add-button")[0];
addButton.addEventListener( "click",function(){
    dialog.show();
})

$("dialog .add")[0].addEventListener("click",() =>{
    title = $("#title")[0];
    author = $("#author")[0];
    let new_book = new Book(title.value, author.value);
    console.log(new_book);
    books.push(new_book);
    append_div(new_book);
    dialog.close();
})

$("dialog .close")[0].addEventListener("click", ()=>{
    
})

