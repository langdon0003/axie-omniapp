import { BrowserRouter, Route, Switch } from "react-router-dom"
import AccountProvider from "./components/auth/AccountProvider.js"
import HomePage from "./views/home/HomePage.js"
import LoginPage from "./views/login/LoginPage.js"
import ScholarsPage from "./views/scholars/scholarList/ScholarListPage.js"
import ScholarSlpPage from "./views/scholars/scholarSlp/ScholarSlpPage.js"
import "./App.css"

const Pages = [
    { name: "Dashboard", component: HomePage, url: "/", description: "An overview of your account" },
    { name: "Scholars List", component: ScholarsPage, url: "/scholars", description: "Manage your scholars" },
    { name: "Scholar SLP Tracker", component: ScholarSlpPage, url: "/scholars/slp", description: "Track your scholar earnings" },
    { name: "Breeding Tree", component: ScholarSlpPage, url: "/breeding", description: "Manage breeding" }
]

const AuthenticatedRoute = (routeProps) => {
    return (
        <AccountProvider
            description={Pages.find(page => page.url === window.location.pathname).description}
            header={Pages.find(page => page.url === window.location.pathname).name}
            tabs={Pages}
            Target={routeProps.target} />
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                {Pages.map(page => <AuthenticatedRoute exact key={page.name} path={page.url} target={page.component} />)}
            </Switch>
        </BrowserRouter>
    )
}

export default App