class Helpers {
  dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  formatNumber = (number, decimals = 4) => {
    number = parseFloat(number);
    let formattedNumber;

    var m = -Math.floor(Math.log10(number) + 1);

    if (number.toFixed() < 0.01) {
      formattedNumber = number.toFixed(m + decimals);
    } else {
      formattedNumber = number.toFixed(2);
    }

    return formattedNumber;
  };
}

export default new Helpers();
