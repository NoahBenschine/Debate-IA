export default function getDate(){
  const timeOff = Date.getTimezoneOffset();
  const time = Date.getTime()
  console.log(timeOff)
  console.log(time)
}
