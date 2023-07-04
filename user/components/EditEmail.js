import React from 'react'
import { Button, Input } from 'antd'
import { useState } from 'react'

function EditEmail({myAccount,updateEmail}) {
    const [value,setValue]=useState(myAccount.email)

    const handleChange=(e)=>{
       setValue(e.target.value)
    }

    const handleUpdate=(e)=>{
        e.preventDefault()
        updateEmail(value)
    }
  return (
    <div className='p-4 border'>
        <form onSubmit={handleUpdate}  >
            <Input type="text" value={value} onChange={handleChange} />
            <div className='mt-3 flex justify-end'>
                <Button htmlType="submit" size='middle'  >Update</Button>
            </div>
        </form>
</div>
  )
}

export default EditEmail



