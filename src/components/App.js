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
import Recipe from "./Recipes/Recipe/Recipe";
import RecipesBook from "./RecipesBook/RecipesBook";
import CreateUser from "./Dashboard/CreateUser/CreateUser";
import Favourites from "./Favourites/Favourites";
import UserRecipes from "./UserRecipes/UserRecipes";
const App = () => {


    const showRoute = (context) => {
        return !context.loading ?(
            <>
                {context.currentUser != null ? (
                    <Container>

                        <Header/>
                        <Switch>
                            <Route path={'/recettes/modifier/:id'} component={ModifyRecipe}/>
                            <Route path={'/recettes/:id'} component={Recipe}/>
                            <Route path={'/recettes'}  component={Recipes}/>
                            <Route path={'/utilisateur/creer-recette'} component={CreateRecipe}/>
                            <Route path={'/utilisateur/mes-recettes'} component={RecipesBook}/>
                            <Route path={'/utilisateur/mes-favoris'} component={Favourites}/>
                            {context.currentUser.role === "admin" || context.currentUser.role === "moderator" ? (
                                <Route path={'/utilisateur/inscrire'} component={CreateUser}/>
                            ) : (
                                null
                            )}
                            {context.currentUser.role === "admin" || context.currentUser.role === "moderator" ? (
                                <Route path={'/utilisateur/:id/liste-de-recettes'} component={UserRecipes}/>
                            ) : (
                                null
                            )}
                            <Route path={'/utilisateur/tableau-de-bord'} component={Dashboard}/>
                            <Route path={'/accueil'} component={Home}/>
                            <Redirect to="/accueil"/>
                        </Switch>
                    </Container>
                ) : (
                    <Container>
                        <Header/>
                        <Switch>
                            <Route path={'/recettes/:id'} component={Recipe}/>
                            <Route path={'/recettes'} component={Recipes}/>
                            <Route path={'/utilisateur/connexion'} component={Login}/>
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
