export const taskStructure = `
Each task should have the following structure:
[
  {
    "title": "Task Title",
    "status": "BACKLOG" | "TO_DO" | "IN_PROGRESS" | "DONE" | "CANCELED",
    "priority": "LOW" | "MEDIUM" | "HIGH",
    "label": "INVENTORY" | "ORDER" | "SHIPPING" | "QUALITY" | "CUSTOMER" | "MAINTENANCE",
    "dueDate": "2024-11-23T12:00:00",
    "userId": session.user.id
  }
]
`;

export const exampleOutput = `
Here is an example of the expected output:
[
  {
    "title": "Restock inventory",
    "status": "TO_DO",
    "priority": "HIGH",
    "label": "INVENTORY",
    "dueDate": "2024-11-30T09:00:00",
    "userId": session.user.id
  },
  {
    "title": "Ship order #1234",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM",
    "label": "SHIPPING",
    "dueDate": "2024-11-25T12:00:00",
    "userId": session.user.id
  },
]
`;
