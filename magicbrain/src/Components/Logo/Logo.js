import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import magicBrainIcon from './magicBrain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 grow' options={{max: 55}} style={{ height: '150px', width: '150px'}}>
            <Tilt className='Tilt br2 shadow-2'>
                <div>
                    <img className='pa2 pt2' alt='icon' src={magicBrainIcon} style={{ height: '130px', width: '130px'}}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;