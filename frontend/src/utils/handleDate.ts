export const handleDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
