import { useAppSelector } from "../../../app/hooks"
import { CoordiView } from "./CoordiView";
import { RootView } from "./RootView";

export const StudentPage = () => {
    const { role } = useAppSelector(state => state.auth);

    if(role === 'ROOT') return <RootView />
    else if(role === 'COORDI') return <CoordiView />
    else return null;
}