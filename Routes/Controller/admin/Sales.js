const Order = require("../../../Models/Order");

module.exports.sales = async (req, res) => {
  try {
    const data = await Order.find();
    const totalPending = await Order.find({ status: false });
    const totalDeliverd = await Order.find({ status: true });

    const months = {
      jan: [],
      feb: [],
      mar: [],
      apr: [],
      may: [],
      jun: [],
      july: [],
      aug: [],
      sep: [],
      oct: [],
      nov: [],
      dec: [],
    };

    const days = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    data.filter((docs) => {
      switch (docs.month) {
        case "January":
          months.jan.push(docs);
          break;
        case "February":
          months.feb.push(docs);
          break;
        case "March":
          months.mar.push(docs);
          break;
        case "April":
          months.apr.push(docs);
          break;
        case "May":
          months.may.push(docs);
          break;
        case "June":
          months.jun.push(docs);
          break;
        case "July":
          months.july.push(docs);
          break;
        case "August":
          months.aug.push(docs);
          break;
        case "September":
          months.sep.push(docs);
          break;
        case "October":
          months.oct.push(docs);
          break;
        case "November":
          months.nov.push(docs);
          break;
        case "December":
          months.dec.push(docs);
          break;
        default:
          break;
      }
    });
    data.map((docs) => {
      switch (docs.day) {
        case "1":
          days.monday.push({ amt: docs.amt });
          if (days.monday.length > 1) {
            const price = days.monday.reduce((a, b) => a.amt + b.amt);
            days.monday.push({ actual: price });
          }

        case "2":
          days.tuesday.push({ amt: docs.amt });
          if (days.tuesday.length > 1) {
            const price = days.tuesday.reduce((a, b) => a.amt + b.amt);
            days.wednesday.push({ actual: price });
          }
        case "3":
          days.wednesday.push({ amt: docs.amt });
          if (days.wednesday.length > 1) {
            const price = days.wednesday.reduce((a, b) => a.amt + b.amt);
            days.wednesday.push({ actual: price });
          }
        case "4":
          days.thursday.push({ amt: docs.amt });
          if (days.thursday.length > 1) {
            const price = days.thursday.reduce((a, b) => a.amt + b.amt);
            days.thursday.push({ actual: price });
          }
        case "5":
          days.friday.push({ amt: docs.amt });
          if (days.friday.length > 1) {
            const price = days.friday.reduce((a, b) => a.amt + b.amt);
            days.friday.push({ actual: price });
          }
        case "6":
          days.saturday.push({ amt: docs.amt });
          if (days.saturday.length > 1) {
            const price = days.saturday.reduce((a, b) => a.amt + b.amt);
            days.saturday.push({ actual: price });
          }
        case "7":
          days.sunday.push({ amt: docs.amt });
          if (days.sunday.length > 1) {
            const price = days.sunday.reduce((a, b) => a.amt + b.amt);
            days.sunday.push({ actual: price });
          }
        default:
          break;
      }
    });

    res.status(200).json({
      days,
      months,
      totalDeliverd: totalDeliverd.length,
      totalPending: totalPending.length,
    });
  } catch (error) {
    res.status(400).json({ message: "No sales fam", error });
  }
};
