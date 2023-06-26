import { NavLink } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";
import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { login } from '../http/userApi';
import { Context } from "..";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import './../style/registration_And_Authorization_Page.css';


const AuthorizationPage = observer(() => {
    const { user } = useContext(Context);
    const [log, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const authorization = async (event) => {
        event.preventDefault();
        let data;
        try {
            data = await login(log, password);
            if (data.message) {
                alert(data.message);
            } else {
                user.setUser(data);
                user.setIsAuth(true);
            }
        } catch (error) {
            alert("Пожалуйста введите данные");
        }
    }

    return (
        <div className='authorization_content'>
            <h1>Окно авторизацции</h1>
            <form name="authorizationForm" className="authorizationForm">
                <div className="boxInput">
                    <label htmlFor="login">Логин пользователя</label>
                    <MyInput type="text"
                        id="login"
                        placeholder="Введите логин"
                        autoComplete="off"
                        value={log}
                        onChange={event => setLogin(event.target.value)} />
                </div>

                <div className="boxInput">
                    <label htmlFor="password">Пароль пользователя</label>
                    <MyInput type="password"
                        id="password"
                        placeholder="Введите пароль"
                        autoComplete="off"
                        value={password}
                        onChange={event => setPassword(event.target.value)} />
                </div>
                <div className="bottomPanelWithButtons" >
                    <div className="transitionLabel">
                        Нужен аккаунт? <span><NavLink to={REGISTRATION_ROUTE}>Регистрируйте!</NavLink></span>
                    </div>
                    <MyButton onClick={authorization}>Авторизация</MyButton>
                </div>
            </form>
        </div>

    );
})

export default AuthorizationPage;