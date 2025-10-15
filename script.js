const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('#filter')
const searchCountryByName = document.querySelector('.search-box .search-input')
let allCountriesData

fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,area,flags,currencies,languages")
    .then((res) => res.json())
    .then((data)=>{
        renderCountries(data)
        allCountriesData=data
    })

filterByRegion.addEventListener('change', (event) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then((data)=>{
            renderCountries(data)
        })
})
function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.className = 'country-card'
        countryCard.href = `country.html?name=${country.name.common}`
        const cardHTML = `
                <img src="${country.flags.svg}" alt="${country.flags.alt}">
                <div class="country-details">
                    <h3>${country.name.common}</h3>
                    <p><span>Population:</span>${country.population.toLocaleString()}</p>
                    <p><span>Region:</span> ${country.region}</p>
                    <p><span>Capital:</span> ${country.capital}</p>
                </div>
`
        countryCard.innerHTML = cardHTML
        countriesContainer.append(countryCard)
    })
}

searchCountryByName.addEventListener('input',(event)=>{
    const filterCountry = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    renderCountries(filterCountry)
})