import type { User } from "firebase/auth";
import { addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbRefs } from "services/firestore";

export const useMessages = (channelId?: string) => {
  const [messages, setMessages] = useState([]);
  const messagesQuery = query(dbRefs.messages, orderBy("insertedAt", "asc"));

  async function addMessage(message: string, user: User, channelId: string) {
    try {
      await addDoc(dbRefs.messages, {
        createdBy: user.uid,
        insertedAt: new Date(),
        message: message,
        channelId: channelId,
      });
    } catch (error) {
      console.log("There was an error creating the channel", error);
    }
  }

  useEffect(() => {
    const messagesListener = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((snap) => {
        const data = snap.data();
        const messageChannelId = data.channelId;
        if (channelId === messageChannelId) {
          newMessages.push(snap.data());
        }
      });
      setMessages(newMessages);
    });

    return () => messagesListener();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return { messages, addMessage };
};
