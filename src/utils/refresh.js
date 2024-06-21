import createRefresh from "react-auth-kit/createRefresh";

export const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await fetch("http://localhost:3000/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param.authToken}`,
        },
        body: JSON.stringify({ refreshToken: param.refreshToken }),
      });
      console.log("Refreshing");

      if (!response.ok) {
        const { token } = await response.json();
        return {
          isSuccess: true,
          newAuthToken: token,
          newAuthTokenExpireIn: 10,
          newRefreshTokenExpiresIn: 60,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
