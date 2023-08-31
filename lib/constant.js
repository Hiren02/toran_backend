
const convertDay = (givenDate) => {
  let dateString = givenDate;
  let dateParts = dateString.split("/"); // Split the date string into parts

  // Create a new Date object using the parsed date parts
  let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  // Use the getDay() method to get the day of the week (0 = Sunday, 1 = Monday, ...)
  let day = date.getDay();
  return day;
}

const regularPrice = 1000;
const nightPrice = 1200;
const sundayPrice = 1200;
const sundayNightPrice = 1500;
const arr = [
  { slot: "12-1 AM", price: nightPrice },
  { slot: "1-2 AM", price: nightPrice },
  { slot: "2-3 AM", price: nightPrice },
  { slot: "3-4 AM", price: nightPrice },
  { slot: "4-5 AM", price: nightPrice },
  { slot: "5-6 AM", price: nightPrice },
  { slot: "6-7 AM", price: regularPrice },
  { slot: "7-8 AM", price: regularPrice },
  { slot: "8-9 AM", price: regularPrice },
  { slot: "9-10 AM", price: regularPrice },
  { slot: "10-11 AM", price: regularPrice },
  { slot: "11-12 AM", price: regularPrice },
  { slot: "12-1 PM", price: regularPrice },
  { slot: "1-2 PM", price: regularPrice },
  { slot: "2-3 PM", price: regularPrice },
  { slot: "3-4 PM", price: regularPrice },
  { slot: "4-5 PM", price: regularPrice },
  { slot: "5-6 PM", price: regularPrice },
  { slot: "6-7 PM", price: nightPrice },
  { slot: "7-8 PM", price: nightPrice },
  { slot: "8-9 PM", price: nightPrice },
  { slot: "9-10 PM", price: nightPrice },
  { slot: "10-11 PM", price: nightPrice },
  { slot: "11-12 PM", price: nightPrice },
];
const arr2 = [
  { slot: "12-1 AM", price: sundayNightPrice },
  { slot: "1-2 AM", price: sundayNightPrice },
  { slot: "2-3 AM", price: sundayNightPrice },
  { slot: "3-4 AM", price: sundayNightPrice },
  { slot: "4-5 AM", price: sundayNightPrice },
  { slot: "5-6 AM", price: sundayNightPrice },
  { slot: "6-7 AM", price: sundayPrice },
  { slot: "7-8 AM", price: sundayPrice },
  { slot: "8-9 AM", price: sundayPrice },
  { slot: "9-10 AM", price: sundayPrice },
  { slot: "10-11 AM", price: sundayPrice },
  { slot: "11-12 PM", price: sundayPrice },
  { slot: "12-1 PM", price: sundayPrice },
  { slot: "1-2 PM", price: sundayPrice },
  { slot: "2-3 PM", price: sundayPrice },
  { slot: "3-4 PM", price: sundayPrice },
  { slot: "4-5 PM", price: sundayPrice },
  { slot: "5-6 PM", price: sundayPrice },
  { slot: "6-7 PM", price: sundayNightPrice },
  { slot: "7-8 PM", price: sundayNightPrice },
  { slot: "8-9 PM", price: sundayNightPrice },
  { slot: "9-10 PM", price: sundayNightPrice },
  { slot: "10-11 PM", price: sundayNightPrice },
  { slot: "11-12 PM", price: sundayNightPrice },
]

module.exports = {
  arr,
  arr2,
  convertDay
};
