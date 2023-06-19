var fs = require('fs');
const path = require('path');

module.exports = {
  format_date: (date) => {
    if (!date) {
      return "";
    }
    let d = typeof date === 'string' ? new Date(date) : date;
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options);
  },

  format_date_iso(date) {
    if (!date) {
      return '';
    }
    let d = typeof date == 'string' ? new Date(date) : date;
    return d.toISOString().substring(0, 10);
  },

  to_json(obj) {
    return obj ? JSON.stringify(obj) : '';
  },

  is_next_month: (date) => {
    if (!date) {
      return ""; 
    }
    var currentDate = new Date();
    var nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  
    return date >= nextMonthDate;
  },


  isWithinDateRange: (date, options) => {
    var fromDate = this.val();
    var toDate = this.val();
  
    var current = new Date(date);
    var start = new Date(fromDate);
    var end = new Date(toDate);
  
    if (current >= start && current <= end) {
      return options.fn(this);
    } else {
      return options.inverse(this); 
    }
},

filterByDateRange: (data, startDate, endDate) => {
  
  var startDateObj = new Date(startDate);
  var endDateObj = new Date(endDate);

  var filteredData = data.filter(function(item) {
    var itemDate = new Date(item.date);
    return itemDate >= startDateObj && itemDate <= endDateObj;
  });

 
  return options.fn(filteredData);
},


timeOfDays: ()=> {
  const currentHour = new Date().getHours();
  let timeOfDay = '';

  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'night';
  }

  return timeOfDay;
},


toUpperCase: (text) => {
return text.toUpperCase()
},

svg: (logo) => {
  let svgPath = path.join(dirname, `public/images/${logo}.svg`)
  let content = fs.readFileSync(svgPath, 'utf8');
      return content;
}

}







