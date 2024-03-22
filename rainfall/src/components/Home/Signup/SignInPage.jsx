import React from 'react'
import ImagesSignIn from './ImagesSignIn'
import HeaderSignIn from './HeaderSignIn'
import SignInForm from './SignInForm'


function SignupPage() {
    return (
        <div className='containerss'>
            <div className='container-border'>
                <ImagesSignIn />
                <div className='contents'>
                    <HeaderSignIn />
                    <div className='fields'>
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
