import './App.css';
import Nav from './components/common/Nav';
import PageContainer from './components/PageContainer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import pageConfigs from './pageConfigs';
import { createStore } from 'redux';
import allReducers from './redux/reducers';
import { Provider } from 'react-redux';

function App() {

// STORE -> GLOBALIZED STATE
let store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return (
    <Provider store= {store}>
      <Router>
        <div className="App">
          <Nav pages={pageConfigs} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/warehouses" />
            </Route>
            {pageConfigs.map(({ type, url }) => (
              <Route
                key={type} 
                path={url} 
                render={props => (
                  <PageContainer { ...props } 
                    type={type} 
                  />)}
              />))}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
