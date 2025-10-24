console.log("HELLO FROM DATA LOADER");
let jsonData;
let parsedJSON;

async function loadData() {
    try {
        const response = await fetch('../resources/sri_lanka.json'); // May need to revisit this linking / replace with absolute linking
        jsonData = await response.json();


    document.dispatchEvent(
        new CustomEvent('dataReady', { detail: { jsonData, regions, geojsonLayer } })
    );
    
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

document.addEventListener('mapReady', (event) => {
    console.log("mapReady! Loading sri_lanka.json data...");
    loadData();
});