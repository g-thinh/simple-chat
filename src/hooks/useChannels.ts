import type { User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firestore";

export const useChannels = (channelId?: string) => {
  const [channels, setChannels] = useState([]);
  const channelsRef = collection(db, "channels");
  const channelsQuery = query(channelsRef, orderBy("insertedAt", "asc"));

  async function addChannel(name: string, user: User) {
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

  async function deleteChannel(channelId) {
    try {
      const channelsRef = doc(db, "channels", channelId);
      await deleteDoc(channelsRef);
    } catch (error) {
      console.log("There was an error deleting the channel", error);
    }
  }

  useEffect(() => {
    const channelListener = onSnapshot(channelsQuery, (snapshot) => {
      const newChannels = [];
      snapshot.forEach((snap) => {
        newChannels.push({ ...snap.data(), id: snap.id });
      });
      setChannels(newChannels);
    });

    return () => channelListener();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return { channels, addChannel, deleteChannel };
};
