import { Course } from "./Course";

export interface Notification {
  AlertDateTime: string;
  Category: string;
  FeedMessageSubjectId: string;
  FeedMessageSubjectType: string;
  IconURL: string;
  Id: number;
  Message: string;
  MessageURL: string;
  OrgUnitId: number;
  Title: string;
  Course?: Course;
}
