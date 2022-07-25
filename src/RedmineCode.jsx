import React from 'react';

export class RedmineCode extends React.Component {
    constructor(props) {
        super(props);
    }

    copy() {
        const textArea = document.createElement('textarea');
        textArea.textContent = this.props.redmineCode;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        document.getElementById("copyButton").innerText = "Copied!";
    }

    render() {
        return (
            <div className={this.props.visibility + " h-100 position-relative"}>
                <h2 className='text-center'>Redmine code:</h2>
                <div id="redmineCode">
                    <pre id="preRedmineCode">
                        {this.props.redmineCode}
                    </pre>
                    <div
                        onClick={this.copy.bind(this)}
                        id="copyButton"
                        className="copy btn btn-secondary"
                    >
                        <p className='m-0' >Copy code</p>
                    </div>
                </div>

                <div className=" position-absolute bottom-0 end-0 m-3">
                    <div className="btn btn-danger me-2"
                        onClick={this.props.back.bind(this)}>
                        <span>Escanear otro excel</span>
                    </div>
                </div>
            </div>
        )
    }
}