export interface NotificationProps {
  notifications: Array<{
    name: string;
    comment: string;
    link: string;
    date: string;
    timeAgo: string;
    file?: {
      name: string;
      size: string;
      type: string;
    };
  }>;
}
