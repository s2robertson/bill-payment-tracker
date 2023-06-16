const displayDate = document.getElementById('picker-date')

function getURLPortion() {
    const url = window.location.href;
    const portion = url.split('/').slice(-2).join('/');
    return portion;
  }
  
 
  const urlPortion = getURLPortion();


  displayDate.innerHTML= `Payment history for the period of ${urlPortion} `

