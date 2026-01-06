export const loginUser = async (email: string, password: string) => {
  // Hardcode credentials
  const validUser = {
    email: "admin@gmail.com",
    password: "123456"
  };

  if (email === validUser.email && password === validUser.password) {
    const token = "dummy_token_" + Date.now();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);
    return { success: true, token };
  }

  throw new Error("Email hoặc password không chính xác");
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};