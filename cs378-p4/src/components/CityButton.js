import Button from 'react-bootstrap/Button';

const CityButton = ({city}) => {
    return (
        <div className="col">
        <Button variant="outline-dark">{city}</Button>
        </div>
    )
};

export default CityButton;