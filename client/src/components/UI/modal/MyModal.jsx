import cl from "./myModal.module.css";

const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [cl.MyModal];
    if(visible){
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={cl.MyModal_content} onClick={event=>event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;