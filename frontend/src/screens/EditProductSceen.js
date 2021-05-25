import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getProductDetails, updateProduct } from '../actions/ProductActions'
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET
} from '../constants/ProductConstants'
import Loader from '../components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import '../styles/fileStyles.scss'
import Message from '../components/Message'
import Resizer from 'react-image-file-resizer'
import ProgressBar from '../components/ProgressBar'
import resizeFile from '../utils/resizer'

// const schema = Yup.object().shape({
//   name: Yup.string().required('name is required'),
//   age: Yup.number()

//     .positive('age must be greater than zero')
//     .required('age is required')
// })

const EditProductSceen = ({ history, match }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  //images
  const [file, setFile] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  const prodId = match.params.id
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: updateLoading, error: updateError, success } = productUpdate

  useEffect(() => {
    dispatch({ type: PRODUCT_UPDATE_RESET })
  }, [])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else {
      if (!product.name || product._id !== prodId) {
        dispatch(getProductDetails(prodId))
      }
    }
  }, [history, dispatch, product, success])

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
      productName: product.name || '',
      productPrice: product.price || '',
      productBrand: product.brand || '',
      productCategory: product.category || '',
      productCountInStock: product.countInStock || '',
      productDescription: product.description || ''
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
      const product = {
        name: values.productName,
        category: values.productCategory,
        image: uploadedImage && uploadedImage.url,
        countInStock: values.productCountInStock,
        price: values.productPrice,
        description: values.productDescription,
        brand: values.productBrand
      }
      dispatch(updateProduct(prodId, product))
    },
    enableReinitialize: true
  })

  return loading || updateLoading ? (
    <Loader />
  ) : (
    <Container>
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Przedmiot zedytowany</Message>}
      <Button onClick={() => history.goBack()}>Powrót</Button>
      <Row className='justify-content-center align-items-center'>
        <Col md='6'>
          <h1>Edytuj Produkt</h1>
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
              {uploadedImage && uploadedImage.url ? (
                <Image src={uploadedImage.url} fluid />
              ) : (
                <Image src={product.image} fluid />
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
              {formik.touched.productCategory && formik.errors.productCategory && (
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
              <Button type='submit'>Edytuj</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default EditProductSceen
