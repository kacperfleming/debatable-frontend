import { ChangeEvent, useReducer, useCallback, useRef } from "react";
import { TextField, Tooltip, Fab } from "@material-ui/core";
import { Face } from "@material-ui/icons";

import ValidateInput from "../utils/ValidateInput";

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
  id?: any;
  val?: string | number;
  warning?: string;
};

const formReducer = (state: any, action: action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        inputs: {
          ...action.data,
        },
      };
    case "CHANGE_VALUE":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            value: action.val,
          },
        },
      };
    case "VALIDATE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            warning: action.warning,
          },
        },
      };
    default:
      return state;
  }
};

const useForm = (inputs: object = DEFAULT_INPUTS) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const [formState, dispatch]: [any, any] = useReducer(formReducer, {
    inputs: { ...inputs },
    isValid: false,
  });

  const onChangeHandler = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string
    ) => {
      dispatch({ type: "CHANGE_VALUE", val: event.target.value, id });
    },
    [dispatch]
  );

  const onCheckValidity = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string,
      validators: object
    ) => {
      dispatch({
        type: "VALIDATE_INPUT",
        warning: ValidateInput(event.target.value, validators),
        id,
      });
    },
    [ValidateInput, dispatch]
  );

  const onPickFileHandler = () => {
      filePickerRef!.current!.click();
  };

  const pickedHandler = (event:ChangeEvent<HTMLInputElement>, id:any) => {
    if(event.target.files && event.target.files.length === 1) {
      dispatch({type: 'CHANGE_VALUE', val: event.target.value, id})
  }
}

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

  const displayForm = inputsArr.map((el) =>
    el.input.elementType === "filepicker" ? (
      <Tooltip style={{margin: '10px auto'}} title="Add Profile Image">
        <Fab onClick={onPickFileHandler} size="medium" color="primary">
          <Face />
          <input ref={filePickerRef} onChange={(event) => pickedHandler(event, el.id)} type="file" hidden accept=".jpg,.png,.jpeg" />
        </Fab>
      </Tooltip>
    ) : (
      <TextField
        key={el.id}
        onChange={(event) => onChangeHandler(event, el.id)}
        onBlur={(event) => onCheckValidity(event, el.id, el.input.validatiors)}
        multiline={el.input.elementType === "textarea" ? true : false}
        rows={el.input.rows ? el.input.rows : undefined}
        rowsMax={el.input.rowsMax ? el.input.rowsMax : undefined}
        type={el.input.inputType ? el.input.inputType : undefined}
        select={el.input.inputType === "select" ? true : false}
        value={el.input.value}
        variant="outlined"
        required={el.input.required}
        label={el.input.label}
        error={!!el.input.warning}
        helperText={el.input.warning}
      />
    )
  );

  return { formState, displayForm, setData };
};

export default useForm;
