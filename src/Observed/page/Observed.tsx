import useDebates from "../../shared/hooks/use-debates";

interface Props {};

const Observed = (props: Props) => {

  const debates = useDebates({url: "users/observed", auth: true});



  return debates;
};

export default Observed;
