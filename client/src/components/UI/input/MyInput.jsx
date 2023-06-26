import cl from "./myInput.module.css";

const MyInput = (props) => {
    return ( 
        <input {...props} className={cl.MyInput}/>
     );
}
 
export default MyInput;