import './App.css';
import Header from './containers/Header';
import ShoppingList from './containers/ShoppingList';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {SidePanelContextProvider} from './context/SidePanelContext';

const port =  process.env.BACKEND_PORT||'7331';

function App() {
  const client = new ApolloClient({
    uri:`http://localhost:${port}/graphql`,
    cache: new InMemoryCache()
  });


  return (
    <div className="App">
      <Header/>
      <ApolloProvider client={client}>
        <SidePanelContextProvider>
          <ShoppingList/>
        </SidePanelContextProvider> 
      </ApolloProvider>
    </div>
  );
}

export default App;
