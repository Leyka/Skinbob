var page = require('webpage').create()
var date = require('./date')

// Build URL
var baseUrl = 'https://na.leagueoflegends.com/en/news/store/sales/champion-and-skin-sale-'
// Date format : 'mmdd'
var today = new Date()
var salesDate = date.closestSalesDates(today)
var url = baseUrl + salesDate.from + '-' + salesDate.end + '-0'

page.open(url, function (status) {
  // Handle error
  if (status !== 'success') {
    console.log('Oops, something went wrong')
    return false
  }

  // DOM manipulation
  page.evaluate(function () {
    var sales = document.querySelectorAll('.field-name-body .gs-container div')
    var skins = []
    var champions = []

    for (var i = 0; i < sales.length; i++) {
      var saleDOM = sales[i]
      var saleName = saleDOM.querySelector('h4').textContent.trim()
      // Retrieve only price after rebate
      var salePrice = saleDOM.querySelector('p').textContent.split(' ')[1]
      var sale = {
        name: saleName,
        price: salePrice
      }
      // Is a skin
      if (i <= 3) {
        skins.push(sale)
      } else {
        champions.push(sale)
      }
    }

    var data = {
      skins: skins,
      champions: champions
    }

    // I spent hours to try to find a way to POST the data to the server but "page" is only using method GET
    // I tried to create another "page2" with POST without success
    this.open('http://localhost:3000/sync/sales?d=' + JSON.stringify(data))
  })
})

page.onLoadFinished = function () {
  phantom.exit()
}

page.onConsoleMessage = function (msg) {
  console.log(msg)
}
