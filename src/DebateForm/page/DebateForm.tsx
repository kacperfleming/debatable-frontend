import { Fragment, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import useDebate from "../../shared/hooks/use-debate";
import useForm from "../../shared/hooks/use-form";
import useHttp from "../../shared/hooks/use-http";
import Form from "../../shared/UIElements/Form";
import { isPropertyDeclaration } from "typescript";
import { PanoramaSharp } from "@material-ui/icons";

type props = {
  editMode?: boolean;
};

type auth = {
  userId?: string;
};

type debates = {
  debates?: [any];
};

interface reduxState {
  auth: auth;
  debates: debates;
}

const NewDebate = (props: props) => {
  const {addDebate, getDebateById, editDebate, data:debate, isBlocked} = useDebate();
  const userId = useSelector((state: reduxState) => state.auth.userId);

  const history = useHistory();
  const params:{did?:string} = useParams();

  const { formState, displayForm, setData } = useForm(onSubmitHandler);

  if(debate && userId !== debate.creator) history.goBack();

  useEffect(() => {
    !!params.did && !isBlocked && getDebateById(params.did);
    setData({
      title: {
        elementType: "input",
        inputType: "text",
        value: debate ? debate.title : '',
        label: "title",
        required: true,
        disabled: !!params.did,
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
        value: debate ? debate.description : '',
        label: "description",
        required: false,
        warning: "",
        validatiors: {
          maxLength: 300,
        },
      },
    });
  }, [setData, debate, params.did]);

  function onSubmitHandler() {
    !!params.did ? editDebate(params.did, formState.inputs.description.value) : addDebate({title: formState.inputs.title.value, description: formState.inputs.description.value})
  }

  return (
    <Fragment>
      <Form headline="New Debate" onSubmit={onSubmitHandler}>
        {displayForm}
      </Form>
    </Fragment>
  );
};

export default NewDebate;
