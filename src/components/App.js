import React from 'react';
import './App.css';
import Header from "./Header/Header";
import Home from "./Home/Home"
import {Route , Switch, Redirect} from 'react-router-dom';
import Recipes from "./Recipes/Recipes";
import CreateRecipe from "./Recipes/CreateRecipe/CreateRecipe";
import {Container} from "react-bootstrap";

const App = () => {
  return (
    <>

        <Container>
            <Header/>
            <Switch>
                <Route path={'/accueil'} component={Home}/>
                <Route path={'/recettes/ajouter'} component={CreateRecipe}/>
                <Route path={'/recettes/ajouter'} component={CreateRecipe}/>
                <Route path={'/recettes'} component={Recipes}/>
                <Redirect to="/accueil"/>
            </Switch>
        </Container>
    </>
  );
}

export default App;
