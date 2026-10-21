const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('#country-input');
const statusEl = document.querySelector('#status');
const resultsEl = document.querySelector('#results');

// it Creates the map.
const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker = null;

// To Search for a country.
const findCountry = async (name) => {
    const url = 'https://countries.dev/name/' +
        encodeURIComponent(name);

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('No matching country found.');
        }

        throw new Error('Country request failed.');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error('No matching country found.');
    }

    return data[0];
};

// Displays the country information.
const showCountry = (country) => {
    document.querySelector('#country-name').textContent =
        country.name;

    const flagEl = document.querySelector('#flag');
    flagEl.src = country.flags.svg;
    flagEl.alt = 'Flag of ' + country.name;

    document.querySelector('#capital').textContent =
        'Capital: ' + country.capital;

    document.querySelector('#region').textContent =
        'Region: ' + country.region;

    document.querySelector('#population').textContent =
        'Population: ' + Number(country.population).toLocaleString();

    document.querySelector('#area').textContent =
        'Area: ' + Number(country.area).toLocaleString() + ' km²';

    const languages = country.languages.map(
        language => language.name
    );

    document.querySelector('#languages').textContent =
        'Languages: ' + languages.join(', ');

    const currencies = country.currencies.map(
        currency => currency.name
    );

    document.querySelector('#currencies').textContent =
        'Currencies: ' + currencies.join(', ');

    resultsEl.style.visibility = 'visible';
};

// Move the map to the country.
const showOnMap = (country) => {
    const point = country.latlng;

    map.setView(point, 5);

    if (marker === null) {
        marker = L.marker(point).addTo(map);
    } else {
        marker.setLatLng(point);
    }
};

// Search and display the result.
const searchCountry = async (name) => {
    resultsEl.style.visibility = 'hidden';
    statusEl.textContent = 'Searching...';

    try {
        const country = await findCountry(name);

        showCountry(country);
        showOnMap(country);

        statusEl.textContent = '';

   } catch (error) {
    if (error instanceof TypeError) {
        statusEl.textContent =
            'Could not connect. Check your internet connection and try again.';
    } else {
        statusEl.textContent =
            'Could not load country: ' + error.message;
    }
}

};

// Handle the form.
const handleSearch = (event) => {
    event.preventDefault();

    const name = inputEl.value.trim();

    if (name.length === 0) {
        resultsEl.style.visibility = 'hidden';
        statusEl.textContent = 'Please enter a country name.';
        return;
    }

    searchCountry(name);
};

formEl.addEventListener('submit', handleSearch);