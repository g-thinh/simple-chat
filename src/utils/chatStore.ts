import { User } from "@firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firestore";

export const useStore = (channelId: string) => {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");
  const channelsRef = collection(db, "channels");

  const messageQuery = query(messagesRef, orderBy("insertedAt", "asc"));

  useEffect(() => {
    const messagesListener = onSnapshot(messageQuery, (snapshot) => {
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

    const channelListener = onSnapshot(channelsRef, (snapshot) => {
      const newChannels = [];
      snapshot.forEach((snap) => {
        newChannels.push({ ...snap.data(), id: snap.id });
      });
      setChannels(newChannels);
    });

    return () => {
      messagesListener();
      channelListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return { channels, messages };
};

export async function fetchChannels(setState) {
  try {
    const channelsRef = collection(db, "channels");
    const channelsQuery = await getDocs(channelsRef);
    let channelsData = [];
    channelsQuery.forEach((doc) => {
      channelsData.push({ ...doc.data(), id: doc.id });
    });
    setState(channelsData);
  } catch (error) {
    console.log("There was an error fetching channels");
  }
}

export async function fetchMessages(setState) {
  try {
    const messagesRef = collection(db, "messages");
    const messagesQuery = await getDocs(messagesRef);
    let messages = [];
    messagesQuery.forEach((doc) => {
      messages.push(doc.data());
    });
    setState(messages);
  } catch (error) {
    console.log("There was an error fetching channels");
  }
}

export async function addChannel(name: string, user: User) {
  try {
    const channelsRef = collection(db, "channels");
    await addDoc(channelsRef, {
      createdBy: user.uid,
      insertedAt: new Date(),
      roomName: name,
    });
  } catch (error) {
    console.log("There was an error creating the channel", error);
  }
}

export async function addMessage(
  message: string,
  user: User,
  channelId: string
) {
  try {
    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      createdBy: user.uid,
      insertedAt: new Date(),
      message: message,
      channelId: channelId,
    });
  } catch (error) {
    console.log("There was an error creating the channel", error);
  }
}

export async function deleteChannel(channelId) {
  try {
    const channelsRef = doc(db, "channels", channelId);
    await deleteDoc(channelsRef);
  } catch (error) {
    console.log("There was an error deleting the channel", error);
  }
}
