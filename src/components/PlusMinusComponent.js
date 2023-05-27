import React, { useState } from 'react'
import { Button, InputGroup } from 'react-bootstrap';

export default function PlusMinusComponent() {

    const [num, setNum] = useState(0);

    const incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
        }
    };

    const decNum = () => {
        if (num > 0) {
            setNum(Number(num) - 1);
        }
    };

    const handleChange = (e) => {
        setNum(e.target.value);
    }

    return (
        <>
            <InputGroup onChange={handleChange}>
            <Button variant='outline-primary' onClick={decNum} style={{marginRight:"10px"}}>-</Button>
            {num}
            <Button variant='outline-primary' onClick={incNum} style={{marginLeft:"10px"}}>+</Button>                
            </InputGroup>
        </>
    )
}