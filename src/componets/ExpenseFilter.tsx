import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import  expenseCategories  from "../data/expenseCategories"; 
import  expenseMonths  from "../data/expenseMonths"; 

interface Props {
  selectExpenseCategory: (category: string) => void;
  selectExpenseMonth: (month: string) => void;
  selectedCategory: string;
  selectedMonth: string;
}
const ExpenseFilter = ({selectExpenseCategory, selectExpenseMonth, selectedCategory, selectedMonth}: Props) => {
  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "end", 
        margin: 3,
        padding: 3,
        paddingBottom: 0

      }}
    >
      {/* Category Select */}
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(event) => selectExpenseCategory(event.target.value as string)}
          label="Category"
          autoWidth
        >
            <MenuItem value={"All"}>All</MenuItem>
          {expenseCategories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Month Select */}
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="month-select-label">Month</InputLabel>
        <Select
          value={selectedMonth}
          labelId="month-select-label"
          id="month-select"
          label="Month"
          autoWidth
          onChange={(event) => selectExpenseMonth(event.target.value as string)}
        >
             <MenuItem value={"All"}>All</MenuItem>
          {expenseMonths.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExpenseFilter;
