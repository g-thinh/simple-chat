import {
  getFirestore,
  QueryDocumentSnapshot,
  collection,
  WithFieldValue,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "./firebase";
import * as Api from "types/api";

export const db = getFirestore(firebaseApp);

const converter = <T>() => ({
  toFirestore: (modelObject: WithFieldValue<T>) => modelObject,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  collection(db, collectionPath).withConverter(converter<T>());

export const dbRefs = {
  users: dataPoint<Api.User>("users"),
  channels: dataPoint<Api.Channel>("channels"),
  messages: dataPoint<Api.Message>("messages"),
};
