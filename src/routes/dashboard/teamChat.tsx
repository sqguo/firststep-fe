import {
  ChannelEntity,
  ChannelList,
  Chat,
  MemberList,
  MessageEnvelope,
  MessageInput,
  MessageList,
  MessagePayload,
  TypingIndicator,
  usePresence,
} from "@pubnub/react-chat-components";
import React, { useState } from "react";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useUserGroup from "../../common/hooks/useUserGroup";
import "./teamChat.scss";

const defaultChannel = {
  id: "default",
  name: "Default Channel",
  description: "This is the default channel",
} as Pick<ChannelEntity, "id" | "name" | "description">;

const TeamChat = () => {
  const { allMembers, groupChannelName } = useUserGroup();
  // const [currentChannel, setCurrentChannel] = useState(groupChannelName);

  return (
    <div className="team-chat">
      <Chat currentChannel={groupChannelName} users={allMembers}>
        <div className="team-chat__inner-wrapper">
          <MessageList fetchMessages={5} />
          <MessageInput typingIndicator emojiPicker={<Picker data={emojiData} />}/>
        </div>
      </Chat>
    </div>
  );
};

export default TeamChat;
