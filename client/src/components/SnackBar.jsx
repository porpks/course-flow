import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

const SnackBar = (props) => {
  const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />
  })
  return (
    <>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={props.onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Slide}
      >
        <CustomAlert
          onClose={props.onClose}
          severity={props.severity}
          sx={{ width: '100%' }}
        >
          {props.message}
        </CustomAlert>
      </Snackbar>
    </>
  )
}

export default SnackBar
