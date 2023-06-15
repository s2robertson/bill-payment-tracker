module.exports = {
  format_date: (date) => {
    if (!date) {
      return ""; 
    }
    return date.toLocaleDateString();
  },

  is_next_month: (date) => {
    var currentDate = new Date();
    var nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  
    return date >= nextMonthDate;
  }
}
