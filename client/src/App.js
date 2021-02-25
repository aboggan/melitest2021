import SearchBar from './components/SearchBar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import './styles/main.scss';


function App() {
  
  

  return (
    <Router>
      <div className="app">
        <header>
          <SearchBar />
        </header>
        <main className="container">
          <section>
            <Route  path="/" exact component={Home} />
          </section>
          <section>
            <Route path="/search" component={SearchResults} />
          </section>
          <section>
            <Route path="/item/:id" component={ItemDetail}/>
          </section>
        </main>
      </div>

    </Router>
  );
}

export default App;
