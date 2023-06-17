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
}


}
