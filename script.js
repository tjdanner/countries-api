const chevronDown = document.querySelector(".fa-chevron-down");
const filterDropdown = document.getElementById("filter-dropdown");
const countriesContainer = document.querySelector('.countries-container');
const regions = document.getElementsByClassName('filter-regions');

//Fetch countries data and displays it on the page using the getCountries function:
getCountries = (data) => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('countries');
    countryDiv.innerHTML = `<div class="country-flag">
        <img class='flagImg' src="${data.flag}" alt="${data.name} Flag.">
    </div>
    <div class="countries-info">
        <h5>${data.name}</h5>
        <p>Population: ${data.population}</p>
        <p>Region: ${data.region}</p>
        <p>Capital: ${data.capital}</p>
    </div>`;
    return countryDiv;
}

fetch('https://restcountries.com/v2/all')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const jsonData = data;
        console.log(jsonData);
        data.forEach(element => {
            const countryDiv = getCountries(element);
            countriesContainer.appendChild(countryDiv);
        })
        regions[0].onclick = () => {
            filterRegions(data, 'Africa');
        }; regions[1].onclick = () => {
            filterRegions(data, 'Americas');
        }; regions[2].onclick = () => {
            filterRegions(data, 'Asia');
        }; regions[3].onclick = () => {
            filterRegions(data, 'Europe');
        }; regions[4].onclick = () => {
            filterRegions(data, 'Africa');
        };
    })
    .catch(error => {
        console.log(error);
    });

//Event listeners:
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

for (let i = 0; i < regions.length; i++) {
    regions[i].onmouseover = e => {
        regions[i].style.border = '3px solid black';
        regions[i].onmouseleave = e => {
            regions[i].style.border = '';
        }
    }
};

const countries = document.getElementsByClassName('countries');

filterRegions = (data, region) => {
    for (let i = 0; i < data.length; i++) {
      countries[i].style.display = ''; // reset display property
      if (data[i].region !== region) {
        countries[i].style.display = 'none'; // apply filter
      }
    }
  }

  const searchbar = document.querySelector('.searchbar');

  searchbar.oninput = e => {
    const value = e.target.value;
    console.log(value);
  }