import React, { useEffect, useState } from 'react'
import { getList } from '@/api/HomeApi'
import './style.css'
import HomeForm from '@/components/Home/Form'
import Detail from '@/components/Home/Detail'

const HomePage = () => {
  const selectSize = [10, 20, 30, 40, 50]
  const [home, setHome] = useState([])
  const [params, setParams] = useState({
    page: 1,
    size: 10
  })
  const [totalRow, setTotalRow] = useState(0)

  useEffect(() => {
    getHomes()
  }, [params])

  const getHomes = async() => {
    const { data } = await getList(params)
    setHome(data.data)
    setTotalRow(data.totalRow)
  }

  const generateHome = () => {
    return !!home.length && home.map((h, index) => (
      <div key={`home-${index}`}>
        {item(h, index)}
      </div>
    ))
  }

  const changePage = (index) => {
    if (params.page === index) {
      return
    }
    // setParams({...params, page: index});
  }

  const changeSize = (event) => {
    // setParams({
    //   ...params,
    //   size: event.target.value
    // });
  }

  const generatePaginate = () => {
    let page = Math.floor(totalRow / params.size)
    if (totalRow > params.size) {
      page = !(totalRow % params.size) ? page : (page + 1)
    }
    return (
      <div className={`paginate`}>
        {
          Array(page).fill(0).map((p, index) => (
            <div key={`item-${index}`} className={`item-page`} onClick={() => changePage(index + 1)}>{index + 1}</div>
          ))
        }
      </div>
    )
  }

  const item = (home, index) => {
    const size = (params.page - 1) * params.size
    return (<div key={`page-${index}`}>{(index + 1) + size } - {home.name}</div>)
  }

  const reloadList = () => {
    setParams({
      ...params,
      page: 1,
      size: 10
    })
  }

  return (
    <div>
      <span>homepage test has cicd</span>
      <div className='home'>{generateHome()}</div>
      { totalRow && generatePaginate() }
      <div className='size'>
        <select onChange={changeSize}>
          { selectSize.map(select => <option key={`option-${select}`} value={select}>{select}</option>) }
        </select>
      </div>
      <HomeForm reloadList={reloadList}/>
      <Detail />
    </div>
  )
}

export default HomePage
