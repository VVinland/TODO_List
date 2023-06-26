const MySelect = ({ defaultValue, value, options, onChange, ...props }) => {
    return (
        <select
            value={value}
            onChange={event=>onChange(event.target.value)}
            {...props}
        >
            <option value=""  hidden >{defaultValue}</option>
            {options.map(item => 
            <option key={item.value||item.id} value={item.value||item.login}>{item.name||item.login}</option>)}
        </select>
    );
}

export default MySelect;