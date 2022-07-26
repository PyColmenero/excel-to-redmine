import React from 'react';
// import { PhotoshopPicker } from 'react-color';


export class EditTableForm extends React.Component {
    constructor(props) {
        super(props);
    }

        // this.state = {
        //     color: "#fff"
        // }
        // this.ColorPicker = () => {
        //     return (
        //         <input type="color" value={this.state.color} onChange={e => this.setState({color:e.target.value})} />
        //     );
        // }

    // }


    render() {
        return (
            <form className="d-flex">
                <div className="form-check me-2">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Set header
                    </label>
                </div>
                <div className="form-check me-2">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                        Styles: text color
                    </label>
                </div>
                <input className="me-3" type="color" id="textColorTool" />
                <div className="me-2">
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                        background color
                    </label>
                </div>
                <input className="me-3" type="color" id="bgColorTool" defaultValue="#ffffff" />
            </form>
        )
    }
}