import React from 'react'
import styled from 'styled-components'
import UserPhoto from '../../components/UserPhoto'

const MediaShareMessage = ({ media_share }) => {
  const { image_versions2, caption } = media_share
  const image = image_versions2.candidates // What happens if it is an album? media_type? then 1 => single
    .sort((a, b) => a.height - b.height)[0]

  return (
<a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/p/${media_share.code}/`}>
    <MediaShareMessage.Container>
      <MediaShareMessage.Header>
        <UserPhoto size='25px' src={media_share.user.profile_pic_url} />
        <b> {media_share.user.full_name} </b>
      </MediaShareMessage.Header>
      <MediaShareMessage.Image
        width={image.width}
        height={image.height}
        src={image.url}
      />
      <MediaShareMessage.Caption>
        <b> {caption.user.full_name} </b>
        {caption.text}
      </MediaShareMessage.Caption>
    </MediaShareMessage.Container>
    </a>
  )
}

MediaShareMessage.Container = styled.div`
  display: flex;
  flex-direction: column;
`

MediaShareMessage.Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  ${UserPhoto} {
    margin-right: 15px;
  }
`
MediaShareMessage.Image = styled.img`
  // TODO: Remove negative margins!!!
  margin-left: -12px;
  margin-right: -12px;
`
MediaShareMessage.Caption = styled.div`
  margin-top: 10px;
`

export default MediaShareMessage
