/**IMPORTS */
import { useState, useEffect } from 'react';
import { Navigate  } from 'react-router-dom';
import { db, auth } from '../../firebaseConnection';
import '../../assets/style.css';
/**IMPORTS  FIRESTORE */
import {
    doc,
    setDoc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    onSnapshot
} from 'firebase/firestore';

/**IMPORT AUTHENTICATION */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

function Login() {

    // Estado para armazenar o email e a senha do usuário.
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Estado para verificar se o usuário está logado.
    const [user, setUser] = useState(false);

    // Estado para armazenar os detalhes do usuário logado.
    const [userDetail, setUserDetail] = useState({});

    // Efeito que verifica se o usuário está logado quando o componente é montado.
    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(true);
                    setUserDetail({
                        uid: user.uid,
                        email: user.email
                    });
                } else {
                    setUser(false);
                    setUserDetail({})
                }
            })
        }
        checkLogin();
    }, [])


    // Função para criar um novo usuário no Firebase Auth.
    async function novoUsuario() {
        await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                console.log("CADASTRADO COM SUCESSO!");
                setEmail('');
                setSenha('');
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert("Senha muito fraca.");
                } else if (error.code === 'auth/email-already-in-use') {
                    alert("Email já existe!");
                }
            })
    }

    // Função para fazer login de um usuário no Firebase Auth.
    async function logarUsuario() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then((value) => {
                alert("USER LOGADO COM SUCESSO");
                setUserDetail({
                    uid: value.user.uid,
                    email: value.user.email,
                })
                setUser(true);
                setEmail('');
                setSenha('');

            })
            .catch(() => {
                console.log("ERRO AO FAZER O LOGIN");
            })
    }

    if (user) {
        return <Navigate  to="/listaLivro" />;
    }
    
    // Renderização do componente de Login.
    return (
        <div className="login-container">
            <h1>LIVRARIA DA TROPA</h1>
            <div className="login-form">
                <h2>LOGIN or SIGNUP</h2>
                <div className='fullAlignFlex'>
                    <label>Email </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite um email"
                    /> <br />
                    <label>Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Informe sua senha"
                    /> <br />
                </div>
                <div className='fullAlignFlex'>
                    <button onClick={logarUsuario}>Fazer login</button>
                    <button onClick={novoUsuario}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}
export default Login;