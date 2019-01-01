import React from 'react';
const Container = (props) => {
    return (
        <div style={{maxWidth:'1024px',margin:'0 auto',padding:'0 20px'}}>
            {props.children}
        </div>
    );
}

export default Container;