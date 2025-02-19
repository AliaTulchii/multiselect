
const selectedItems = document.getElementById('selected-items');

const input = document.getElementById('search-input');
const inputBtn = document.getElementById('input-btn');
const dropdown = document.getElementById('dropdown');

let selectedValues = [];


function showDropdown(){
    dropdown.style.display = 'block';
}

function hideDropdown(e){
    if (!dropdown.contains(e.target) && e.target !== inputBtn && e.target !== input) {
        dropdown.style.display = 'none';
    }
}

inputBtn.addEventListener('click', function(){
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

input.addEventListener('focus', showDropdown);

document.addEventListener('click', hideDropdown);



dropdown.addEventListener('click', function(e){
if (e.target.classList.contains('option')) {
    const value = e.target.dataset.value;
    const text = e.target.textContent;

    if (!selectedValues.includes(value)) {
        selectedValues.push(value);
        selectedItems.style.display = 'flex';
        addSelectedItem(value, text);
    }

    input.value = "";
    hideDropdown(e);
}

})

input.addEventListener('input', function(){
    const filter = input.value.toLowerCase();
    document.querySelectorAll('.option').forEach((option) => {
        option.style.display = option.textContent.toLowerCase().includes(filter) ? "block" : "none";
    })
})

function addSelectedItem(value, text) {
    const item =document.createElement('div');
    item.classList.add('selected-item');
    item.dataset.value = value;
    item.innerHTML = `${text}<span>&times;</span>`;

    item.querySelector('span').addEventListener('click', function(){
        selectedValues = selectedValues.filter(val => val !== value);
        item.remove();
        if (selectedValues.length === 0) {
            selectedItems.style.display = 'none';
        }
        
    })

    selectedItems.appendChild(item);
}

