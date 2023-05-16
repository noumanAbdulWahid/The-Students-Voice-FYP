import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RouteLinks = (props) =>{
    const { user} = useSelector((state)=> state.AuthReducers);
    return user ? (<Redirect to={'/profile'}/>) : (<Route path={props.path} exact= {props.exact} component={props.component}/>)
};

export default RouteLinks;