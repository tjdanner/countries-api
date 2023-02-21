const chevronDown = document.querySelector(".fa-chevron-down");
const filterDropdown = document.getElementById("filter-dropdown");
const countriesContainer = document.querySelector('.countries-container');
const countries = document.createElement('div');

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


fetch('https://restcountries.com/v2/all')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        data.forEach(element => {
            const countryDiv = getCountries(element);
            countriesContainer.appendChild(countryDiv);
        })
    })
    .catch(error => {
        console.log(error);
    });

getCountries = (data) => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('countries');
    countryDiv.innerHTML = `<div class="country-flag">
        <img class='flagImg' src="${data.flag}" alt="${data.name} Flag.">
    </div>
    <div class="countries-info">
        <h4>${data.name}</h4>
        <p>Population: ${data.population}</p>
        <p>Region: ${data.region}</p>
        <p>Capital: ${data.capital}</p>
    </div>`;
    return countryDiv;
}