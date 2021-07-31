import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Debate } from "../../shared/hooks/use-debate";

import useDebate from "../../shared/hooks/use-debate";
import useForm from "../../shared/hooks/use-form";
import Form from "../../shared/UIElements/Form";

type auth = {
  userId?: string;
};

type debates = {
  debates?: Debate[];
};

interface reduxState {
  auth: auth;
  debates: debates;
}

const useDebateForm = () => {
  const {addDebate, getDebateById, editDebate, data:debate, isBlocked} = useDebate();
  const userId = useSelector((state: reduxState) => state.auth.userId);

  const history = useHistory();
  const params:{did?:string} = useParams();

  const { formState, displayForm, setData } = useForm(onSubmitHandler);

  if(params.did && debate.length > 0 && (userId !== debate.creator)) history.goBack();

  useEffect(() => {
    !!params.did && !isBlocked && getDebateById(params.did);
    if(params.did && debate.length < 1) return;
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
  }, [setData, debate, params.did, getDebateById, isBlocked]);

  function onSubmitHandler() {
    !!params.did ? editDebate(params.did, formState.inputs.description.value) : addDebate({title: formState.inputs.title.value, description: formState.inputs.description.value})
  }

  return (
    <>
    <Fragment>
      <Form headline="New Debate" onSubmit={onSubmitHandler}>
        {displayForm}
      </Form>
    </Fragment>
    </>
  );
};

export default useDebateForm;
