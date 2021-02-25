import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import freeShipping from '../styles/icons/free-shipping.png';
import {
    Link,
    useLocation
} from "react-router-dom";
import parsePrice from '../utils/parsePrice';


function SearchResults() {
    const [results, setResults] = useState(false)
    const [loading, setLoading] = useState(true)
    const { search } = useLocation();
    const { q } = queryString.parse(search)

    useEffect(() => {
        searchItems()
    }, [])

    const searchItems = async () => {

        setLoading(true)
        const fetchItems = await fetch(`/api/items/?q=${q}`)
        const items = await fetchItems.json()

        setResults(items)
        setLoading(false)
    }

    return (
        <React.Fragment>
            {loading ? (
                <div className="loader">
                    cargando...
                </div>
            ) : (
                    <div className="search-results">
                        {results.items.length == [] ? (
                            <div className="search-results__error">
                                No encontramos nada :( volvé a buscar!
                            </div>
                        ) : (
                                <React.Fragment>
                                    <div className="search-results__categories">
                                        {results.categories.map((category, i) =>
                                            <span key={i}>{category}</span>
                                        )}
                                    </div>
                                    <div className="search-results__items">
                                        {results.items.map((item, i) =>
                                            <div key={i} className="search-results__items__item row">


                                                <div className="search-results__items__item__image col-md-3 col-xs-12">
                                                    <Link to={`/item/${item.id}`} key={i}>
                                                        <img src={item.picture} alt={item.title} />
                                                    </Link>
                                                </div>
                                                <div className="search-results__items__item__description col-md-7">
                                                    <div className="search-results__items__item__description__price">
                                                        {parsePrice(item.price)} {item.price.decimals ? (<span>{item.price.decimals}</span>) : ("")}

                                                        {item.free_shipping ? (
                                                            <img src={freeShipping} alt="Envío Gratis" title="Envío Gratis" />
                                                        ) : ""}
                                                    </div>
                                                    <Link to={`/item/${item.id}`} key={i}>
                                                        <div>{item.title}</div>
                                                    </Link>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="search-results__items__item__location">{item.location}</div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </React.Fragment>
                            )}

                    </div>
                )}

        </React.Fragment>
    );
}

export default SearchResults;