const dateString = trialFormateDate;
function subtractTwoDate(date2, systemDate) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const diffInMilliseconds = systemDate - date2;
  const diffInDays = Math.floor(diffInMilliseconds / oneDayInMilliseconds);
  return diffInDays;
}

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

const dayDifferent = subtractTwoDate(dbDate2, systemDate);

