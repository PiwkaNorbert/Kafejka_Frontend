import axios from 'axios';

export default function buttonCommand(url, errorMsg, computer, extra) {
  return null;
  axios(url)
    .then(response => {
      console.log(response);
      if (response.status === 200) computer.refetch();
    })
    .catch(err => {
      console.log(err);
      throw new Error(`${errorMsg} Error: ${err}`);
    });
}
