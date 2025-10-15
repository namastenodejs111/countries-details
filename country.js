const countryName = new URLSearchParams(window.location.search).get('name')
const mapOfCountry = document.querySelector('.country-container .img-anchor')
const flagImage = document.querySelector('.country-container img')
const countryNameValue = document.querySelector('.country-container h2')
const nativeNameValue = document.querySelector('.country-container .nativename')
const population = document.querySelector('.country-container .population')
const region = document.querySelector('.country-container .region')
const subRegion = document.querySelector('.country-container .subregion')
const capital = document.querySelector('.country-container .capital')
const tld = document.querySelector('.country-container .tld')
const currency = document.querySelector('.country-container .currency')
const language = document.querySelector('.country-container .language')
const borders = document.querySelector('.country-container .borders')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
        flagImage.src = data[0].flags.svg
        flagImage.setAttribute('title',`Click to view map of ${data[0].name.common}`)
        mapOfCountry.href = data[0].maps.googleMaps
        countryNameValue.innerText = data[0].name.common
        if (data[0].name.nativeNameValue) {
            nativeNameValue.innerText = data[0].name.nativeName.fra.common
        }
        else {
            nativeNameValue.innerText = data[0].name.common
        }
        population.innerText = data[0].population
        if (data[0].region) {
            region.innerText = data[0].region
        }
        if (data[0].subregion) {
            subRegion.innerText = data[0].subregion
        }
        if (data[0].capital) {
            capital.innerText = data[0].capital
        }
        tld.innerText = data[0].tld[0]
        currency.innerText = Object.values(data[0].currencies).map((currency) => currency.name)
        language.innerText = Object.values(data[0].languages)
        if (data[0].borders) {
            (data[0].borders).map((cntry) => {
                fetch(`https://restcountries.com/v3.1/alpha/${cntry}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.className='border-country'
                        borderCountryTag.href =`http://127.0.0.1:5500/country.html?name=${data[0].name.common}`
                        borderCountryTag.innerText=data[0].name.common
                        borders.append(borderCountryTag)
                })
            })
        }
    })

function darkmode(){
    document.querySelector('body')
}