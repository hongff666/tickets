export const initialTickets = [
  {
    id: "1",
    title: "Ticket 1",
    content: "This is the content of ticket 1",
    status: "OPEN" as const,
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-02"),
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "This is the content of ticket 2",
    status: "DONE" as const,
    createdAt: new Date("2023-10-03"),
    updatedAt: new Date("2023-10-04"),
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "This is the content of ticket 3",
    status: "IN-PROGRESS" as const,
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-06"),
  },
];
