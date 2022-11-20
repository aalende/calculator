import React, { useState, useRef } from 'react'
import '../../src/styles/container.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function Container() {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [numFrom, setNumFrom] = useState("")
    const [numTo, setNumTo] = useState("")
    const [errorText, setErrorText] = useState("")
    const [isErrorFrom, setIsErrorFrom] = useState(false)
    const [isErrorTo, setIsErrorTo] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const options = ['Decimal','Binary','Octal', 'Hexadecimal' ]
    let numberInput = useRef(null);
    const isHexadecimal = numberHexadecimal => /^[0-9A-F]+$/ig.test(numberHexadecimal);
    const isBinary = numberBinary => /^[0-1]+$/ig.test(numberBinary);
    const isOctal = numberOctal => /^[0-7]+$/ig.test(numberOctal);
    const isDecimal = numberOctal => /^[0-9]+$/ig.test(numberOctal);
    
    const handleFrom = (event) => {
        setFrom(event.target.value);
      };

    const handleTo = (event) => {
        setTo(event.target.value);
    };

    
    const handleNumber = (event) => {
        event.preventDefault();
        setNumFrom(numberInput.current.value)
        if(!numFrom) {            
            setErrorText("Please enter a number to convert")
            return            
        } else {
            setErrorText("")
        }
        if(!from){
            setIsErrorFrom(true)
            return
        }else{
            setIsErrorFrom(false)
        }
        if(!to){
            setIsErrorTo(true)
            return
        }else{
            setIsErrorTo(false)
        }
        if(isHexadecimal(numFrom) && from==='Hexadecimal'){
            setShowResult(true)
            switch (to) {
                case 'Decimal':
                    setNumTo(parseInt(numFrom, 16))
                    
                    break;                    
                case 'Binary':
                    setNumTo(parseInt(numFrom, 16).toString(2))
                    break;    
                case 'Octal':
                    setNumTo(parseInt(numFrom, 16).toString(8))
                    break;
                default:
                    break;
            }
        }else if(!isHexadecimal(numFrom) && from==='Hexadecimal'){
            setErrorText("Not Hexadecimal")
            setShowResult(false)    
            return     

        }else if(isBinary(numFrom) && from==='Binary') {
            setShowResult(true)
            switch (to) {
                case 'Decimal':
                    setNumTo(parseInt(numFrom,2))
                    break                    
                case 'Hexadecimal':
                    setNumTo( parseInt(numFrom,2).toString(16).toUpperCase())
                    break    
                case 'Octal':
                    setNumTo(parseInt(numFrom,2).toString(8))
                    break                    
                default:
                    break;
            }
        }else if(!isBinary(numFrom) && from==='Binary'){
            setErrorText("Not Binary")
            setShowResult(false) 
            return   
        }else if(isOctal(numFrom) && from==='Octal') {
            setShowResult(true)
            switch (to) {
                case 'Decimal':
                    setNumTo(parseInt(numFrom,8))
                    break                    
                case 'Hexadecimal':
                    setNumTo(parseInt(numFrom,8).toString(16))
                    break;    
                case 'Binary':
                    setNumTo(parseInt(numFrom,8).toString(2))
                    break;
                default:
                    break;
            }
        }else if(!isOctal(numFrom) && from==='Octal'){
            setErrorText("Not Octal")
            setShowResult(false) 
            return   
        }else if(isDecimal(numFrom) && from==='Decimal') {
            setShowResult(true)
            switch (to) {
                case 'Octal':
                    setNumTo(parseInt(numFrom,10).toString(8))
                    break                  
                case 'Hexadecimal':
                    setNumTo(parseInt(numFrom,10).toString(16))
                    break;    
                case 'Binary':
                    setNumTo(parseInt(numFrom,10).toString(2))
                    break;
                default:
                    break;
            }
        }else if(!isDecimal(numFrom) && from==='Decimal'){
            setErrorText("Not Decimal")
            setShowResult(false)
            return
        }
    };  
    
    return (
    <div>
        <div className='block'>
            <h1>Calculator</h1>
            <TextField 
                fullWidth
                id="number"
                name="number"
                label="Number to convert"
                inputRef={numberInput}
                required
                type="text"
                placeholder='Number'
                error={!!errorText}
                helperText={errorText} 
                onChange={e => {
                    setShowResult(false)
                    setNumFrom(e.target.value)
                } } 
            />
            <FormControl sx={{ mt: 10, mr: 5,  minWidth: 200}} error={isErrorFrom}>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={from}
                    label="From"
                    autoWidth
                    onChange={handleFrom}
                    required
                    >   
                    {options.map((index) =>
                    <MenuItem key={index} value={index}>{index}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{ mt: 10, minWidth: 200}} error={isErrorTo}>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={to}
                    label="To"
                    autoWidth
                    onChange={handleTo}
                    required
                    >
                    {options.filter(item => item !== from ).map((item, index) =>
                    <MenuItem key={index} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
            <Button onClick={handleNumber} variant="contained" sx={{mt:11.5, ml:7}} >Convert</Button>
            { showResult &&
            <p> <span><b>{`${numFrom}`}</b></span> {`in ${from} is`} <span><b>{` ${numTo} `}</b></span>{`in ${to}`}</p> }
        </div>                   
    </div>
    )
}

export default Container
