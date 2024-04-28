import React from 'react';
import Draggable from 'react-draggable';

const TextBox = ({ id, x, y, value, onChange, onStop }) => {
    return (
        <Draggable
            bounds="parent"
            defaultPosition={{ x, y }}
            onStop={onStop}
        >
            <div className='small'>
                <textarea
                    value={value}
                    onChange={onChange}
                    autoFocus
                />
            </div>
        </Draggable>
    );
};

export default TextBox;
