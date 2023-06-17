const displayDate = document.getElementById('picker-date')

function getURLPortion() {
    const url = window.location.href;
    const portion = url.split('/').slice(-2).join('/');
    return portion;
  }
  
 
  const urlPortion = getURLPortion();


  displayDate.innerHTML= `Period of ${urlPortion} `



  const addPaymentBtn = document.getElementById('new-payment2');

  addPaymentBtn.addEventListener('click', function() {
    window.location.href = '/dashboard';
  });
