let books = [];

function Book(title, author, read){
    this.title = title;
    this.author= author;
    this.read = read;
}

function append_div(book,id){
    let bookRead = $("#read:checked").val()? "checked" : "";
    console.log(bookRead);
    let elem = "<div class='card' id='book"+id+"'><h2>"+book.title+"</h2><h3>"+book.author+"</h3><label>Read </label><input type=checkbox "+bookRead+"></input><br><button class='remove-button'>remove</button></div>";
    let list = $(".list");

    list.append(elem);
    $(".remove-button")[id-1].addEventListener("click",()=>{
        $("#book"+id).remove();
        books.pop(id);
    });
    // console.log($("#read:checked").val());
    return
}

const dialog = document.querySelector("dialog");
let addButton = $(".add-button")[0];
addButton.addEventListener( "click",()=>{
    dialog.showModal();
});

$("dialog .add")[0].addEventListener("click",() =>{
    title = $("#title")[0];
    author = $("#author")[0];
    let new_book = new Book(title.value, author.value);
    // console.log(new_book);
    books.push(new_book);
    let id = books.length;
    append_div(new_book,id);
    dialog.close();
})

$("dialog .close")[0].addEventListener("click", ()=>{
    dialog.close();
})

