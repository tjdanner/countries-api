const chevronDown = document.querySelector(".fa-chevron-down");
const filterDropdown = document.getElementById("filter-dropdown");
const regionBox = document.querySelector(".region");

toggleDropdown = () => {
    if (filterDropdown.style.display === '') {
        filterDropdown.style.display = 'block';
    } else {
        filterDropdown.style.display = '';
    }
    filterDropdown.onmouseleave = e => {
        filterDropdown.style.display = '';
    }
}

chevronDown.onclick = toggleDropdown;