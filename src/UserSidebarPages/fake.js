const dateString = trialFormateDate;
console.log(dateString);
function subtractTwoDate(date2, systemDate) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const diffInMilliseconds = systemDate - date2;
  const diffInDays = Math.floor(diffInMilliseconds / oneDayInMilliseconds);
  return diffInDays;
}
// const dateParts = dateString.split("/");

// const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
//   2,
//   "0"
// )}-${dateParts[1].padStart(2, "0")}`;
const dbDate1 = new Date(dateString);
const formattedDateString = dbDate1.toLocaleString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZoneName: "short",
});
const dbDate2 = new Date(formattedDateString);
const systemDate = new Date();

console.log(dbDate2, systemDate);
const dayDifferent = subtractTwoDate(dbDate2, systemDate);
console.log(dayDifferent);
