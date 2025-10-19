const fs = require("fs");


var exFile = fs.readFileSync("../sri_lanka_2013-2022_vertical.csv", "utf8");

var allRows = exFile.split("\n");

var exJSON = {};

for(var i = 1; i < allRows.length; i++){
    var row = allRows[i].split(",");
    var time = row[2];
    var region = row[3];

    var mean_tFInst = row[4];
    var min_tFInst = row[5];
    var max_tFInst = row[6];

    var meanSpecificHumidity = row[7];

    var meanSoilMoisture = row[8];

    var meanCanopyInterception = row[9];

    var meanSurfacePressure = row[10];

    var mean_nvdi = row[11]; 
    var min_nvdi = row[12];
    var max_nvdi = row[13];

    var mean_precip = row[14];
    var min_precip = row[15];
    var max_precip = row[16];

    var numCases = row[17];

    if(!exJSON[time]){
        exJSON[time] = {};
    }

    exJSON[time][region] = {
        meanSpecificHumidity: Math.round(parseFloat(meanSpecificHumidity) * 1000) / 1000,
        meanSoilMoisture: Math.round(parseFloat(meanSoilMoisture) * 1000) / 1000,
        meanCanopyInterception: Math.round(parseFloat(meanCanopyInterception) * 1000) / 1000,
        meanSurfacePressure: Math.round(parseFloat(meanSurfacePressure) * 1000) / 1000,
        airTemp_F: {
            mean: Math.round(parseFloat(mean_tFInst) * 1000) / 1000,
            min: Math.round(parseFloat(min_tFInst) * 1000) / 1000,
            max: Math.round(parseFloat(max_tFInst) * 1000) / 1000
        },
        normVegIndx: {
            mean: Math.round(parseFloat(mean_nvdi) * 1000) / 1000,
            min: Math.round(parseFloat(min_nvdi) * 1000) / 1000,
            max: Math.round(parseFloat(max_nvdi) * 1000) / 1000
        },
        precip: {
            mean: Math.round(parseFloat(mean_precip) * 1000) / 1000,
            min: Math.round(parseFloat(min_precip) * 1000) / 1000,
            max: Math.round(parseFloat(max_precip) * 1000) / 1000
        },
        cases: parseInt(numCases)
    };
}

fs.writeFileSync("sri_lanka.json", JSON.stringify(exJSON, null, 2));

console.log("Finished parsing, JSON created.");