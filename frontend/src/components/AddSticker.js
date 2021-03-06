import { useState } from 'react'
import { useDispatch } from 'react-redux'
// Components
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
// Actions
import { addToCart } from '../actions/cartActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  checkoutBtn: {
    padding: '.5rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '100%',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
  unlockOfferBtn: {
    marginTop: '2rem',
    padding: '.5rem',
    backgroundColor: 'black',
    outline: '1px solid white',
    borderRadius: 0,
    color: '#ffca18',
    width: '100%',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#505050',
      color: '#ffdd69',
    },
  },
  secretText: {
    color: 'white',
    paddingBottom: '2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(15, 10, 10),
  },

  backDrop: {
    background: 'rgba(5,5,5)',
  },
}))

const AddSticker = ({ rdyToCheckout }) => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [offer, setOffer] = useState(false)

  const handleOpen2 = () => {
    setOpen2(true)
  }

  const handleClose = () => {
    setOpen(false)
    rdyToCheckout(true)
  }

  const handleClose2 = () => {
    dispatch(addToCart('62ca4c9fdec6f9c14d92f8f6', 1, 's'))
    setOpen2(false)
    rdyToCheckout(true)
  }

  const noOffer = () => {
    setOpen(false)
    setOpen2(false)
  }

  return (
    <>
      <Box>
        <Button className={classes.checkoutBtn} onClick={() => setOpen(true)}>
          Checkout
        </Button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            classes: {
              root: {
                background: classes.backDrop,
              },
            },
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {!offer ? (
                <Box style={{ textAlign: 'center', margin: 'auto' }}>
                  <img
                    src='/images/giphy.gif'
                    alt='Duckylogo'
                    width='90%'
                    height='100%'
                    layout='responsive'
                  />

                  <Button
                    className={classes.unlockOfferBtn}
                    onClick={() => setOffer(true)}
                  >
                    Unlock Offer
                  </Button>
                </Box>
              ) : (
                <Box style={{ textAlign: 'center', margin: 'auto' }}>
                  <Typography
                    variant='h4'
                    style={{ color: 'white', marginBottom: '1rem' }}
                  >
                    40% OFF
                  </Typography>
                  <img
                    src='/images/sticker.png'
                    alt='sticker'
                    width='50%'
                    height='100%'
                    layout='responsive'
                  />

                  <Typography
                    variant='h5'
                    style={{ color: 'white', marginTop: '1rem' }}
                  >
                    $3.00 Founders Ducky Sticker
                  </Typography>
                  <Button
                    className={classes.unlockOfferBtn}
                    onClick={() => handleClose2()}
                  >
                    Add To Cart
                  </Button>
                </Box>
              )}
            </div>
          </Fade>
        </Modal>
      </Box>
      <Box>
        <Modal
          className={classes.modal}
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            classes: {
              root: {
                background: classes.backDrop,
              },
            },
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Box style={{ textAlign: 'center', margin: 'auto' }}></Box>

              <Button
                className={classes.unlockOfferBtn}
                onClick={() => handleOpen2()}
              >
                Unlock Offer
              </Button>
            </div>
          </Fade>
        </Modal>
      </Box>
    </>
  )
}

export default AddSticker

/*

          <Box style={{ textAlign: 'center', margin: 'auto' }}>
                <img
                  src='/images/giphy.gif'
                  alt='Duckylogo'
                  width='90%'
                  height='100%'
                  layout='responsive'
                />
           

              <Button
                className={classes.unlockOfferBtn}
                onClick={() => handleOpen2()}
              >
                Unlock Offer
              </Button>
          
              
        
                    <Button
                className={classes.unlockOfferBtn}
                onClick={() => handleOpen2()}
              >
                Unlock Offer
              </Button>

              </Box>

        


*/
