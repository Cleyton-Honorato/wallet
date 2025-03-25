export function formatDate(date: string): string {
  const dateFormatted = new Date(date);
  const day = dateFormatted.getDate();
  const month = dateFormatted.getMonth() + 1;
  const year = dateFormatted.getFullYear();

  return `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }/${year}`;
}
