import React from "react";
import memesData from "../memesData";

export default function Meme(){

    
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomeImage: "http://i.imgflip.com/1bij.jpg",
        count: 0
    })

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(()=>{
        console.log("asd")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data =>setAllMeme(data.data.memes))
    },[meme.count])


    console.log(allMeme)




    function handleInput(event){
        const {name, value} = event.target
        setMeme(prevMeme =>{
            return {
                ...prevMeme,
                [name]:value
            }
        })
    }


    function getMemeImage(){
        const randomNumber = Math.floor(Math.random()*allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme =>{
            return{
                ...meme,
                randomeImage:url,
                count:prevMeme.count + 1
            }
        })
    }

    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleInput}
                    name="topText"
                    value={meme.topText}
                    
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleInput}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼️
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomeImage} alt="memes" className="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}