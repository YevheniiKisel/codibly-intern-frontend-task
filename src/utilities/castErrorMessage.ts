// Casting error message, based on status. Because of differce between protocols of localhost / endpoint, statusText is empty.
export default function castErrorMessage(responseStatus: number) {
  switch (true) {
    case responseStatus >= 400 && responseStatus <= 499:
      return `${responseStatus} Client error. Such ID don't exist, try another one.`;
    case responseStatus >= 500 && responseStatus <= 599:
      return `${responseStatus} Server error. Ooops, something happened, please try later.`;
    default:
      return `Error with status ID ${responseStatus}`;
  }
};
