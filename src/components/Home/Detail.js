import React, { useEffect, useState } from 'react'
import { getDetail } from '@/api/HomeApi'

const Detail = (props) => {
  const [detail, setDetail] = useState()
  const [id, setId] = useState()

  const getHomeDetail = async() => {
    const { data } = await getDetail(id)
    setDetail(data)
  }

  const generateDetail = () => {
    if (!detail) return
    return (
      <>
        <div className='name'>{detail.name}</div>
        <div className='desc'>{detail.description}</div>
      </>
    )
  }

  useEffect(() => {
    if (id && id > 0) {
      getHomeDetail()
    }
  }, [id])

  return (
    <div className='detail-container'>
      <div className='input'>
        <input type='number' onChange={(e) => setId(e.target.value || 0)} placeholder='Nhap id...' />
      </div>
      <div className='detail'>
        { generateDetail() }
      </div>
    </div>
  )
}

export default Detail
