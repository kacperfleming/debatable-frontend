import { ChangeEvent, useReducer, useCallback, useRef, Fragment } from "react";
import { TextField, Tooltip, Fab, makeStyles } from "@material-ui/core";
import { Face, Check } from "@material-ui/icons";

import CustomButton from "../UIElements/Button";
import validateInput from "../utils/validateInput";

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
  type: "SET_DATA" | "CHANGE_VALUE" | "VALIDATE_INPUT" | "SET_FORM_VALIDITY";
  data?: object;
  id?: any;
  val?: any;
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
    case "SET_FORM_VALIDITY":
      return {
        ...state,
        formIsValid: action.val
      }
    default:
      return state;
  }
};

const useStyles = makeStyles(theme => ({
  button: {
    transition: theme.transitions.create(['transform', 'box-shadow', 'background-position-x'], {
      duration: theme.transitions.duration.standard, easing: theme.transitions.easing.easeOut
    })
  }
}));

const useForm = (onSubmitHandler: () => void, inputs: object = DEFAULT_INPUTS, buttonText?:string, buttonStyles?:string) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const styles = useStyles();

  const [formState, dispatch]: [any, any] = useReducer(formReducer, {
    inputs: { ...inputs },
    formIsValid: false,
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
        warning: validateInput(event.target.value, validators),
        id,
      });
    },
    [dispatch]
  );

  const onPickFileHandler = () => {
      filePickerRef!.current!.click();
  };

  const pickedHandler = (event:ChangeEvent<HTMLInputElement>, id:any) => {
    if(event.target.files && event.target.files.length === 1) {
      console.log(event.target.files[0]);
      console.log(formState.inputs[id]);
      setData({
        ...formState.inputs,
        [id]: {
          ...formState.inputs[id],
          value: event.target.files[0],
          isValid: true
        }
      });
      return;
  } else {
    setData({
      ...formState.inputs,
      [id]: {
        ...formState.intpus[id],
        value: '',
        isValid: false
      }
    });
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

  const onSubmitForm = () => {
    for(let input in formState.inputs) {
      if(!formState.inputs[input].required && !formState.inputs[input].value) {
        continue;
      } else if(formState.inputs[input].warning) {
        console.log(`${input}: ${!!formState.inputs[input].warning}`);
        dispatch({type: "SET_FORM_VALIDITY", val: false});
        return;
      }
    }
    dispatch({type: "SET_FORM_VALIDITY", val: true});
    console.log("FORM IS VALID");
    onSubmitHandler();
  }

  const mappedInputs = inputsArr.map((el) =>
    el.input.elementType === "filepicker" ? (
      <Tooltip key={el.id} style={{margin: '10px auto', backgroundColor: el.input.isValid ? 'green' : ''}} title={el.input.isValid ? "File Added Successfully" : "Add Profile Image"}>
        <Fab onClick={onPickFileHandler} size="medium" color="primary">
          {el.input.isValid ? <Check /> : <Face />}
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
        disabled={el.input.disabled}
        focused={el.input.focused}
        label={el.input.label}
        error={!!el.input.warning}
        helperText={el.input.warning}
      />
    )
  );

  const displayForm = (
    <Fragment>
      {mappedInputs}
      <CustomButton className={styles.button} onClick={onSubmitForm}>{buttonText || 'Submit'}</CustomButton>
    </Fragment>
  )

  return { formState, displayForm, setData };
};

export default useForm;
