import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import { Link, useLocation } from 'react-router-dom'
import PaginationItem from '@mui/material/PaginationItem'

export default function PaginationRounded({ pages }) {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  return (
    <>
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
    </>
  )
}
