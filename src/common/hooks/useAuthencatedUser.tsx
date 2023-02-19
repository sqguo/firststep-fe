import React, { useEffect } from "react";
import cookies from "../../cookies";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import * as actions from "../../store/actionCreators";
import { sec } from "../../security";

const auth0Audience = process.env.AUTH0_AUDIENCE as string;
const cookieDomain = process.env.DOMAIN as string;

function useAuthencatedUser() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  sec.setAccessTokenSilently(getAccessTokenSilently);

  const appUser: User | null = useSelector(
    (state: AppState) => state.currentUser
  );

  useEffect(() => {
    if (user && isAuthenticated && !isLoading) {
      const userEmail = user.email as string;
      if (userEmail !== appUser?.profile?.email) {
        dispatch(
          actions.getOrCreateUserStartAction(
            userEmail,
            user.given_name ?? "First",
            user.family_name ?? "Last",
            false
          )
        );
      }
    }
  }, [user]);

  return appUser;
}

export default useAuthencatedUser;
