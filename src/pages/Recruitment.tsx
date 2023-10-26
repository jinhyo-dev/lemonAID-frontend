import List from "../components/List/List.tsx";
import { AuthProps } from '../interface/AuthProps.ts';

const Recruitment:React.FC<AuthProps> = ({authorized}) => {
  return (
    <List $type={'recruitment'} authorized={authorized}/>
  )
}

export default Recruitment