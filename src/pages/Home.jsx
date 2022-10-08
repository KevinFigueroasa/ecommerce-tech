import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    // const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([])
    const [searchValueProduct, setSearchValueProduct] = useState("")

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

        <Container fluid>
            <Row>
                <Col lg={3}>
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
                    </div>
                </Col>
                <Col>
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

                    <h1 className="mt-5">Welcome to I-Commerce</h1>

                    <Row xs={1} md={2} xl={3} className="g-4">
                        {productsFiltered.map(product => (
                            <Col>
                                <Card className="mt-5"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                    style={{ height: "100%" }}
                                >
                                    <div className='img-card'>
                                        <Card.Img style={{position: 'absolute'}} variant="top" src={product.productImgs} />
                                        <Card.Img className='over' variant="top" src={product.productImgs[1]} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title><b>{product.title}</b></Card.Title>
                                        <Card.Text>${product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container >
    );
};

export default Home;