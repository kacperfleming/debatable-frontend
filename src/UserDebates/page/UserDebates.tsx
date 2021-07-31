import { useParams } from "react-router";

import useDebates from "../../shared/hooks/use-debates";

interface Props {
  
};

const UserDebates = (props: Props) => {
  const params:any = useParams();
  const debates = useDebates({url: `debates/user/${params.uid}`, auth: false});

  return debates;
};

export default UserDebates;
