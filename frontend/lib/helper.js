export function convertTo12Hour(timeString) {
  // Parse the input datetime string
  const date = new Date(timeString);

  // Options to format the time string
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  // Format the time string
  const formattedTime = date.toLocaleTimeString("en-US", options);

  return formattedTime;
}
