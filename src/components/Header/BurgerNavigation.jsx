import React from 'react'
import { Container, Group } from '@mantine/core'

const BurgerNavigation = ({
  show,
  userCardData,
  getImlementerLinks,
}) => {
  if (!show) return <div></div>
  return (
    <div style={{
      position: 'fixed',
      height: '100vh',
      width: '300px',
      backgroundColor: '#495057',
      borderRadius: '10px',
      zIndex: 20,
      margin: '0 auto',
    }}>
      <Container p={40}>
        {/*<UserCard {...userCardData}/>*/}
        <br />
        {getImlementerLinks()}
      </Container>

    </div>
  )
}

export default BurgerNavigation