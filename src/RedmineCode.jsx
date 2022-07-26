import React from 'react';

export class RedmineCode extends React.Component {
    constructor(props) {
        super(props);
        
    }

    //<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clipboard2 ms-2" viewBox="0 0 16 16"><path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z" /><path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" /></svg>
    copyCode() {
        const textArea = document.createElement('textarea');
        textArea.textContent = this.props.redmineCode;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        document.getElementById("copyButton").innerText = "Code copied!";
        setTimeout(() => {
            document.getElementById("copyButton").innerHTML = '<span>Copy redmine code! </span>';
        }, 1000);
    }

    

    render() {
        //this.props.visibility + " " + 
        return (
            <div className={this.props.riseCodeLevel} id="redmineCode">
                <div id="redmineCodeHeader">
                    <p>Redmine code:</p>
                    <div id="redmineCodeHeader2">

                        <div
                            onClick={this.copyCode.bind(this)}
                            id="copyButton"
                            className="copy btn btn-secondary">
                            <p className='m-0' >Copy redmine code!</p>
                        </div>
                        <div
                            onClick={this.props.riseCode}
                            id="riseButton"
                            className="copy btn btn-secondary">
                            <span className='m-0 svgup' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#fff" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                </svg>
                            </span>
                        </div>

                    </div>
                </div>
                <pre id="preRedmineCode">
                    {this.props.redmineCode}
                </pre>
            </div>
        )
    }
}