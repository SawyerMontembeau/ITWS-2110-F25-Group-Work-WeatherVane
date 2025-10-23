document.addEventListener('mapReady', (event) => {
  const { regions } = event.detail;

  regions['Mulativ'].setStyle({color: '#FF0000'});
});