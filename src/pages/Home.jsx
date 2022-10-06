import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    // const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [ searchValueProduct, setSearchValueProduct ] = useState("")

    useEffect(() => {
        axios
            .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList)
    }, [productsList])

    console.log(categories)

    const filterCategory = (categoryId) => {
        // alert("Filtrando produts con categoria: " + categoryId)
        const filtered = productsList.filter(product => product.category.id === categoryId)
        console.log(filtered)
        setProductsFiltered(filtered)
    }

    const searchProducts = () => {
        // alert(searchValueProduct)
        const filteredProduct = productsList.filter(product => (
            product.title.toLowerCase().includes(searchValueProduct.toLowerCase())  // con el toLowerCase hago que la busqueda entre el titulo del arreglo y el título que busco coincidan
        ))

        // setProductsFiltered(filteredProduct)
        setProductsFiltered(filteredProduct)
    }

    // useEffect(() => {
    //     dispatch(getProductsThunk())
    // }, []) SE CAMBIO DE LUGAR EL DISPACHT HACIA APP.JSX Para que se renderice siempre ya que no se estaba renderizando el cada producto

    return (
        <div>
            {
                categories.map(category => (
                    <Button
                        key={category.id}
                        onClick={() => filterCategory(category.id)} // cuando voy a enviar parametros, debo dolocarlo como función flecha
                    >
                        {category.name}
                    </Button>
                ))
            }

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search Products"
                    onChange={e => setSearchValueProduct(e.target.value)}
                    value={searchValueProduct}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={searchProducts}>
                    Button
                </Button>
            </InputGroup>

            <h1>Welcome to I-Commerce</h1>

            <ul>
                {
                    productsFiltered.map(product => (
                        <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                            <h4>{product.title}</h4>
                            <img src={product.productImgs} width="25%" alt="" />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;