import React, { useRef, useState } from 'react'
import { createHome } from '@/api/HomeApi'

const HomeForm = ({ reloadList }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)
  const areaRef = useRef(null)

  const clearForm = () => {
    setName('')
    setDescription('')
    inputRef.current.value = ''
    areaRef.current.value = ''
  }

  const submitForm = async() => {
    const params = { name, description }
    const { message, success } = await createHome(params)
    if (success) {
      clearForm()
      reloadList()
    } else {
      setErrorMessage(message)
    }
  }

  return (
    <div className='form'>
      <div className='form-group'>
        <input name='name' className='form-input' ref={inputRef} type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='form-group'>
        <textarea name='description' ref={areaRef} className='form-input' onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      { errorMessage && (<div className='error'>{errorMessage}</div>)}
      <button className='submit' onClick={submitForm}>Submit</button>
    </div>
  )
}

export default HomeForm
