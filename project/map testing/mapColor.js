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

document.addEventListener('mapReady', (event) => {
  const { regions } = event.detail;
  console.log("Hello!");
  for(const region in regionNames) {
    console.log(regionNames[region]);
    regions[regionNames[region]].setStyle({color: '#FF0000'});
  }
  regions['Mulativ'].setStyle({color: '#FF0000'});
});