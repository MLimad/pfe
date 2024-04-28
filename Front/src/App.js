import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Formation from "./components/Formation"
import Participant from "./components/Participant"
import Update from "./components/Update"
import Delete from "./components/Delete"
import Show from './components/Show';
import AddProf from './components/AddProf';
import DeleteParticipant from './components/DeleteParticipant';
import UpdateParticipant from './components/UpdateParticipant';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/"   element={<Home />} />
          <Route path="/formation"   element={<Formation />} />
          <Route path="/show/:id"   element={<Show />} />
          <Route path="/participant/:id"   element={<Participant />} />
          <Route path="/update/:id"   element={<Update />} />
          <Route path="/delete/:id"   element={<Delete />} />
          <Route path="/addProf/:id"   element={<AddProf />} />
          <Route path="/deleteParticipant/:id"   element={<DeleteParticipant />} />
          <Route path="/updateParticipant/:id1/:id2"   element={<UpdateParticipant />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
