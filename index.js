import { ratFactsArr } from '/apiData.js';

function* fetchDataGenerator(arr) {
    let maxSections = 10;
    let sectionCount = 0;

    while (sectionCount <= maxSections) {
        sectionCount++;

        // Simulate an asynchronous API call with a promise
        const fakeApiResponse = { sectionText: ratFactsArr[sectionCount] };
        yield new Promise(resolve => setTimeout(() => resolve(fakeApiResponse), 100));
    }

    console.log("Max section limit reached, stopping generator.");
}

const generator = fetchDataGenerator(ratFactsArr);

function handleScroll() {
    const result = generator.next();
    console.log(result)
    if (!result.done) {
        result.value.then(data => {
            // Process and display the data
            const contentSection = document.createElement('section');
            const sectionHeader = document.createElement('h3');
            const sectionTeaser = document.createElement('p');
            sectionHeader.innerText = data.sectionText.heading;
            sectionTeaser.innerText = data.sectionText.teaser;
            contentSection.appendChild(sectionHeader);
            contentSection.appendChild(sectionTeaser);
            document.body.appendChild(contentSection);
        }).catch(error => {
            console.error('Failed to load section:', error);
        })
    } else {
        console.log('No more sections to load.');
    }
}

// Debouncing function
function debounce(func, timeout) {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        setTimeout(() => {
            func.apply(...args)
        }, timeout);
    }
}

// Attach debounced handler to scroll event
document.addEventListener('scroll', debounce(handleScroll));