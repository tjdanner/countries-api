// DOM elements
const chevronDown = document.querySelector('.fa-chevron-down');
const filterDropdown = document.getElementById('filter-dropdown');
const countriesContainer = document.querySelector('.countries-container');
const regions = document.getElementsByClassName('filter-regions');
let countries = document.getElementsByClassName('countries');
const searchbar = document.querySelector('.searchbar');


// State variables
let countryData = [];
let countryNames;


// Event listeners
const toggleDropdown = () => {
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

for (let i = 0; i < regions.length; i++) {
    regions[i].onmouseover = e => {
        regions[i].style.border = '3px solid black';
        regions[i].onmouseleave = e => {
            regions[i].style.border = '';
        }
    }
};

searchbar.oninput = e => {
    const value = e.target.value.trim().toLowerCase();
    countryData.forEach(country => {
        const isVisible =
            country.name && country.name.toLowerCase().includes(value) ||
            country.capital && country.capital.toLowerCase().includes(value);
        if (isVisible) {
            country.element.style.display = '';
        } else {
            country.element.style.display = 'none';
        }
    })
}

regions[0].onclick = () => {
    filterRegions(countryData, 'Africa');
}; regions[1].onclick = () => {
    filterRegions(countryData, 'Americas');
}; regions[2].onclick = () => {
    filterRegions(countryData, 'Asia');
}; regions[3].onclick = () => {
    filterRegions(countryData, 'Europe');
}; regions[4].onclick = () => {
    filterRegions(countryData, 'Oceania');
};

// Functions
const filterRegions = (data, region) => {
    for (let i = 0; i < data.length; i++) {
        countries[i].style.display = ''; // reset display property
        if (data[i].region !== region) {
            countries[i].style.display = 'none'; // apply filter
        }
    }
}

const getCountries = (data) => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('countries');
    countryDiv.innerHTML = `<div class="country-flag">
        <img class='flagImg' src="${data.flag}" alt="${data.name} Flag.">
    </div>
    <div class="countries-info">
        <h5 class = 'country-names'>${data.name}</h5>
        <p>Population: ${data.population}</p>
        <p>Region: ${data.region}</p>
        <p>Capital: ${data.capital}</p>
    </div>`;
    return countryDiv;
}


// Fetch from countries API
fetch('https://restcountries.com/v2/all')
    .then(res => {
        return res.json();
    })
    .then(data => {
        countryData = data.map(element => {
            const countryDiv = getCountries(element);
            countriesContainer.appendChild(countryDiv);
            return {
                name: element.name,
                region: element.region,
                capital: element.capital,
                element: countryDiv
            }
        })
    })
    .catch(error => {
        console.log(error);
    });


console.log(countryNames);