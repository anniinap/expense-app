import { Expense } from "../interfaces/expenseInterface";

export const applyFilters = (
  expenses: Expense[],
  month: string,
  category: string
) => {
  const filtered = expenses.filter((expense) => {
    const matchesMonth =
      month === "All" || month === "" || expense.month === month;
    const matchesCategory =
      category === "All" || category === "" || expense.category === category;
    return matchesMonth && matchesCategory;
  });

  return filtered;
};
