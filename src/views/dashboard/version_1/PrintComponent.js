import React, { Component } from 'react'
import CIcon from '@coreui/icons-react';


const divStyle = {
    position: 'absolute',
    right: 20,
  };

class PrintThisComponent extends Component {
    
    render() {
        return (
                <CIcon
                    className="c-header-nav-items mx-2"
                    name="cil-print"
                    height={20}
                    onClick={() => window.print()}
                    style={divStyle}
                />
        )
    }
}

export default PrintThisComponent