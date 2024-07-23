import React from 'react'
import stylesSystem from '@/app/page.module.css'

export default function PageBreadcrumb({country}) {
  return (
    <div style={{padding: '12px'}} className={stylesSystem.max__w__1200px}>Home &#62; {country} &#62; Visa For {country}</div>
  )
}
