// ****** Select items ******
const form = document.getElementById('form');
const grocery = document.getElementById('grocery-item');
const submitBtn = document.getElementById('submit-btn');
const list = document.querySelector('.grocery-list');
const container = document.querySelector('.grocery-list');

const clearBtn = document.getElementById('clear-btn');

// const form = document.getElementById('#form');
// Variables
let editItem;
let edit = false;
let editList = "";

// ******* Event listeners ******

form.addEventListener('submit', addItems)
clearBtn.addEventListener('click', clearGrocery);
// ******* Functions *********


// add Items 
function addItems(e) {
    e.preventDefault();
    const value = grocery.value;
    
    // Creating an id from milliseconds of date
    const id = new Date().getTime().toString();
    // console.log(id);

    // Validation
    if(value && !edit){
        // Create Items in the UI
        createItems(id, value);
        // Show Alert
        displayAlert('Grocery successfully added!', 'success');
       
        // Set Back To Default
        setBackToDefault();
    }
    else if(value && edit){
        // editGrocery();
        // createItems(id, value);
        setBackToDefault();
        console.log('edited....');
    }
    else {
        displayAlert('Kindly add grocery please!', 'danger');
        console.log('empty value....');
    }
}

// creat Items
function createItems(id, value){
    // Creation of article element
    const element = document.createElement('article');

    // Add classlist of list-items
    element.classList.add('list-items');

    // Create Attr
    element.setAttribute('data-id', id);
    element.innerHTML = `<p id="grocery" class="items">${value}</p>
        <div class="grocery-btn">
            <button type="button" class="btn edit" id="remove-btn">edt</button>
            <button type="button" class="btn delete" id="remove-btn">del</button>
        </div>`;
    // Add classlist
    container.classList.add('show-list');
    // insert before the clear button
    container.insertBefore(element, clearBtn);
    
    // Targetting both edit and delete buttons
    const Btns = element.querySelectorAll('#remove-btn');
    Btns.forEach(function(btn) {
        if(btn.classList.contains('edit')){
            if(element.dataset.id === id){
               element.querySelector('#grocery').textContent = grocery.value;
               btn.addEventListener('click', editGrocery);
            }
           
        };

        if(btn.classList.contains('delete')){
            btn.addEventListener('click', deleteGrocery);
        };
        const groceryItems = element.querySelectorAll('#grocery');
        groceryItems.forEach(function(item){
          if(item.textContent === value){
            //  // Add To Local Storage
            addToLocalStorage(id, value);
          }
        })
      
    })
}

// Create alert
function displayAlert(text, classList){
    const alert = document.getElementById('alert');
    alert.textContent = text;
    alert.classList = classList;
    return alert;
    // setTimeout(function(){
    //     alert.remove(text);
    //     alert.classList.remove(classList);
    // },1500);
} 


// Set back to default
function setBackToDefault(){
    grocery.value = "";
    edit = false;
    editList = "";
    submitBtn.textContent = 'Submit';
}

// Delete Button
function deleteGrocery(e){
    e.currentTarget.parentElement.parentElement.remove();
    displayAlert('Successfully deleted grocery...', 'success');
    setBackToDefault();
}

// Edit Item
function editGrocery(e){
    let groceryVal = e.currentTarget.parentElement.previousElementSibling.textContent; 
    grocery.value = groceryVal;
    edit = true;
    submitBtn.textContent = 'Edit';
    submitBtn.style.color = 'black';
    displayAlert('Succcefully edited....', 'success');
}

function clearGrocery(e){
    e.currentTarget.parentElement.remove('show-list');
    displayAlert('Groceries Cleared.....', 'cleared');
    setBackToDefault();
    // windowReload();
}

function windowReload(){
    window.location.reload();
}


// **********Local Storage ********

// Add To Local Storage
function addToLocalStorage(id, value){
    let listItems;

    if(localStorage.getItem('listItems') === null){
        listItems = [];
    }else{
        listItems = JSON.parse(localStorage.getItem('listItems'));
        listItems.push({id, value});
        return listItems;
    }
    
    
   
    localStorage.setItem('listItems', JSON.stringify({id, value}));

    
    console.log({id, value});
}