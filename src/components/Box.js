import React from 'react';

const Box = ({ id, x, y }) => {
    return (
        <div
            id={`box-${id}`}
            className='box'
            style={{ left: x, top: y }}
        />
    );
};

export default Box;
