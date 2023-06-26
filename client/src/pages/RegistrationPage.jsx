import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useState } from 'react';
import { registration } from '../http/userApi';
import { observer } from 'mobx-react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import './../style/registration_And_Authorization_Page.css';

const RegistrationPage = observer(() => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [supervisor, setSupervisor] = useState("");

    const reg = async (event) => {
        event.preventDefault();
        let data;
        try {
            data = await registration(
                firstName,
                middleName,
                lastName,
                login,
                password,
                supervisor
            )
            if (data.message) {
                alert(data.message)
            } else {
                alert("Пользователь успешно зарегистрировался")
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setLogin("");
                setPassword("");
                setSupervisor("");
            }
        } catch (error) {
            alert("Пожалуйста введите данные")
        }
    }

    return (
        <div className='registration_content'>
            <h1>Окно регистрации</h1>
            <form name="registrationForm" className='registrationForm'>
                <div>
                    <div className="boxInput">
                        <label htmlFor="firstName">Имя пользователя</label>
                        <MyInput
                            type="text"
                            id="firstName"
                            placeholder="Введите имя"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            autoComplete="off" />
                    </div>

                    <div className="boxInput">
                        <label htmlFor="lastName">Фамилия пользователя</label>
                        <MyInput type="text" id="lastName" placeholder="Введите фамилию"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            autoComplete="off" />
                    </div>

                    <div className="boxInput">
                        <label htmlFor="middleName">Отчество пользователя</label>
                        <MyInput type="text" id="middleName" placeholder="Введите отчество"
                            value={middleName}
                            onChange={(event) => setMiddleName(event.target.value)}
                            autoComplete="off" />
                    </div>

                    <div className="boxInput">
                        <label htmlFor="login">Логин пользователя</label>
                        <MyInput type="text" id="login" placeholder="Введите логин"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}
                            autoComplete="off" />
                    </div>

                    <div className="boxInput">
                        <label htmlFor="password">Пароль пользователя</label>
                        <MyInput type="password" id="password" placeholder="Введите пароль"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="off" />
                    </div>

                    <div className="boxInput">
                        <label htmlFor="supervisor">Руководитель пользователя</label>
                        <MyInput type="text" id="supervisor" placeholder="Введите логин руководителя"
                            value={supervisor}
                            onChange={(event) => setSupervisor(event.target.value)}
                            autoComplete="off" />
                    </div>
                </div>
                <div className="bottomPanelWithButtons" >
                    <div className="transitionLabel">
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                    </div>
                    <MyButton onClick={reg}>Регистрация</MyButton>
                </div>
            </form>
        </div>



    );
})

export default RegistrationPage;