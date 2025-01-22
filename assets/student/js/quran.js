const loaderContainer = document.querySelector('.loader-container');
function showLoader() {
    loaderContainer.classList.remove('d-none');
}
function hideLoader() {
    loaderContainer.classList.add('d-none');
}

async function GetNameSurah() {
    const { data } = await axios.get(`https://api.alquran.cloud/v1/surah`);
    return data.data;
}
async function displayNameSurah() {
    showLoader();
    const surahNames = await GetNameSurah();
    const result = surahNames.map((surah) => {
        return `
            <div class="card surah-item m-2 text-center">
                <div class="card-body p-2">
                    <a href="#" class="quran-surah text-decoration-none text-dark" data-surah="${surah.number}">
                        <h6 class="mb-0">${surah.name}</h6>
                    </a>
                </div>
            </div>
        `
    }).join('');
    document.querySelector('.surah').innerHTML = result;
    hideLoader();
}
displayNameSurah();

async function GetAyat(surahNumber) {
    const { data } = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
    return data.data;
}
async function displayAyat(surahNumber) {
    showLoader();
    const surahData = await GetAyat(surahNumber);
    document.querySelector('.surah-content').innerHTML = `
        <div class="card p-4 w-100">
            <h3 class="text-center mb-4">${surahData.name}</h3>
            <div class="ayat-list">
                ${surahData.ayahs.map(aya =>`<p class="aya"> 
            <span>(${aya.numberInSurah})</span> ${aya.text}
        </p>`
    ).join('')}
            </div>
        </div>
    `;
    hideLoader();
    document.querySelector('.surah-content').scrollIntoView({ behavior: 'smooth' });
}
document.querySelector('.surah').addEventListener('click', (e) => {
    const surahElement = e.target.closest('.quran-surah');
    if (surahElement) {
        const surahNumber = surahElement.getAttribute('data-surah');
        displayAyat(surahNumber);
    }
});