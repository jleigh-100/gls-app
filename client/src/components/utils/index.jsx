export const timeConverter = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) return `${minutes} minutes`;
  return `${hours} hours, ${minutes} minutes`;
}


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
