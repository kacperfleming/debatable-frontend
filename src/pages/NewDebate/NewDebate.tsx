import { Fragment, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import useDebate from "../../shared/hooks/use-debate";
import useForm from "../../shared/hooks/use-form";
import useHttp from "../../shared/hooks/use-http";
import Form from "../../shared/UIElements/Form";

type props = {};

type auth = {
  token?: string;
};

interface reduxState {
  auth: auth;
}

const NewDebate = (props: props) => {
  const {addDebate} = useDebate();
  const token = useSelector((state: reduxState) => state.auth.token);
  const history = useHistory();

  const { sendRequest, error, isLoading } = useHttp();
  const { formState, displayForm, setData } = useForm(onSubmitHandler);

  useEffect(() => {
    setData({
      title: {
        elementType: "input",
        inputType: "text",
        value: "",
        label: "title",
        required: true,
        warning: "",
        validatiors: {
          minLength: 4,
          maxLength: 128,
        },
      },
      description: {
        elementType: "textarea",
        rows: 8,
        rowsMax: 8,
        value: "",
        label: "description",
        required: false,
        warning: "",
        validatiors: {
          maxLength: 300,
        },
      },
    });
  }, []);

  function onSubmitHandler() {
    addDebate({title: formState.inputs.title.value, description: formState.inputs.description.value})
  }

  return (
    <Fragment>
      {isLoading && <CircularProgress />}
      <Form headline="New Debate" onSubmit={onSubmitHandler}>
        {displayForm}
      </Form>
    </Fragment>
  );
};

export default NewDebate;
