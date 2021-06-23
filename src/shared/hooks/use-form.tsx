import { ChangeEvent, useReducer, useCallback } from "react";
import { TextField } from "@material-ui/core";

const DEFAULT_INPUTS = {
  email: {
    elementType: "input",
    inputType: "email",
    value: "",
    label: "email",
    isValid: false,
    required: true,
    warning: "",
    validatiors: {
      isEmail: true,
      minLength: 8,
      maxLength: 64,
    },
  },
  password: {
    elementType: "input",
    inputType: "password",
    value: "",
    label: "password",
    isValid: false,
    required: true,
    warning: "",
    validatiors: {
      minLength: 8,
      maxLength: 24,
    },
  },
};

type action = {
  type: "SET_DATA" | "CHANGE_VALUE" | "VALIDATE_INPUT";
  data?: object;
};

const formReducer = (state: object, action: action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        inputs: { ...action.data },
      };
    case "CHANGE_VALUE":
      return state;
    case "VALIDATE_INPUT":
      return state;
    default:
      return state;
  }
};

const useForm = (inputs: object = DEFAULT_INPUTS) => {
  const [formState, dispatch]: [any, any] = useReducer(formReducer, {
    inputs: { ...inputs },
    isValid: false,
  });

  const onChangeHandler = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string
    ) => {
      dispatch({ type: "CHANGE_VALUE", val: event.target.value });
    },
    []
  );

  const setData = useCallback((data: object) => {
    dispatch({ type: "SET_DATA", data });
  }, []);

  let inputsArr = [];
  for (let input in formState.inputs) {
    inputsArr.push({
      id: input,
      input: formState.inputs[input],
    });
  }

  const displayForm = inputsArr.map((el) => (
    <TextField
      key={el.id}
      onChange={(event) => onChangeHandler(event, el.id)}
      type={el.input.inputType}
      variant="outlined"
      required={el.input.required}
      label={el.input.label}
      error={!!el.input.warning}
      helperText={el.input.warning}
    />
  ));

  return { formState, displayForm, setData };
};

export default useForm;
