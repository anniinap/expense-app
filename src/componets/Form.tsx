import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import expenseMonths from "../data/expenseMonths";
import expenseCategories from "../data/expenseCategories";
import { Expense } from "../interfaces/expenseInterface";

interface Props {
  onSubmit: (data: Expense) => void;
  buttonName: string;
  formName: string;
  defaultValueDescription: string;
  defaultValueAmount: string;
  defaultValueCategory: string;
  defaultValueMonth: string;
}

const Form = ({onSubmit, buttonName, formName, defaultValueDescription, defaultValueAmount, defaultValueCategory, defaultValueMonth} : Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>();

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        {formName}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Description"
          variant="filled"
          fullWidth
          margin="normal"
          defaultValue={defaultValueDescription}
          error={errors.description?.type === "required"}
          helperText={
            errors.description?.message ||
            "Enter the description of the expense"
          }
          {...register("description", { required: "This field is required" })}
        />
        <TextField
          label="Amount"
          variant="filled"
          fullWidth
          margin="normal"
          defaultValue={defaultValueAmount}
          error={!!errors.amount}
          helperText={
            errors.amount?.message || "Enter the amount of the expense"
          }
          {...register("amount", {
            required: "this field is required",
            validate: (value) => {
              const hasDecimalWithNoNumber = /^\d+\.$/.test(value.toString());

              if (hasDecimalWithNoNumber) {
                return "Please enter a valid number (e.g., 5.0)";
              }

              const isValidNumber = /^[+]?\d+(\.\d+)?$/.test(value.toString());
              if (!isValidNumber) {
                return "Please enter only valid numbers";
              }

              return true;
            },
          })}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            },
          }}
        />
        <TextField
          id="filled-select-category"
          select
          label="Category"
          variant="filled"
          fullWidth
          margin="normal"
          defaultValue={defaultValueCategory}
          error={errors.category?.type === "required"}
          helperText={
            errors.category?.message || "Select the category of the expense"
          }
          {...register("category", { required: "This field is required" })}
        >
          {expenseCategories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="filled-select-month"
          select
          label="Month"
          variant="filled"
          fullWidth
          margin="normal"
          defaultValue={defaultValueMonth}
          error={errors.month?.type === "required"}
          {...register("month", { required: "This field is required" })}
          helperText={
            errors.amount?.message || "Select the month of the expense"
          }
        >
          {expenseMonths.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            margin: "auto",
            width: "80%",
            marginTop: "1rem",
          }}
        >
          {buttonName}
        </Button>
      </form>
    </Box>
  );
};

export default Form;
