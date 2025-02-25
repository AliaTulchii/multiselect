
const selectedItems = document.getElementById('selected-items');

const input = document.getElementById('search-input');
const inputBtn = document.getElementById('input-btn');
const dropdown = document.getElementById('dropdown');
const mainCheckbox = document.getElementById('mainCheckbox');
const subCheckboxes = document.querySelectorAll('.checkbox');


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



mainCheckbox.addEventListener('change', function(){
    subCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
        handleCheckboxChange(checkbox);
    });
})

subCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(){
        mainCheckbox.checked = [...subCheckboxes].every(cb => cb.checked);
        handleCheckboxChange(this);
    })
})


input.addEventListener('input', function(){
    const filter = input.value.toLowerCase();
    document.querySelectorAll('.option').forEach((option) => {
        option.style.display = option.textContent.toLowerCase().includes(filter) ? "block" : "none";
    })
})

function handleCheckboxChange(checkbox){
    const value = checkbox.parentElement.parentElement.dataset.value;
    const text = checkbox.closest('label').textContent.trim();

    if(checkbox.checked){
        document.getElementById('text').style.display='none';
        addSelectedItem(value, text);
    }else {
        removeSelectedItem(value);
        if (selectedValues.length === 0) {
            document.getElementById('text').style.display = 'block';
        }
    }
}

function addSelectedItem(value, text){
    if (selectedValues.includes(value)) return;

    const item = document.createElement('div');
    item.classList.add('selected-item');
    item.dataset.value = value;
    item.innerHTML = `${text} <span>&times;</span>`;

    item.querySelector('span').addEventListener('click', function () {
        removeSelectedItem(value);
        document.querySelector(`.option[data-value="${value}"] .checkbox`).checked = false;
        mainCheckbox.checked = false;

        if (selectedValues.length === 0) {
            document.getElementById('text').style.display = 'block';
        }
    });

    selectedValues.push(value);
    selectedItems.prepend(item);
    console.log(selectedValues);
} 


function removeSelectedItem(value) {
    selectedValues = selectedValues.filter(val => val !== value);
    document.querySelector(`.selected-item[data-value="${value}"]`)?.remove();
}


