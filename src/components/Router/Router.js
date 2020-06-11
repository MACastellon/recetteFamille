import React, {useContext} from "react";
import {Route , Switch, Redirect} from 'react-router-dom';
import {Container} from "react-bootstrap";
import Header from "../Header/Header";
import ModifyRecipe from "../Recipes/ModifyRecipe/ModifyRecipe";
import CreateRecipe from "../Recipes/CreateRecipe/CreateRecipe";
import Recipes from "../Recipes/Recipes";
import Login from "../Login/Login";
import Home from "../Home/Home";
import AuthContext from "../../contexts/AuthContext";

const Router = (props) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser)
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            currentUser !=null
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
    return (
        <>
            <Container>
                <Header/>
                <Switch>
                    <PrivateRoute path={'/recettes/modifier/:id'} component={ModifyRecipe}/>
                    <Route path={'/recettes/ajouter'} component={CreateRecipe}/>
                    <Route path={'/recettes'}  component={Recipes}/>
                    <Route path={'/connexion'} component={Login}/>
                    <Route path={'/accueil'} component={Home}/>
                    <Redirect to="/accueil"/>
                </Switch>
            </Container>
        </>
    )
}
export default Router;