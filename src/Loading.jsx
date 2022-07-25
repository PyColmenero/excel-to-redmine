import React from 'react';
import loading from './media/loading.gif';

export class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.visibility + " position-relative h-100"}>
                <div className='text-center position-absolute top-50 start-50 translate-middle'>
                    <img src={loading} alt="loading" />
                    <h1 className='mb-0'>Loading...</h1>
                    <p className="info">No file is being uploaded*</p>
                </div>
            </div>
        )
    }
}