export const timeConverter = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) return `${minutes} minutes`;
  return `${hours} hours, ${minutes} minutes`;
}
