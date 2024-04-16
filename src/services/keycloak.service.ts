import Keycloak from "keycloak-js";
import { RedirectUtil } from "utils";

const realm = process.env.REACT_APP_KEYCLOAK_REALM || "";
const url = process.env.REACT_APP_KEYCLOAK_URL || "";
const clientId = process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "";
const accessTokenLifespan =
  process.env.ACCESS_TOKEN_LIFESPAN_IN_SECONDS || "300";

const keycloak = new Keycloak({
  realm,
  url,
  clientId,
});

keycloak.onTokenExpired = async () => {
  try {
    await keycloak.updateToken(+accessTokenLifespan);
  } catch (error) {
    RedirectUtil.redirectToLoginPage();
  }
};

export default keycloak;
