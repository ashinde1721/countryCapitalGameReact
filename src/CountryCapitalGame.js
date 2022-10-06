import React, {useState, useEffect} from "react";

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

 const shuffleObject = (obj) => {
    const shuffledKeys = shuffle(Object.keys(obj));
    const shuffledValues = shuffle(Object.values(obj));
    return shuffledKeys.reduce((prev, next, index) => {
        prev[next] = shuffledValues[index];
        return prev;
    },{})
 } 


export default function CountryCapitalGame({data}) {
    const [gameData, setGameData] = useState({});
    const [country, setCountry] = useState(null);
    const [capital, setCapital] = useState(null);
    const [isIncorrectChoice, setIncorrectChoice]  = useState(false);

    function startAgain() {
        setCapital(null);
        setCountry(null);
    }

    useEffect(() => {
        setGameData(shuffleObject(data));
    },[])

    useEffect(() => {
        if(country && capital) {
            if(capital === data[country]) {
                delete(data[country]);
                setGameData(shuffleObject(data));
                startAgain();
                setIncorrectChoice(false);
            } else {
                setIncorrectChoice(true);
            }
        } 
         
    },[country, capital]);

    

    function selectCountry(value) {
        if(isIncorrectChoice && !!capital) {
            startAgain();
            setIncorrectChoice(false); 
        } 
        setCountry(value);
    }

    function selectCapital(value) {
        if(isIncorrectChoice && !!country) {
            startAgain();
            setIncorrectChoice(false); 
        } 
        setCapital(value);
    }

    const getCountryBackgroudColor = (val) => {
        if(val === country && !capital) {
            return "blue";
        }
        if(val && val === country) {
            if(data[val] !== capital){
                return "red";
            }
        }
        return "";

    }

    const getCapitalBackgroundColor =(val) => {
        if(val === capital && !country) {
            return "blue";
        }
        if(val && val === capital) {
            if(data[country] !== capital){
                return "red";
            }
        }
        return "";

    }

    return (
        gameData && Object.keys(gameData).length ? (
            Object.entries(gameData).map(([key, value]) => {
                return <React.Fragment key={key}>
                    <button 
                        style={{backgroundColor: getCountryBackgroudColor(key)}}
                        onClick={()=>selectCountry(key)}>{key}</button>
                    <button 
                        style={{backgroundColor: getCapitalBackgroundColor(value)}}
                        onClick={()=>selectCapital(value)}>{value}</button>
                </React.Fragment>
            })

           ) : (<>Congratulations</>)
        
    )
}
