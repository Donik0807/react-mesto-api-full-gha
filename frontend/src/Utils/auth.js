const BASE_URL = "https://api.mesto.front.nomoreparties.sbs";

export function register(userData) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.statusText);
    }
  });
}

export function auth(userData) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
