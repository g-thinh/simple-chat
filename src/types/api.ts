export type UserForm = {
  email: string;
  password: string;
};

export type Message = {
  channelId?: string;
  createdBy?: string;
  insertedAt?: Date;
  message?: string;
};

export type Channel = {
  createdBy?: string;
  insertedAt?: Date;
  roomName?: string;
};

export type User = {
  email?: string;
  displayName?: string;
};
