import { Expense } from "../interfaces/expenseInterface";

export const generateRandomId = (expenses: Expense[]): string => {
  let id = "";
  let idExists = false;
  do {
    id = Math.floor(Math.random() * 1000000).toString();
    idExists = expenses.some((expense) => expense.id === id);
  } while (idExists);
  return id;
};