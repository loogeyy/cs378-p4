import Button from 'react-bootstrap/Button';

const CityButton = ({city, changeCity}) => {
    return (
        <div className="col">
        <Button variant="outline-dark"
        onClick={() => changeCity(city)}
        >{city}</Button>
        </div>
    )
};

export default CityButton;