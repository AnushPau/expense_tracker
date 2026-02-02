import React from 'react'
import { UserButton } from '@clerk/nextjs';
function DashboardHeader() {
  return (
    <div className='p-5 shadow-md border-b flex justify-between items-center'>
        <div>
            
        </div>
        <div>
            <UserButton/>
        </div>

    </div>
  )
}

export default DashboardHeader
