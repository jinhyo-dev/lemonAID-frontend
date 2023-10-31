import List from "../components/List/List.tsx";
import { AuthProps } from '../interface/AuthProps.ts';

const Recruitment:React.FC<AuthProps> = ({authorized, permission}) => {
  return (
    <List $type={'recruitment'} authorized={authorized} permission={permission}/>
  )
}

export default Recruitment