let geojsonData;
let geojsonLayer;
const regions = {}; // Stores a reference to each region layer in dictionary. Keys are names (of each region), and values are layer references.

async function loadMap() {
    try {
        const response = await fetch('lk.json');
        geojsonData = await response.json();

        geojsonLayer = L.geoJSON(geojsonData, {
            onEachFeature: function(feature, layer) {
                const name = feature.properties.name;
                if (name) {
                    regions[name] = layer;
                }
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup('<strong>' + feature.properties.name + '</strong>');
                }
            }
        }).addTo(map);

    // Coloring
    geojsonLayer.eachLayer(layer => {
        const name = layer.feature.properties.name;
        let color = '#4CAF50';
        layer.setStyle({
            color: color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.1
        });
    });

    document.dispatchEvent(
        new CustomEvent('mapReady', { detail: { regions, geojsonLayer } })
    );
    
    } catch (error) {
        console.error('Error loading GeoJSON file:', error);
    }
}

loadMap();