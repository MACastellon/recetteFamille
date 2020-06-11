import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Home from "./Home/Home"
import {Route , Switch, Redirect} from 'react-router-dom';
import Recipes from "./Recipes/Recipes";
import CreateRecipe from "./Recipes/CreateRecipe/CreateRecipe";
import Login from "./Login/Login";
import {Container} from "react-bootstrap";
import {AuthProvider,AuthConsumer} from "../contexts/AuthContext";
import ModifyRecipe from "./Recipes/ModifyRecipe/ModifyRecipe";
import Dashboard from "./Dashboard/Dashboard";
const App = () => {


    const showRoute = (context) => {
        return !context.loading ?(
            <>
                {context.currentUser != null ? (
                    <Container>
                        {console.log("connecter")}
                        <Header/>
                        <Switch>
                            <Route path={'/recettes/modifier/:id'} component={ModifyRecipe}/>
                            <Route path={'/recettes/ajouter'} component={CreateRecipe}/>
                            <Route path={'/recettes'} component={Recipes}/>
                            <Route path={'/tableau-de-bord'} component={Dashboard}/>
                            <Route path={'/accueil'} component={Home}/>
                            <Redirect to="/accueil"/>
                        </Switch>
                    </Container>
                ) : (
                    <Container>
                        {console.log("pas Co")}
                        <Header/>
                        <Switch>
                            <Route path={'/recettes'} component={Recipes}/>
                            <Route path={'/connexion'} component={Login}/>
                            <Route path={'/accueil'} component={Home}/>
                            <Redirect to="/accueil"/>
                        </Switch>
                    </Container>
                )}

            </>
        ) : (
            null
        )
    }
  return (
    <>
        <AuthProvider>
                <AuthConsumer>
                    {showRoute}
                </AuthConsumer>
        </AuthProvider>

    </>
  );
}

export default App;
