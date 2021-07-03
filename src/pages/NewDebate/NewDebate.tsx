import { useEffect } from "react";

import useForm from "../../shared/hooks/use-form";
import useHttp from "../../shared/hooks/use-http";
import Form from '../../shared/UIElements/Form';



type props = {};

const NewDebate = (props: props) => {
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

  function onSubmitHandler () {
    sendRequest('http://localhost:5000/debates', 'POST', {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    })
    .then(response => {

    })
    .catch(err => {
      
    });
  }

  return (
    <Form headline="New Debate" onSubmit={onSubmitHandler}>
        {displayForm}
    </Form>
  );
};

export default NewDebate;
