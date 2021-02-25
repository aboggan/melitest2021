import { useState, useRef, useEffect  } from 'react'
import { useHistory } from "react-router-dom";


function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('')
    let history = useHistory();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    })

    const searchItems = () => {
        if (searchTerm) {
            history.push(`/search/?q=${searchTerm}`);
            history.go(0);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchItems();
        }
    }


    return (
        <div className="search-bar container">
            <div className="search-bar__logo"></div>
            <input
                className="search-bar__input"
                type="text"
                onChange={event => { setSearchTerm(event.target.value); }}
                onKeyPress={handleKeyPress}
                placeholder="Nunca dejes de buscar" 
                ref={inputRef} />

            <button onClick={searchItems} className="search-bar__button"></button>
        </div>
    );
}

export default SearchBar;