import React from 'react'

const MoreVideos = ({info}) => {
    const thumbnail = info?.snippet?.thumbnails?.medium?.url ;
  const title = info?.snippet?.title ;
  const channelTitle = info?.snippet?.channelTitle;
  const viewcount = info?.statistics?.viewCount;
  return (
      <div className='flex ml-72 my-6'>
        <img className='rounded-lg w-48' src={thumbnail} />
        <div className='ml-4 mx-4'>
        <p className='font-bold'>{title}</p>
        <p className='text-sm'>{channelTitle}</p>
        <p> views {viewcount}</p>
        </div>
      </div>
  )
}

export default MoreVideos