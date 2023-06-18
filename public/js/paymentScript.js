// date picker
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



// getting data to render filter payments
const startD = document.getElementById('from');
const endD = document.getElementById('to');
const dateBtn = document.getElementById('dateBtn');
const userId = document.getElementById("user-id").innerText;

dateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const startDate = new Date(startD.value.trim());
  const endDate = new Date(endD.value.trim());
  
  startDate.setDate(startDate.getDate() - 1);
  endDate.setDate(endDate.getDate() + 1);
  
  const year = startDate.toLocaleString("default", { year: "numeric" });
  const month = startDate.toLocaleString("default", { month: "2-digit" });
  const day = startDate.toLocaleString("default", { day: "2-digit" });

  const formatStartDate = year + "-" + month + "-" + day;

  const year2 = endDate.toLocaleString("default", { year: "numeric" });
  const month2 = endDate.toLocaleString("default", { month: "2-digit" });
  const day2 = endDate.toLocaleString("default", { day: "2-digit" });

  const formatEndDate = year2 + "-" + month2 + "-" + day2;


  const id = userId
  const url = `/query/${id}/${formatStartDate}/${formatEndDate}`;

  window.location.href = url;
});




