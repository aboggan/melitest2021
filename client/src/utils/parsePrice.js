import { getUserLocale } from 'get-user-locale';

const parsePrice = (price) => {

    const userLocale = getUserLocale();
    console.log("user locale", userLocale)
    const formatedPrice = new Intl.NumberFormat(userLocale,
        {
            style: 'currency',
            currency: price.currency,
            maximumFractionDigits: 0
        }
    ).format(price.amount)
    /*
        Workaround for Argentina since Intl.NumberFormat with a 4 digits number returns no thousands separator
        E.G:
        let price = 5125
        new Intl.NumberFormat("es-AR").format(price)
        returns 5125
    */
    if (price.currency === 'ARS') {

        const numberWithSeparators = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        return numberWithSeparators(formatedPrice);
    }

    return formatedPrice;
};

export default parsePrice;