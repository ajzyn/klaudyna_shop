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

const EditProductSceen = ({ history, match }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  //images
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesError, setImagesError] = useState('')

  const prodId = match.params.id
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: updateLoading, error: updateError, success } = productUpdate

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else {
      if (!isLoaded || !product.name || product._id !== prodId || success) {
        dispatch(getProductDetails(prodId))
        setIsLoaded(true)
        dispatch({ type: PRODUCT_UPDATE_RESET })
      }
    }
  }, [history, dispatch, product, isLoaded, success])

  const uploadFileHandler = e => {
    if (e.target.files) {
      // const filesArray = Array.from(e.target.files).map(image =>
      //   URL.createObjectURL(image)
      // )

      // setSelectedImages(prevImg => prevImg.concat(filesArray))

      // Array.from(e.target.files).map(file => URL.revokeObjectURL(file))

      setSelectedImages(e.target.files)
      console.log(e.target.files)
    }
  }

  const multipleFileUploadHandler = async () => {
    const files = selectedImages
    const formData = new FormData()

    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i])
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      // const config = {
      //   headers: {
      //     accept: 'application/json',
      //     'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      //   }
      // }
      try {
        const { data } = await axios.post('/upload', formData, config)
        if (data.error) {
          if ('LIMIT_FILE_SIZE' === data.error.code) {
            setImagesError('Rozmiar maks 2MB')
          } else if ('LIMIT_UNEXPECTED_FILE' === data.error.code) {
            setImagesError('Makysmalnie 4 zdjęcia')
          } else {
            setImagesError(data.error)
          }
        } else {
          // Success
          let fileName = data
          console.log('fileName', fileName)
          // pokaz zdjęcia
        }
      } catch (error) {
        setImagesError(error.toString())
      }
    } else {
      setImagesError('Proszę wybrać zdjęcia')
    }
  }

  const renderPhotos = source => {
    return source.map(photo => {
      return <Image src={photo} alt='' key={photo} />
    })
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
      productPrice: Yup.string().required('Pole wymagane'),
      productBrand: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(50, 'Nazwa zbyt długa')
        .required('Pole wymagane'),
      productCategory: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(50, 'Nazwa zbyt długa')
        .required('Pole wymagane'),
      productCountInStock: Yup.string().required('Pole wymagane'),
      productDescription: Yup.string()
        .min(3, 'Nazwa zbyt krótka')
        .max(500, 'Nazwa zbyt długa')
        .required('Pole wymagane')
    }),
    onSubmit: values => {
      console.log(values)
      const product = {
        name: values.productName,
        category: values.productCategory,
        image: '/srodek_do_mycia_zmywarek.png',
        countInStock: values.productCountInStock,
        price: values.productPrice,
        descriptiom: values.productDescription,
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
      {success && <Message variant='success'>Przedmiot zaedytowany</Message>}
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
              <input
                type='file'
                id='file'
                multiple
                onChange={uploadFileHandler}
              />
              <div className='label-holder'>
                <label htmlFor='file' className='label'>
                  <Button as='div'>
                    <FontAwesomeIcon icon={faCameraRetro} />
                  </Button>
                  <Button onClick={multipleFileUploadHandler}>Wyślij</Button>
                </label>
              </div>
              {imagesError && (
                <Form.Control.Feedback className='d-block' type='invalid'>
                  {imagesError}
                </Form.Control.Feedback>
              )}
              {/* <div className='result'>{renderPhotos(selectedImages)}</div> */}
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
