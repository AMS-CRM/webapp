import React from 'react'
import ContentLoader from 'react-content-loader'

const TableLoader = props => {
  return (
    <ContentLoader
      width="100%"
      height={400}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="30" cy="36" r="18" />
      <rect x="67" y="21" rx="10" ry="10" width="100" height="30" />
      <rect x="300" y="22" rx="10" ry="10" width="85" height="30" />
      <rect x="402" y="23" rx="10" ry="10" width="85" height="30" />
      <rect x="523" y="24" rx="10" ry="10" width="169" height="30" />
      <rect x="731" y="25" rx="10" ry="10" width="85" height="30" />
      <rect x="852" y="26" rx="10" ry="10" width="85" height="30" />
      <rect x="978" y="27" rx="10" ry="10" width="169" height="30" />
      <rect x="1200" y="28" rx="10" ry="10" width="85" height="30" />
      

      

    
      
    </ContentLoader>
  )
}

export default TableLoader