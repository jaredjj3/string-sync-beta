import { NotificationTypes } from 'util/notify';

export interface NotificationStruct {
  type: NotificationTypes;
  messages: Array<string>;
}