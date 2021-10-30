import './App.css';
import Nav from './components/common/Nav';
import PageContainer from './components/PageContainer'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import pageConfigs from './pageConfigs';

function App() {

  return (
    <Router>
      <div className="App">
        <Nav pages={pageConfigs} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/warehouses" />
          </Route>
          {pageConfigs.map(({ name, url, primaryData, secondaryData }) => (
            <Route
              key={name} 
              path={url} 
              render={props => <PageContainer { ...props } name={name} url={url} primaryData={primaryData} secondaryData={secondaryData} />}
            />))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
