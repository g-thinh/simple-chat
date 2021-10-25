import type { User } from "firebase/auth";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbRefs } from "services/firestore";
import * as Api from "types/api";

type ChannelsMap = Api.Channel & { id?: string };

export const useChannels = (channelId?: string) => {
  const [channels, setChannels] = useState<ChannelsMap[]>([]);
  const channelsQuery = query(dbRefs.channels, orderBy("insertedAt", "asc"));

  async function addChannel(name: string, user: User) {
    try {
      await addDoc(dbRefs.channels, {
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
      const channelsRef = doc(dbRefs.channels, channelId);
      await deleteDoc(channelsRef);
    } catch (error) {
      console.log("There was an error deleting the channel", error);
    }
  }

  useEffect(() => {
    const channelListener = onSnapshot(channelsQuery, (snapshot) => {
      const newChannels: ChannelsMap[] = [];
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
