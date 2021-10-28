import React  from "react";
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './Pages/Navbar';
import Post from './Pages/Post';
import Createpost from './Pages/Createpost';
import Postupdate from './Pages/Postupdate';


function App() {
  return (

    <Router>
     <Navbar/>
     <Switch>
          <Route exact path='/' component={Post} />
          <Route exact path='/create' component={Createpost} />
          <Route exact path='/update/:id' component={Postupdate} />
        </Switch>
    </Router>


  );
}

export default App;
