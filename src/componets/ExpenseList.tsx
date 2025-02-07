import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { Expense } from "../interfaces/expenseInterface";


interface Props {
  expenses: Expense[];
  onDelete: (expense: Expense) => void;
  handleClickOpen: (expense: Expense) => void;
}
const ExpenseList = ({
  expenses,
  onDelete: deleteExpense,
  handleClickOpen,
}: Props) => {

    const totalAmount = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.amount);
    }, 0);

  return (
    <Box
      sx={{
        margin: 3,
        padding: 3,
      }}
    >
      {expenses.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Amount
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Category
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Month
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Modify
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {expense.description}
                  </TableCell>
                  <TableCell align="right">{expense.amount} €</TableCell>
                  <TableCell align="right">{expense.category}</TableCell>
                  <TableCell align="right">{expense.month}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(expense)}
                    >
                      Modify
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => deleteExpense(expense)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {totalAmount} €
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" variant="h6" gutterBottom>
          No expenses available
        </Typography>
      )}
    </Box>
  );
};

export default ExpenseList;
