var moment = require('moment')

module.exports = {
  salesDuration: 3,
  /**
   * Return closest date (either tuesday or friday) by the given date
   * This will be called by cronjob either monday 2 pm or thursday 2pm
   * @param {Date} date Date to check
   */
  closestSalesDates: function (date) {
    const monday = 1
    const thursday = 4
    const momentDate = moment(date)
    var from = null
    var end = null

    if (momentDate.day() === monday) {
      // Retrieve sales of tuesday
      from = momentDate.day('tuesday')
    } else if (momentDate.day() === thursday) {
      // Retrieve sales of friday
      from = momentDate.day('friday')
    }

    end = from.clone().add(this.salesDuration, 'day')

    return {from: from.format('MMDD'), end: end.format('MMDD')}
  }
}