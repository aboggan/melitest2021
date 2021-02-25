import React, { useEffect, useState } from 'react'
import parsePrice from '../utils/parsePrice';


function ItemDetail({ match }) {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        searchItem()
    }, [])

    const searchItem = async () => {

        setLoading(true)
        const fetchItem = await fetch(`/api/items/${match.params.id}`);
        const item = await fetchItem.json()
        setItem(item)
        setLoading(false)
    }

    return (
        <React.Fragment>
            {loading ?
                (
                    <div className="loader">
                        cargando...
                    </div>

                ) : (
                    <div className="item-detail">
                        {!item ? (
                            <div className="item-detail__error">
                                <div>Algo salió mal :( Revisá el id</div>
                            </div>

                        ) : (

                                <React.Fragment>
                                    <div className="item-detail__categories">
                                        {item.categories.map((category, i) =>
                                            <span key={i}>{category}</span>
                                        )}
                                    </div>
                                    <div className="item-detail__info">
                                        <div className="row">
                                            <div className="item-detail__info__image col-md-8">
                                                <img src={item.picture} alt={item.item.title} />
                                            </div>
                                            <div className="item-detail__info__buy-box col-md-4">
                                                <div className="item-detail__info__buy-box__sold">
                                                    {item.condition ? item.condition + ' - ' : ""}
                                                    {item.sold_quantity} vendidos
                                            </div>
                                                <div className="item-detail__info__buy-box__title">
                                                    {item.item.title}
                                                </div>
                                                <div className="item-detail__info__buy-box__price">
                                                    {parsePrice(item.item.price)} {item.item.price.decimals ? (<span>{item.item.price.decimals}</span>) : ("")}
                                                </div>
                                                <div className="item-detail__info__buy-box__buy-button">
                                                    <button>Comprar</button>
                                                </div>
                                            </div>
                                            <div className="item-detail__info__description col-md-8">
                                                <div>Descripción del producto</div>
                                                <div>{item.description}</div>

                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>

                            )}
                    </div>
                )}

        </React.Fragment>
    );
}

export default ItemDetail;