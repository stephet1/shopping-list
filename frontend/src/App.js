import './App.css';
import Header from './containers/Header';
import ShoppingList from './containers/ShoppingList';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {SidePanelContextProvider} from './context/SidePanelContext';
function App() {


  const client = new ApolloClient({
    uri:`http://localhost:7331/graphql`,
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
