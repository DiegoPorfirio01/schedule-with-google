export function convertTimeStringToMinutes(timeString: String) {
  const [hours, minutes] = timeString.split(":").map(Number)

  return hours * 60 + minutes
}
