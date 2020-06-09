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

const App = () => {

    const showRoute = (context) => {
        return context.currentUser != null? (
            <>
                <Container>
                    <Header/>
                    <Switch>
                        <Route path={'/recettes/modifier/:id'} component={ModifyRecipe}/>
                        <Route path={'/recettes/ajouter'} component={CreateRecipe}/>
                        <Route path={'/recettes'} component={Recipes}/>
                        <Route path={'/accueil'} component={Home}/>
                        <Redirect to="/accueil"/>
                    </Switch>
                </Container>
            </>

        ) : (
            <Container>
                <Header/>
                <Switch>
                    <Route path={'/accueil'} component={Home}/>
                    <Route path={'/connexion'} component={Login}/>
                    <Route path={'/recettes'} component={Recipes}/>
                    <Redirect to="/accueil"/>
                </Switch>
            </Container>
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
