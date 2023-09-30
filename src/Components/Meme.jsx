import React, {useEffect, useState} from "react"
export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = useState([])

    useEffect( () => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getRandomImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const randomMeme = allMemes[randomNumber];
        const memeUrl = randomMeme.url;
        setMeme( prevMeme => ({
            ...prevMeme,
            randomImage: memeUrl    
        }))
        console.log(memeUrl);
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    className="form-input"
                    placeholder="Top Text"
                    type="text"
                    name="topText"
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Bottom Text"
                    type="text"
                    name="bottomText"
                    onChange={handleChange}
                />
                <button 
                    className="form-button"
                    onClick={getRandomImage}
                >Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme__image" />
                <h2 className="meme__text top">{meme.topText}</h2>
                <h2 className="meme__text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}