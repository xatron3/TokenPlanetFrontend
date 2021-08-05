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

  formatPrice = (price) => {
    let formattedPrice;

    var m = -Math.floor(Math.log10(price) + 1);

    if (price.toFixed() < 0.01) {
      formattedPrice = price.toFixed(m + 4);
    } else {
      formattedPrice = price.toFixed(2);
    }

    return formattedPrice;
  };
}

export default new Helpers();
