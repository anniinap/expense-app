import axios from "axios";
import { Expense } from "../interfaces/expenseInterface";

const url = import.meta.env.VITE_API_URL;;

// GET
export const getExpenses = async () => {
  try {
    const res = await axios.get<Expense[]>(url);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching expenses:");
    return [];
  }
};

// POST
export const addExpense = async (expense: Expense) => {
  try {
    const res = await axios.post(url, expense);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Error adding data");
  }
};

// PUT
export const modifyExpense = async (expense: Expense) => {
  try {
    const res = await axios.put(url + expense.id, expense);
    console.log(res.data);
  } catch (er) {
    console.log("Error modifying data");
  }
};

// DELETE
export const deleteExpense = async (expense: Expense) => {
  try {
    const res = await axios.delete(url + expense.id);
    console.log(res.data);
  } catch (err) {
    console.log("Error deleting data");
  }
};

