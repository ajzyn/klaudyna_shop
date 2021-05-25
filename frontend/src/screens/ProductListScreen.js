import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Image
} from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  getProducts,
  deleteProduct,
  createProduct
} from '../actions/ProductActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCameraRetro,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import resizeFile from '../utils/resizer'
import ProgressBar from '../components/ProgressBar'
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET
} from '../constants/ProductConstants'

const trashStyle = {
  padding: '0 !important',
  marginLeft: '5px'
}

const ProductListScreen = ({ history, match }) => {
  const [show, setShow] = useState(false)
  const offset = match.params.offset - 1 || 0

  //imgs
  const [file, setFile] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleClose = () => {
    setUploadedImage(null)
    return setShow(false)
  }
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const productList = useSelector(state => state.productList)
  const {
    products,
    loading,
    error,
    pages,
    offset: productListOffset
  } = productList

  const productCreate = useSelector(state => state.productCreate)
  const {
    success: successCreated,
    loading: loadingCreate,
    error: errorCreate
  } = productCreate

  const productDelete = useSelector(state => state.productDelete)
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError
  } = productDelete

  useEffect(() => {
    dispatch({ type: PRODUCT_DELETE_RESET })
    dispatch({ type: PRODUCT_CREATE_RESET })
  }, [])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts('', offset))
    } else {
      history.push('/login')
    }
  }, [userInfo, history, dispatch, deleteSuccess, successCreated, offset])

  const handleDeleteProduct = id => {
    dispatch(deleteProduct(id))
  }

  const hadnleChange = async e => {
    const selected = e.target.files[0]
    const types = ['image/png', 'image/jpeg', 'image.jpg']
    if (selected && types.includes(selected.type)) {
      try {
        const image = await resizeFile(selected)
        setFile(image)
        setUploadError('')
      } catch (err) {
        setUploadError(err)
      }
    } else {
      setUploadError('Proszę wybrać obraz typu png,jpeg,jpg')
    }
  }

  const formik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productBrand: '',
      productCategory: '',
      productCountInStock: '',
      productDescription: ''
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(50, 'Nazwa zbyt długa')
        .required('Pole wymagane'),
      productPrice: Yup.number()
        .typeError('Nieprawidłowa cena')
        .required('Pole wymagane'),
      productBrand: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(50, 'Nazwa zbyt długa')
        .required('Pole wymagane'),
      productCategory: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(50, 'Nazwa zbyt długa')
        .required('Pole wymagane'),
      productCountInStock: Yup.number()
        .typeError('Nieprawidłowa cena')
        .required('Pole wymagane'),
      productDescription: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(500, 'Nazwa zbyt długa')
        .required('Pole wymagane')
    }),
    onSubmit: values => {
      if (!uploadedImage || uploadError) {
        setUploadError('Proszę wybrać zdjęcie')
      } else {
        const product = {
          name: values.productName,
          category: values.productCategory,
          image: uploadedImage.url,
          countInStock: values.productCountInStock,
          price: values.productPrice,
          description: values.productDescription,
          brand: values.productBrand
        }
        dispatch(createProduct(product))
        formik.resetForm()
        handleClose()
        setUploadError('')
      }
    },
    enableReinitialize: true
  })

  return (
    <Container>
      {error && <Message variant='danger'>{error}</Message>}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {errorCreate && (
        <Message variant='danger'>Nie udało się stworzyć produktu</Message>
      )}
      {deleteSuccess && <Message variant='success'>Produkt usunięty</Message>}
      {successCreated && <Message variant='success'>Produkt stworzony</Message>}
      <Row className='mb-4'>
        <Col>
          <h1>Produkty</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button onClick={handleShow}>Dodaj przedmiot</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dodawanie produktu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>Nazwa produktu</Form.Label>
                  <Form.Control
                    type='text'
                    id='productName'
                    {...formik.getFieldProps('productName')}
                  />
                  {formik.touched.productName && formik.errors.productName && (
                    <Form.Control.Feedback className='d-block' type='invalid'>
                      {formik.errors.productName}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cena</Form.Label>
                  <Form.Control
                    type='text'
                    id='productPrice'
                    {...formik.getFieldProps('productPrice')}
                  />
                  {formik.touched.productPrice && formik.errors.productPrice && (
                    <Form.Control.Feedback className='d-block' type='invalid'>
                      {formik.errors.productPrice}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Edytuj zdjęcia</Form.Label>
                  <input type='file' id='file' onChange={hadnleChange} />
                  <div className='label-holder'>
                    <label htmlFor='file' className='label'>
                      <Button as='div'>
                        <FontAwesomeIcon icon={faCameraRetro} />
                      </Button>
                      {/* <Button onClick={handleUpload}>Wyślij</Button> */}
                    </label>
                  </div>
                  {uploadedImage && uploadedImage.error && (
                    <Form.Control.Feedback className='d-block' type='invalid'>
                      {uploadedImage.error}
                    </Form.Control.Feedback>
                  )}
                  {uploadError && (
                    <Form.Control.Feedback className='d-block' type='invalid'>
                      {uploadError}
                    </Form.Control.Feedback>
                  )}
                  {file && (
                    <ProgressBar
                      file={file}
                      setFile={setFile}
                      setUploadedImage={setUploadedImage}
                    />
                  )}
                  {uploadedImage && uploadedImage.url && (
                    <Image src={uploadedImage.url} fluid />
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Marka</Form.Label>
                  <Form.Control
                    type='text'
                    id='productBrand'
                    {...formik.getFieldProps('productBrand')}
                  />
                  {formik.touched.productBrand && formik.errors.productBrand && (
                    <Form.Control.Feedback className='d-block' type='invalid'>
                      {formik.errors.productBrand}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Kategoria</Form.Label>
                  <Form.Control
                    type='text'
                    id='productCategory'
                    {...formik.getFieldProps('productCategory')}
                  />
                  {formik.touched.productCategory &&
                    formik.errors.productCategory && (
                      <Form.Control.Feedback className='d-block' type='invalid'>
                        {formik.errors.productCategory}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Ilość sztuk</Form.Label>
                  <Form.Control
                    type='text'
                    id='productCountInStock'
                    {...formik.getFieldProps('productCountInStock')}
                  />
                  {formik.touched.productCountInStock &&
                    formik.errors.productCountInStock && (
                      <Form.Control.Feedback className='d-block' type='invalid'>
                        {formik.errors.productCountInStock}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Opis</Form.Label>
                  <Form.Control
                    type='text'
                    as='textarea'
                    className='textarea'
                    id='productDescription'
                    {...formik.getFieldProps('productDescription')}
                  />
                  {formik.touched.productDescription &&
                    formik.errors.productDescription && (
                      <Form.Control.Feedback className='d-block' type='invalid'>
                        {formik.errors.productDescription}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group>
                  <Button type='submit'>Dodaj produkt</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      {loading || deleteLoading || loadingCreate ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Marka</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className='d-flex justify-content-center align-items-center'>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='alert'>
                      <FontAwesomeIcon size='xs' icon={faEdit} />
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => handleDeleteProduct(product._id)}
                    variant='danger'
                    style={trashStyle}
                  >
                    <FontAwesomeIcon size='xs' icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate isAdmin={true} pages={pages} offset={productListOffset} />
    </Container>
  )
}

export default ProductListScreen
