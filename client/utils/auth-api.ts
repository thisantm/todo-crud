const apiUrl = process.env.NEXT_PUBLIC_TODO_API;
if (!apiUrl) {
  throw new Error("Missing env var NEXT_PUBLIC_AUTH_API");
}

const authUrl = apiUrl + "/auth";

export const authApiCall = async (mode: "login" | "register", values: { email: string; password: string }) => {
  const endpoint = mode === "login" ? "/login" : "/register";
  const response = await fetch(`${authUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    const data = await response.json();
    if (mode === "login") {
      localStorage.setItem("token", data.token);
    }
    return data;
  } else {
    throw new Error(await response.json());
  }
};
