import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login/login';
import ListaLivro from './components/ListaLivro/listaLivro';
import Error from './components/Error/error';

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/listaLivro" element={<ListaLivro/>} />
                <Route path="/*" element={<Error/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;