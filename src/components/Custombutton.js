import Button from 'react-bootstrap/Button'
const CustomButton = (props) => {

  return (
    <div>

      <Button
        type={props.type}
        variant={props.variant}
        value={props.value}
      >
        {props.value}
      </Button>

    </div>
  )
};

export default CustomButton