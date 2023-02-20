import React from "react";
import PubNub, { PubnubConfig } from "pubnub";
import { PubNubProvider } from "pubnub-react";
import Dashboard from "./dashboard";
import useUserProfile, { getUserIdForUUID } from "../../common/hooks/useUserProfile";

const pubnubKeys = {
  publishKey: process.env.PUBNUB_PUBLISH_KEY as string,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY as string,
};

const Wrapper = () => {
  const { userUUID } = useUserProfile();
  console.log('user', userUUID, getUserIdForUUID(userUUID));

  const pubnub = new PubNub({
    ...pubnubKeys,
    userId: userUUID,
    fileUploadPublishRetryLimit: 0,
  } as PubnubConfig);

  return (
    <PubNubProvider client={pubnub}>
      <Dashboard />
    </PubNubProvider>
  );
};

export default Wrapper;
