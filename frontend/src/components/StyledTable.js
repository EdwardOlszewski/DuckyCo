// Components
import { TableCell, TableRow, withStyles } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1e2a5a',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fcfcfc',
    },
  },
}))(TableRow)

export { StyledTableCell, StyledTableRow }
