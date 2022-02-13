// React
import { Link, useLocation } from 'react-router-dom'
// Components
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

const Pagination = ({ pages }) => {
  // ----- init ----- //
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  return (
    <Pagination
      count={pages}
      page={page}
      shape='rounded'
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/admin/productlist/${item.page === 1 ? '' : `${item.page}`}`}
          {...item}
        />
      )}
    />
  )
}

export default Pagination
