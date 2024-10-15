export type ListData = {
    id: number;
    listName: string;
    content: string;
  };

export type AlertData = {
    alertType: number;
    onProceedAction: () => void;
  };