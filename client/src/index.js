import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import App from './components/App';
import reducers from './reducers';

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, {}, composeWithDevTools(middleware));

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

export default connect();