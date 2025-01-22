const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    slidesPerView: 3,
    centeredSlides: true,
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});

function updateTime() {
    const currentTimeElement = document.querySelector('#currentTime');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}


async function getTimeData() {
    const TodayDate = new Date();
    const day = String(TodayDate.getDate()).padStart(2, '0'); 
    const month = String(TodayDate.getMonth() + 1).padStart(2, '0'); 
    const year = TodayDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=Nablus&country=Palestine&method=2`);
    return data.data.timings;
}
async function printTimeData() {
    const timings = await getTimeData();
    document.querySelector('#fajr-time').textContent = timings.Fajr;
    document.querySelector('#dhuhr-time').textContent = timings.Dhuhr;
    document.querySelector('#asr-time').textContent = timings.Asr;
    document.querySelector('#maghrib-time').textContent = timings.Maghrib;
    document.querySelector('#isha-time').textContent = timings.Isha;
}

async function updatePrayerTimes() {
    const timings = await getTimeData();
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    const fajrTime = convertTimeToMinutes(timings.Fajr);
    const dhuhrTime = convertTimeToMinutes(timings.Dhuhr);
    const asrTime = convertTimeToMinutes(timings.Asr);
    const maghribTime = convertTimeToMinutes(timings.Maghrib);
    const ishaTime = convertTimeToMinutes(timings.Isha);

    const prayers = [
        { name: 'الفجر', time: fajrTime },
        { name: 'الظهر', time: dhuhrTime },
        { name: 'العصر', time: asrTime },
        { name: 'المغرب', time: maghribTime },
        { name: 'العشاء', time: ishaTime }
    ];

    let closestPrayer = null;
    let timeRemaining = null;

    for (let i = 0; i < prayers.length; i++) {
        if (currentTimeInMinutes < prayers[i].time) {
            closestPrayer = prayers[i];
            timeRemaining = prayers[i].time - currentTimeInMinutes;
            break;
        }
    }
    if (!closestPrayer) {
        closestPrayer = prayers[0];
        timeRemaining = (1440 - currentTimeInMinutes) + fajrTime;
    }

    const hoursRemaining = Math.floor(timeRemaining / 60);
    const minutesRemaining = timeRemaining % 60;

    document.querySelector('#nextPrayer').textContent = `${closestPrayer.name}`;
    document.querySelector('#timeRemaining').textContent = `${closestPrayer.name} : ${hoursRemaining} ساعة و ${minutesRemaining} دقيقة`;

}

function convertTimeToMinutes(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

setInterval(updateTime, 1000);
updatePrayerTimes();
setInterval(updatePrayerTimes, 60000);
getTimeData();
printTimeData();