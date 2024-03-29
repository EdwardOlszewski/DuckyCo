// React/Redux
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// Components
import {
  FormControl,
  Button,
  TextField,
  Grid,
  Select,
  InputLabel,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import useStyles from '../styles/MainStyleSheet'
import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
// Icons
import { MdAttachMoney } from 'react-icons/md'
import { FaFileUpload } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { GiPlasticDuck } from 'react-icons/gi'
// Actions
import { UPLOAD_IMAGE_RESET } from '../types/imageTypes'
import { PRODUCT_UPDATE_RESET, PRODUCT_LIST_RESET } from '../types/productTypes'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { uploadImage } from '../actions/imageActions'

export default function Register({ match }) {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productId = useParams().id

  // Get the user information from redux
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // go to productDetails in the state and pull out information
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, success, error, product } = productDetails

  // go to imageUpload in the state and pull out information
  const imageUpload = useSelector((state) => state.imageUpload)
  const {
    loading: uploadLoading,
    success: uploadSuccess,
    imageURL,
  } = imageUpload

  // go to productUpdate in the state and pull out information
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: updateLoading, success: updateSuccess } = productUpdate

  // Declare new state variables using useState hook
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState([])
  const [addDesc, setNewDesc] = useState('')
  const [category, setCategory] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  // File Uploading
  const [imgUpload, setImgUpload] = useState(false)
  const [image, setImage] = useState('')

  // function to upload image on submit
  const uploadFileHandler = async (files) => {
    const file = files[0]
    dispatch(uploadImage(file))
    setImgUpload(false)
  }

  const handleNewDesc = () => {
    setDescription((description) => [...description, addDesc])
  }

  // function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        description,
        category,
        price,
        isPublished,
      })
    )
  }

  // useEffect hook called after render
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/', { replace: true })
    }
    if (!product || product._id != productId) {
      dispatch(listProductDetails(productId))
    }
    if (success) {
      for (let i = 0; i < product.description.length; i++) {
        if (description[i] != product.description[i]) {
          description.push(product.description[i])
        }
      }
      setName(product.name)
      setPrice(product.price)
      setCategory(product.category)
      setImage(product.image)
      setIsPublished(product.isPublished)
    }
    if (uploadSuccess) {
      setImage(imageURL)
    }
    if (updateSuccess) {
      dispatch({ type: UPLOAD_IMAGE_RESET })
      dispatch({ type: PRODUCT_LIST_RESET })
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist', { replace: true })
    }
  }, [
    userInfo,
    navigate,
    dispatch,
    productId,
    success,
    uploadSuccess,
    updateSuccess,
    product,
  ])

  return (
    <PageWrapper title={'profile'}>
      {(loading || uploadLoading) && <Loader />}

      <Grid container className={classes.productEditCont}>
        <Grid container xs={12} md={6} spacing={3}>
          <Grid item xs={12} xl={10}>
            <Box style={{ marginTop: '5rem' }}>
              <img
                src={image}
                alt='display image'
                width='100%'
                height='100%'
                layout='responsive'
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          md={6}
          style={{ marginTop: '5rem' }}
          spacing={3}
        >
          <Grid item xs={12} md={4}>
            <FormControl className={classes.form}>
              <TextField
                inputProps={{
                  className: classes.input,
                }}
                id='outlined-basic'
                label='Name'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={classes.form}>
              <TextField
                inputProps={{
                  className: classes.input,
                }}
                type='number'
                id='outlined-basic'
                label='Price'
                variant='outlined'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <MdAttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl className={classes.form}>
              <InputLabel style={{ marginTop: -6, marginLeft: 14 }}>
                Category
              </InputLabel>
              <Select
                inputProps={{
                  className: classes.input,
                }}
                variant='outlined'
                label='Category'
                native
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Sample Category</option>
                <option>MISC</option>
                <option>Beanie</option>
                <option>Hat</option>
                <option>Shorts</option>
                <option>Shirt</option>
                <option>Crewneck</option>
                <option>Hoodie</option>
                <option>Tanktop</option>
                <option>Retired</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl className={classes.form}>
              <TextField
                inputProps={{
                  className: classes.input,
                }}
                label='Description'
                variant='outlined'
                value={addDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleNewDesc}
                        style={{
                          color: 'black',
                          height: '100%',
                          paddingTop: '1.5rem',
                          paddingBottom: '1.5rem',
                        }}
                      >
                        <GoPlus />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Typography
              style={{
                marginTop: '2rem',
                textAlign: 'left',
                marginBottom: '-1rem',
              }}
            >
              Description:
            </Typography>
            <List>
              {description.map((desc) => (
                <ListItem style={{ marginBottom: '-1rem' }}>
                  <GiPlasticDuck style={{ marginRight: '.5rem' }} />
                  <ListItemText primary={desc} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name='checkedB'
                  color='primary'
                  checked={Boolean(isPublished)}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
              }
              label='Publish'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <Button
                startIcon={<FaFileUpload />}
                onClick={(e) => setImgUpload(true)}
              >
                Upload Image
              </Button>
              <DropzoneDialog
                open={Boolean(imgUpload)}
                acceptedFiles={['image/png', 'image/svg']}
                onSave={uploadFileHandler}
                filesLimit={1}
                maxFileSize={5000000}
                onClose={(e) => setImgUpload(false)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ borderRadius: 0, backgroundColor: '#007E33' }}
              className={classes.Btn}
              onClick={submitHandler}
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}
