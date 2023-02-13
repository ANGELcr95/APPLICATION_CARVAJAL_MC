export default function deleteAxios(url, token = "") {
  const REACT_API_URL = process.env.REACT_APP_API_URL;
  return fetch(`${REACT_API_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization-token": token,
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
