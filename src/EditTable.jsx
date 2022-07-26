import React from "react";
import { EditTableForm } from './EditTableForm';
import { ExcelTable } from './ExcelTable';
import { RedmineCode } from './RedmineCode';


export class EditTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            riseCodeLevel: ""
        }
    }

    riseCode() {
        console.log(this.state.riseCodeLevel);
        if (this.state.riseCodeLevel) {
            this.setState({ "riseCodeLevel": "" });
        } else {
            this.setState({ "riseCodeLevel": "riseCode" });
        }
    }

    render() {
        return (

            <div className={this.props.visibility + " h-100 position-relative"}>

                <div className='text-center'><h2 className='m-0 my-2 fw-bold'> {this.props.tableName} </h2></div>

                <EditTableForm></EditTableForm>

                <ExcelTable
                    tableSize={this.props.tableSize}
                    tableArray={this.props.tableArray}
                    gapClick={this.props.gapClick}
                    columnClick={this.props.columnClick}
                    rowClick={this.props.rowClick}
                    riseCodeLevel={this.state.riseCodeLevel}
                ></ExcelTable>

                <RedmineCode
                    visibility={this.props.redmineCodeVisibility}
                    redmineCode={this.props.redmineCode}
                    riseCode={this.riseCode.bind(this)}
                    riseCodeLevel={this.state.riseCodeLevel}
                ></RedmineCode>

                <div className=" position-absolute top-0 end-0 text-end">
                    <div className="btn btn-danger me-2 mb-1"
                        onClick={this.props.back.bind(this)}>
                        <span>Escanear otro excel</span>
                    </div> <br />
                    {/* <div className="btn btn-dark"
                        id="copyButton"
                        onClick={this.copy.bind(this)}>
                        <span>Copy redmine code!
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clipboard2 ms-2" viewBox="0 0 16 16">
                                <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z" />
                                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                            </svg>
                        </span>
                    </div> */}
                </div>

            </div>
        )
    }
}
