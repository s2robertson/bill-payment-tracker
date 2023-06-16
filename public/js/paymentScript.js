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

const outputContainer = document.getElementById('outputContainer');



dateBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const startDate = startD.value.trim();
    const endDate = endD.value.trim();

    // const id = req.session.id to replace the 1 in the url
    const url = `/api/query/1/${startDate}/${endDate}`; 
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});


// dateBtn.addEventListener('click', async (e) => {
//   e.preventDefault();

//   try {
//     const startDate = startD.value.trim();
//     const endDate = endD.value.trim();
//     const url = `/api/query/1/${startDate}/${endDate}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Network response was not OK');
//     }

//     const data = await response.json();
//     const renderedHTML = template({ payments: data });

//     const paymentFilterContainer = document.getElementById('paymentFilterContainer');
//     paymentFilterContainer.innerHTML = renderedHTML;
//   } catch (error) {
//     console.error(error);
//   }
// });