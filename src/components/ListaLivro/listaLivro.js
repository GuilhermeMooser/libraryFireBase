// Importa os hooks useState e useEffect do React, que são essenciais para o
//funcionamento do componente.
import { useState, useEffect } from "react";
// Importa as funções de conexão com o Firebase e as operações de banco de dados do
//Firestore.
import { db, auth } from "../../firebaseConnection";

import { Navigate } from "react-router-dom";

// Importa funções específicas do Firestore para manipulação de documentos e coleções.
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
// Importa funções de autenticação do Firebase para criar usuários, fazer login e logout.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function ListaLivro() {
  // Estado para armazenar o título do livro.
  const [descricao, setDescricao] = useState("");
  // Estado para armazenar o autor do livro.
  const [autor, setAutor] = useState("");
  // Estado para armazenar o ID do livro a ser editado ou excluído.
  const [titulo, setTitulo] = useState("");
  // Estado para armazenar o ID do livro a ser editado ou excluído.
  const [idLivro, setIdLivro] = useState("");
  //Lista dos livros
  const [livros, setLivros] = useState([]);

  // Estado para verificar se o usuário está logado.
  const [user, setUser] = useState(true);
  // Estado para armazenar os detalhes do usuário logado.
  const [userDetail, setUserDetail] = useState({});

  async function logoutUsuario() {
    try {
      await signOut(auth);
      setUser(false);
      setUserDetail({});
    } catch (error) {
      console.log("ERRO AO FAZER O LOGOUT");
    }
  }

  // Função para excluir um livro\ do Firestore.
  async function excluirLivro(id) {
    const docRef = doc(db, "livros", id);
    await deleteDoc(docRef).then(() => {
      alert("LIVRO DELETADO COM SUCESSO!");
    });
  }

  // Efeito que carrega os livros do Firestore sempre que o componente é montado.
  useEffect(() => {
    async function loadLivros() {
      const unsub = onSnapshot(collection(db, "livros"), (snapshot) => {
        let listaLivros = [];
        snapshot.forEach((doc) => {
          listaLivros.push({
            id: doc.id,
            autor: doc.data().autor,
            descricao: doc.data().descricao,
            titulo: doc.data().titulo,
          });
        });
        setLivros(listaLivros);
      });
    }
    loadLivros();
  }, []);

  async function handleAdd() {
    await addDoc(collection(db, "livros"), {
      titulo: titulo,
      autor: autor,
      descricao: descricao,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO");
        setAutor("");
        setTitulo("");
        setDescricao("");
      })
      .catch((error) => {
        console.log("ERRO " + error);
      });
  }

  // Função para buscar todos os livros do Firestore.
  async function buscarLivro() {
    const livrosRef = collection(db, "livros");
    await getDocs(livrosRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
            descricao: doc.data().descricao,
          });
        });
        setLivros(lista);
      })
      .catch((error) => {
        console.log("DEU ALGUM ERRO AO BUSCAR");
      });
  }

  async function editarLivro() {
    const docRef = doc(db, "livros", idLivro);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
      descricao: descricao,
    })
      .then(() => {
        console.log("LIVRO ATUALIZADO!");

        setIdLivro("");
        setTitulo("");
        setAutor("");
        setDescricao("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  // Renderização do componente dA Lista de Livros.
  return (
    <div className="login-container">
      <h1>LIVRARIA DA TROPA</h1>
      <div>
        <h2>Cadastre, busque ou atualize !</h2>
        <label>ID do LIVRO:</label>
        <input
          placeholder="Digite o ID do livro"
          value={idLivro}
          onChange={(e) => setIdLivro(e.target.value)}
        />{" "}
        <br />
        <label>Titulo:</label>
        <input
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <br></br>
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do livro"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <label>Descrição:</label>
        <input
          type="text"
          placeholder="Descrição do livro"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div className="alignButtons">
          <button onClick={handleAdd}>Cadastrar</button>
          <button onClick={buscarLivro}>Buscar livro</button> <br />
          <button onClick={editarLivro}>Atualizar livro</button>
        </div>
      </div>
      <h2>LIVROS</h2>
      <ul className="livros-list">
        {livros.map((livro) => {
          return (
            <li key={livro.id} className="livro-item">
              <strong>ID: {livro.id}</strong> <br />
              <span>Titulo: {livro.titulo} </span> <br />
              <span>Autor: {livro.autor}</span> <br />
              <span>Descrição: {livro.descricao}</span> <br />
              <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
      <button onClick={logoutUsuario}>DESLOGAR</button>
    </div>
  );
}

export default ListaLivro;
