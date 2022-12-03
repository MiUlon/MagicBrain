import React from 'react';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2' options={{max: 25}} style={{ height: '150px', width: '150px'}}>
                <div>
                    <h1>React Parallax Tilt 👀</h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;