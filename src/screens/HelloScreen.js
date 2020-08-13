import React from 'react'
import Hello from '../components/Hello'
import Wrapper from '../components/Wrapper'

function HelloScreen() {
    return (
        <>
        <Wrapper>
        <Hello name="John"  color="red" isSpecial={true} />
        <Hello  color="blue" />
        </Wrapper>
        </>
    )

}

export default HelloScreen;