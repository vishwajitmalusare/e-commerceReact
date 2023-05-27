const TextInput = ( { id, type, placeholder, onChange } ) => {
    
  return (
    <div>
   
    <input
    id={id} 
    type={type} 
    placeholder={placeholder}
    required
    onChange={onChange}
    >
    </input>
    
    </div>
  )
};

export default TextInput