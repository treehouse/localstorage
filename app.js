const itemForm = document.querySelector('#addItemForm');
const itemInput = document.querySelector('#itemInput');
const itemsContainer = document.querySelector('#itemsContainer');

loadFromLocalStorage();

itemForm.addEventListener('submit', e => {
    e.preventDefault();
    if (itemInput.value !== '') {
        let value = itemInput.value;
        createNewItem(value);
        saveToLocalStorage(value);
        itemInput.value = '';
    }
});

itemsContainer.addEventListener('click', e => {
    deleteItem(e);
});

function loadFromLocalStorage() {
    if (localStorage.items) {
        let listItems = JSON.parse(localStorage.getItem(('items')));
        listItems.forEach(item => {
            createNewItem(item);
        });
    } else {
        let listItems = [];
        localStorage.setItem('items', JSON.stringify(listItems));
    }
}

function createNewItem(value) {
    let newItem = document.createElement('li');
    let itemText = document.createElement('p');
    itemText.textContent = value;
    let deleteIcon = document.createElement('i');
    deleteIcon.classList = 'fa-solid fa-trash-can';
    newItem.appendChild(itemText);
    newItem.appendChild(deleteIcon);
    itemsContainer.appendChild(newItem);
}

function deleteItem(e) {
    let deleteBtns = document.querySelectorAll('i.fa-trash-can');
    deleteBtns.forEach((btn, index) => {
        if (e.target === btn) {
            let value = btn.textContent;
            btn.parentNode.remove();
            removeFromLocalStorage(value);
        }
    });
}

function saveToLocalStorage(newListItem) {
    let listItems = JSON.parse(localStorage.getItem(('items')));
    listItems.push(newListItem)
    localStorage.setItem('items', JSON.stringify(listItems));
}

function removeFromLocalStorage(listItem) {
    let listItems = JSON.parse(localStorage.getItem('items'));
    let itemToRemoveIndex = listItems.indexOf(listItem);
    listItems.splice(itemToRemoveIndex, 1);
    localStorage.setItem('items', JSON.stringify(listItems));
    itemsContainer.innerHTML = '';
    loadFromLocalStorage();
}