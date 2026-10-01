import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-t-neutral-900 border-neutral-200"></div>
        </div>
    )
}

export default Loading
