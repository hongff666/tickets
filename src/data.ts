export const initialTickets: Array<{
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: "1",
    title: "Ticket 1",
    content: "This is the content of ticket 1",
    status: "open",
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-02"),
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "This is the content of ticket 2",
    status: "closed",
    createdAt: new Date("2023-10-03"),
    updatedAt: new Date("2023-10-04"),
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "This is the content of ticket 3",
    status: "in-progress",
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-06"),
  },
];
