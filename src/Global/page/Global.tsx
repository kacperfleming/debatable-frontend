import useDebates from "../../shared/hooks/use-debates";

type Props = {

};

const Global = (props: Props) => {
  const debates = useDebates({url: 'debates', auth: false});

  return debates;
};

export default Global;
