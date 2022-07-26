import React from 'react';
import { v4 as uuid } from "uuid";

export class ExcelTable extends React.Component {
    constructor(props) {
        super(props);
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    }

    renderHeader = (size) => {
        // console.log(size);
        let width = size[0];
        let cols = [26, ...Array(width).keys()];
        // console.log(cols);
        return (
            cols.map((val, y) => {
                return (
                    <td
                        className="border bg-dark bg-opacity-25"
                        key={uuid()}
                        onClick={this.props.columnClick.bind(this, y - 1)}
                    >
                        {this.letters[val]}
                    </td>
                )
            })
        )
    }

    render() {
        return (
            <div id="tableContent" className={this.props.riseCodeLevel}>
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderHeader(this.props.tableSize)}
                        </tr>
                    </thead>
                    <tbody>
                        {


                            this.props.tableArray.map((row, x) => {
                                return (
                                    <tr key={uuid()}>
                                        <td
                                            className="border bg-dark bg-opacity-25"
                                            onClick={this.props.rowClick.bind(null, x)}
                                            key={uuid()}
                                        >
                                            {x}
                                        </td>
                                        {
                                            row.map((gap, y) => {

                                                let className = gap.display + " gap " + gap.styles;

                                                if (gap.isHeader) {
                                                    className += " headerGap";
                                                }

                                                return (
                                                    <td
                                                        className={className}
                                                        key={uuid()}
                                                        rowSpan={gap.rowspan}
                                                        colSpan={gap.colspan}
                                                        style={{
                                                            color: gap.textColor,
                                                            backgroundColor: gap.bgColor
                                                        }}
                                                        onMouseDown={this.props.gapClick.bind(null, [x, y])}
                                                    >
                                                        {
                                                            gap.value
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}