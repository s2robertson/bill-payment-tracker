$(function() {
  var dateFormat = "yy-mm-dd",
    from = $("#from").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      dateFormat: dateFormat
    }).on("change", function() {
      to.datepicker("option", "minDate", getDate(this));
    }),
    to = $("#to").datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 2,
      dateFormat: dateFormat
    }).on("change", function() {
      from.datepicker("option", "maxDate", getDate(this));
    });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
});




const startD = document.getElementById('from');
const endD = document.getElementById('to');
const dateBtn = document.getElementById('dateBtn');
const userId = document.getElementById("user-id").innerText;




dateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const startDate = startD.value.trim();
  const endDate = endD.value.trim();

  const id = userId
  const url = `/query/${id}/${startDate}/${endDate}`;

  window.location.href = url;

  
});

