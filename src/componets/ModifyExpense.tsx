import { Dialog, DialogContent, Button } from "@mui/material"
import Form from "./Form";
import { Expense } from "../interfaces/expenseInterface";

interface Props {
    expense: Expense;
    open: boolean;
    handleClose: () => void;
    SaveModifiedExpense: (expense : Expense) => void;
    button: string

}
const ModifyExpense = ({open, handleClose, SaveModifiedExpense, expense, button} : Props) => {

  return (
    <>
    <Dialog open={open} maxWidth="md">
        <DialogContent sx={{margin: 1}}>
        <Button variant="contained" color="primary" onClick={handleClose} sx={{width: "auto", marginLeft: "auto", marginBottom: 2, display: "block"}}>{button}</Button>
            <Form  buttonName="Save Changes" formName="Modify expense" onSubmit={SaveModifiedExpense} defaultValueDescription={expense.description} defaultValueAmount={expense.amount} defaultValueCategory={expense.category} defaultValueMonth={expense.month}/>
        </DialogContent>

    </Dialog>
    </>

  )
}

export default ModifyExpense