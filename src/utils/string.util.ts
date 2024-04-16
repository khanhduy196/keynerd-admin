export const getTrimValueFromHTMLString = (value: string) => {
  const plainText = value.replace(/<\/?[^>]+(>|$)/g, " ");
  console.log("plainText: " + plainText.length);
  if (plainText.trim() === "") {
    return plainText;
  } else {
    return value;
  }
};
