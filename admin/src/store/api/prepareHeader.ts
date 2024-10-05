// (headers: Headers) => prepareHeaders(headers)

export const prepareHeaders = (headers: Headers) => {
    const token = localStorage.getItem("admin-token");

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  };