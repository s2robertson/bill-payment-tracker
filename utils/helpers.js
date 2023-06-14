module.exports = {
  format_date: (date) => {
    
    if (!date) {
      return ""; 
    }

    return date.toLocaleDateString();
  },

};
