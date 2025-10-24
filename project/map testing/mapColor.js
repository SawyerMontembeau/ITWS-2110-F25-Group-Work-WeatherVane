import Color from "https://colorjs.io/dist/color.js"

const regionNames = {};
regionNames.Ampara = "Ampāra";
regionNames.Anuradhapura = "Anurādhapura";
regionNames.Badulla = "Badulla";
regionNames.Batticaloa = "Maḍakalapuva";
regionNames.Colombo = "Kŏḷamba";
regionNames.Galle = "Gālla";
regionNames.Gampaha = "Gampaha";
regionNames.Hambantota = "Hambantŏṭa";
regionNames.Jaffna = "Yāpanaya";
regionNames.Kalutara = "Kaḷutara";
regionNames.Kandy = "Mahanuvara";
regionNames.Kegalle = "Kægalla";
regionNames.Kilinochchi = "Kilinŏchchi";
regionNames.Kurunegala = "Kuruṇægala";
regionNames.Mannar = "Mannārama";
regionNames.Matale = "Mātale";
regionNames.Matara = "Mātara";
regionNames.Moneragala = "Mŏṇarāgala";
regionNames.Mullaitivu = "Mulativ";
regionNames.NuwaraEliya = "Nuvara Ĕliya";
regionNames.Polonnaruwa = "Pŏḷŏnnaruva";
regionNames.Puttalam = "Puttalama";
regionNames.Ratnapura = "Ratnapura";
regionNames.Trincomalee = "Trikuṇāmalaya";
regionNames.Vavuniya = "Vavuniyāva";

const from = new Color("rgb(0 0 255)");
const to = new Color("rgb(255 0 0)");
  
const mixed = from.mix(to, mapTo(293.243, 303.235, 293.243));
console.log("Color mix:", mixed.to("srgb").toString({ format: "hex" }));

function mapTo(min, max, x) {
  return (x - min) / (max - min)
}

document.addEventListener('dataReady', (event) => {
  console.log("dataReady! Coloring regions...");
  const { regions } = event.detail;
  const { jsonData } = event.detail;

  console.log("HELLO FROM MAPCOLOR");
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  const data315 = jsonData["315.0"];
  for (const [region, data] of Object.entries(data315)) {
      if (parseFloat(data["airTemp_F"]["mean"]) < min) {
        min = data["airTemp_F"]["mean"];
      }
      else if (parseFloat(data["airTemp_F"]["mean"]) > max) {
        max = data["airTemp_F"]["mean"];
      }
      console.log(region, data["airTemp_F"]["mean"]);
  }
  console.log("MIN >>",min);
  console.log("MAX >>",max);

  const from = new Color("rgb(0 0 255)");
  const to = new Color("rgb(255 0 0)");
    
  for (const [region, data] of Object.entries(data315)) {
      const x = parseFloat(data["airTemp_F"]["mean"]);
      const mixed = from.mix(to, mapTo(min, max, x));
      console.log(region, data["airTemp_F"]["mean"]);
      regions[regionNames[region]].setStyle({color: mixed.to("srgb").toString({ format: "hex" })});
  }

});