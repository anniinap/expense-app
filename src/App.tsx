import { useEffect, useState } from "react";

import ExpenseFilter from "./componets/ExpenseFilter";
import ExpenseList from "./componets/ExpenseList";
import Form from "./componets/Form";
import ModifyExpense from "./componets/ModifyExpense";

import { Expense } from "./interfaces/expenseInterface";

import {
  getExpenses,
  addExpense,
  modifyExpense,
  deleteExpense,
} from "./axios-api/expenseService";

import { generateRandomId } from "./utils/generateRandomId";
import { applyFilters } from "./utils/expenseFilter";

const defaultExpense: Expense = {
  id: "",
  description: "",
  amount: "0",
  category: "",
  month: "",
};

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedExpense, setSelectedExpense] =
    useState<Expense>(defaultExpense);
  const [isModified, setIsModified] = useState(false);

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [filterSelected, setFilterSelected] = useState(false);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    document.title = "Yearly expenses";
  }, []);


  const handleMonthSelection = (month: string) => {
    setMonth(month);
  };

  const handleCategorySelection = (category: string) => {
    setCategory(category);
  };

  const onOpen = (expense: Expense) => {
    setOpen(true);
    setSelectedExpense(expense);
  };

  const onClose = () => {
    setOpen(false);
  };

  // filters the data
  useEffect(() => {
    setFilterSelected(true);
    const filtered = applyFilters(expenses, month, category);
    setFilteredExpenses(filtered);
  }, [month, category, expenses]);

  // gets data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Error fetching expenses");
      }
    };

    fetchData();
  }, []);

  // Adds new expense when submiting the form
  const handleAdd = (expense: Expense) => {
    const originalData = [...expenses];
    expense.id = generateRandomId(expenses);

    const addAsync = async () => {
      try {
        await addExpense(expense);
        setExpenses([expense, ...expenses]);
      } catch (err) {
        setError("Error adding expense");
        setExpenses(originalData);
      }
    };
    addAsync();
  };

  // deletes the chosen expense
  const handleDelele = (expense: Expense) => {
    const originalExpenses = [...expenses];

    const deleteAsync = async () => {
      try {
        await deleteExpense(expense);
        setExpenses(expenses.filter((e) => e.id !== expense.id));
      } catch (err) {
        setError("Error deleting expense");
        setExpenses(originalExpenses);
      }
    };
    deleteAsync();
  };

  // modifies the chosen expense
  const handleModify = (expense: Expense) => {
    if (
      selectedExpense.description !== expense.description ||
      selectedExpense.amount !== expense.amount ||
      selectedExpense.category !== expense.category ||
      selectedExpense.month !== expense.month
    ) {
      setExpenses(
        expenses.map((e) =>
          e.id === selectedExpense.id ? { ...e, ...expense } : e
        )
      );

      setSelectedExpense({ ...selectedExpense, ...expense });
      setIsModified(true);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isModified) {
      const modifyAsync = async () => {
        try {
          await modifyExpense(selectedExpense);
          setIsModified(false);
        } catch (err) {
          setError("Error modifying expense");
          setIsModified(false);
        }
      };

      modifyAsync();
    }
  }, [isModified]);

  return (
    <div>
      <Form
        onSubmit={handleAdd}
        buttonName="Add"
        formName="Yearly expenses"
        defaultValueDescription=""
        defaultValueAmount=""
        defaultValueCategory=""
        defaultValueMonth=""
      />
      <ExpenseFilter
        selectExpenseCategory={handleCategorySelection}
        selectExpenseMonth={handleMonthSelection}
        selectedCategory={category}
        selectedMonth={month}
      />
      <ExpenseList
        expenses={filterSelected ? filteredExpenses : expenses}
        onDelete={handleDelele}
        handleClickOpen={onOpen}
      />
      <ModifyExpense
        expense={selectedExpense}
        open={open}
        handleClose={onClose}
        SaveModifiedExpense={handleModify}
        button="X"
      />
    </div>
  );
};

export default App;
