const dogBreed = document.getElementById('dogBreed');
const dogPic = document.getElementById('dogPic');
const loader = document.getElementById('loader');

// fetch breed list from API
async function init() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    console.log(data);

    // create option in select menu for each breed
    for (let breed in data.message) {
        const option = document.createElement('option');
        option.value = breed;
        option.innerText = breed;
        dogBreed.appendChild(option);
    }
    // event listener for selected breed
    dogBreed.addEventListener('change', handleBreedChange);

    dogPic.addEventListener('load', function () {
        dogPic.classList.add('show');
        loader.classList.remove('show');
    });
}
async function handleBreedChange(event) {
    const breed = event.target.value;
    // make sure dogPic is hidden and loader is shown initially.
    dogPic.classList.remove('show');
    loader.classList.add('show');

    // fetch random image of selected breed
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();
    console.log(data);

    // set src of dogPic to the fetched image URL
    dogPic.src = data.message;

    // make sure photo displays and loader is hidden
    dogPic.classList.remove('hidden');
    dogPic.classList.add('show');
    loader.classList.remove('show');
}


init();