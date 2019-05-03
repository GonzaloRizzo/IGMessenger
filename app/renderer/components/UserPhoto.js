import styled from 'styled-components'

const UserPhoto = styled.img.attrs({
  draggable: false
})`
  display: flex;
  border-radius: 50%;
  height: ${props => props.size || '100%'};
  height: ${props => props.size || '100%'};
`

export default UserPhoto
