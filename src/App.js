import React from 'react';
import { EditTable } from './EditTable';
import { DragFileHere } from './DragFileHere';
import { Loading } from './Loading';

var XLSX = require("xlsx");

// Use it like so:
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'drop-zone-hide',
      excel2DArray: [],
      tableSize: [0, 0],
      excelFilename: "",
      redmineCode: "",
      redmineCodeVisibility: "d-none",
      excelTableVisibility: "d-none",
      loadingVisibility: "d-none",
      dragFileVisibility: "",
      detectDragVisibility: ""
    }
    this.excelInput = undefined;
    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    this.excelArrayExtraDataProps = [
      "!margins", "!ref", "!merges"
    ];
    this.allowedExtensions = [
      "xlsx",
      "xlsb",
      "xlsm",
      "xls",
      "xml",
      "csv",
      "txt",
      "ods",
      "fods",
      "uos",
      "sylk",
      "dif",
      "dbf",
      "prn",
      "qpw",
      "html"
    ];
  }

  componentDidMount() {
    this.excelInput = document.getElementById('excelInput');
    document.getElementById('detectDrag').addEventListener('mouseup', this._onDragLeave);
    document.getElementById('detectDrag').addEventListener('dragenter', this._onDragEnter);
    document.getElementById('detectDrag').addEventListener('dragover', this._onDragOver);
    document.getElementById('detectDrag').addEventListener('dragleave', this._onDragLeave);
    document.getElementById('detectDrag').addEventListener('drop', this._onDrop);
    this.excelInput.addEventListener('change', this._onBrowse.bind(this));

    // this.setState({"inputTextTool":document.getElementById("flexRadioDefault1")});
    this.inputHeaderTool = document.getElementById("flexRadioDefault2");
    this.inputTextColorTool = document.getElementById("flexRadioDefault3");
    this.textColorTool = document.getElementById("textColorTool");
    this.inputBgColorTool = document.getElementById("flexRadioDefault4");
    this.bgColorTool = document.getElementById("bgColorTool");
    // this.excelInput.setAttribute("value","C:\\xampp\\htdocs\\Programing\\web\\acolmenero.com\\redmine-vanilla\\xlsx\\Book1.xlsx")
    // setTimeout(this._onBrowse.bind(this), 500);
  }

  // componentWillUnmount() {
  //     window.removeEventListener('mouseup', this._onDragLeave);
  //     window.removeEventListener('dragenter', this._onDragEnter);
  //     window.addEventListener('dragover', this._onDragOver);
  //     document.getElementById('dragPanel').removeEventListener('dragleave', this._onDragLeave);
  //     window.removeEventListener('drop', this._onDrop);
  // }

  _onDragEnter(e) {
    this.setState({ className: 'drop-zone-show' });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  _onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  _onDragLeave(e) {
    this.setState({ className: 'drop-zone-hide' });
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  readExcel = async (file) => {
    const fileReader = await new FileReader();
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e) => {
      const bufferArray = e.target.result
      const wb = XLSX.readFile(bufferArray, {
        type: "buffer"
      })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]

      if (ws['!merges']) {
        ws['!merges'].map((merge) => {
          const value = XLSX.utils.encode_range(merge).split(':')[0];
          for (let col = merge.s.c; col <= merge.e.c; col++) {
            for (let row = merge.s.r; row <= merge.e.r; row++) {
              ws[String.fromCharCode(65 + col) + (row + 1)] = ws[value];
            }
          }
        });
      }

      this.buildTableFromWS(ws);

    }
  }

  buildTableFromWS = async (ws) => {

    let table = [];
    let merges = [];
    let streched = [];
    let tableWidth = 0;
    let tableHeight = 0;

    let keys = Object.keys(ws).sort();
    keys = keys.map((key) => {
      return [this.letters.indexOf(key[0]) + 1, parseInt(key.substring(1)), key];
    });
    keys = keys.sort(([a, b], [c, d]) => c - a || d - b);

    for (let z = 0; z < keys.length; z++) {
      let key = keys[z][2];
      let x = this.letters.indexOf(key[0]) + 1;
      let y = parseInt(key.substring(1));
      if (x > tableWidth) tableWidth = x;
      if (y > tableHeight) tableHeight = y;
    }

    this.setState({ "tableSize": [tableWidth, tableHeight] });

    for (let x = 0; x < tableHeight; x++) {
      table[x] = [];
      for (let y = 0; y < tableWidth; y++) {
        table[x][y] = { "value": "", "rowspan": 1, "colspan": 1 };
      }
    }

    keys.reverse();
    for (const [x, y, key] of keys) {

      let value = ws[key];

      switch (key) {
        case "!ref":
          break;
        case "!margins":
          break;
        case "!merges":

          for (let x = 0; x < value.length; x++) {

            let x1 = value[x]["s"]["c"];
            let y1 = value[x]["s"]["r"];
            let x2 = value[x]["e"]["c"];
            let y2 = value[x]["e"]["r"];

            if (x1 == x2) {
              streched.push([x1, y1, y2 - y1, 0])
            } else if (y1 == y2) {
              streched.push([x1, y1, 0, x2 - x1])
            } else {
              streched.push([x1, y1, y2 - y1, x2 - x1]);
            }
            merges.push([x1, y1, x2, y2]);
          }

          break;
        default:

          let val = "";
          if (value) {
            val = value.v;
          }
          let gap = {
            "value": val,
            "rowspan": 1,
            "colspan": 1,
            "display": "",
            "styles": "border",
            "textColor": "",
            "bgColor": "",
            "isHeader": false,
            // "textColorVirgen": true,
          };
          // console.log(x - 1, y - 1);
          let isMerged = this.checkIsMerged(x - 1, y - 1, merges);
          let isStreched = this.getStrech(x - 1, y - 1, streched);

          if (isMerged) {
            if (isStreched.length) {
              // console.log(x,y,isStreched);
              gap.rowspan = isStreched[0];
              gap.colspan = isStreched[1];
            } else {
              gap.display += " d-none";
            }
          }
          table[y - 1][x - 1] = gap;

      }
    }

    if (table[0][0].value.length === 0 && table[1][0].value.length !== 0 && table[0][1].value.length !== 0) {
      for (let z = 1; z < table[0].length; z++) {
        table[0][z].isHeader = !table[0][z].isHeader;
      }
      for (let x = 0; x < table.length; x++) {
        table[x][0].isHeader = !table[x][0].isHeader;
      }
    }

    // console.log(table);
    this.setState({ "dragFileVisibility": "d-none" });
    this.setState({ "loadingVisibility": "" });
    this.getRedmineTableCode(table);
    this.excelInput.value = "";


  }

  getRedmineTableCode(table) {

    let redmineCode = "";

    for (let x = 0; x < table.length; x++) {
      let row = table[x];

      if (!row) continue;
      for (let y = 0; y < row.length; y++) {
        const gap = row[y];
        let val = gap.value || "";
        // console.log(val);
        val = val.toString().trim();
        let colspan = gap.colspan;
        let rowspan = gap.rowspan;
        let display = gap.display;
        let bgColor = gap.bgColor || "";
        let textColor = gap.textColor || "";
        let header = gap.isHeader ? "_" : "";
        let bg = "";

        if (bgColor.length !== 0 && bgColor !== "#fff" && bgColor !== "#ffffff") {
          bg = bgColor;
          bgColor = "{background:" + bgColor + "}";
        } else {
          bg = "#ffffff";
          bgColor = "";
        }
        if (textColor.length !== 0 && textColor !== "#000" && textColor !== "#000000") {
          if (val.length !== 0) {
            val = "%{color:" + textColor + "}" + val + "%";
          } else {
            textColor = "";
          }
        } else {
          textColor = "";
        }

        colspan = (colspan == 1) ? "" : "\\" + colspan;
        rowspan = (rowspan == 1) ? "" : "/" + rowspan;
        let end = (colspan || rowspan || header || bgColor || textColor) ? "." : "";
        // console.log(colspan || rowspan || header || bgColor || textColor);

        if (val.length === 0) {
          // let bg = bgColor ? bgColor : "#ffffff"
          val = "ㅤ";
        }

        if (display) {
          if (display.indexOf("d-none") != -1) {
            continue
          }
        }

        redmineCode += "|" + header + colspan + rowspan + bgColor + end + " " + val;

      }
      redmineCode += "|\n";

    }

    this.setState({ "redmineCode": redmineCode });
    this.setState({ "detectDragVisibility": "d-none" });
    setTimeout(() => {
      // console.log(this.state.redmineCode);
      this.setState({ "loadingVisibility": "d-none" });
      this.setState({ "excel2DArray": table });
      this.setState({ "excelTableVisibility": "" });
      this.setState({ "redmineCodeVisibility": "" });
      this.setState({ className: 'drop-zone-hide' });
    }, 1000);
  }

  checkIsMerged(x, y, merges) {

    let isMerged = false;
    let merge = undefined;

    // por cada MERGE
    for (let z = 0; z < merges.length; z++) {

      merge = merges[z];

      if ((x >= merge[0] && y >= merge[1]) && (x <= merge[2] && y <= merge[3])) {
        isMerged = true;
        z = merges.length;
      }
    }

    return isMerged;
  }

  getStrech(x, y, streched) {

    let isStreched = [];

    for (let z = 0; z < streched.length; z++) {

      const strech = streched[z];

      if (strech[0] === x && strech[1] === y) {
        let rowspan = strech[2] + 1;
        let colspan = strech[3] + 1;
        isStreched = [rowspan, colspan];
      }

    }

    return isStreched;
  }


  _onDrop(e) {

    // evitar descargar el excel
    e.preventDefault();

    // obtener el FILE
    let files = e.dataTransfer.files;
    const file = files[0];
    const filename = file.name;

    // guardar el nombre del documento
    this.setState({ "excelFilename": filename });

    const fileExtension = filename.split(".").at(-1)
    if (this.allowedExtensions.includes(fileExtension)) {
      this.readExcel(file)
    }

    this.setState({ className: 'drop-zone-hide' });

    return false;
  }
  browseHandler(e) {
    // this.excelInput = document.getElementById("excelInput");
    this.excelInput.click();
  }
  _onBrowse() {

    let files = this.excelInput.files;
    const file = files[0];
    const filename = file.name;

    // guardar el nombre del documento
    this.setState({ "excelFilename": filename });

    const fileExtension = filename.split(".").at(-1)
    if (this.allowedExtensions.includes(fileExtension)) {
      this.readExcel(file);
    }

    this.setState({ className: 'drop-zone-hide' });
  }
  back() {
    this.setState({ detectDragVisibility: '' });
    this.setState({ dragFileVisibility: '' });
    this.setState({ redmineCodeVisibility: 'd-none' });
    this.setState({ excelTableVisibility: 'd-none' });
    this.setState({ className: 'drop-zone-hide' });
    this.setState({ redmineCode: '' });
    this.setState({ excel2DArray: [] });
    this.setState({ excelFilename: '' });
    this.setState({ tableSize: [0, 0] });
  }

  // setNothing() {
  //   // this.setState({ usedTool: 1 }); 
  //   console.log(1);
  // }
  // setHeader() {
  //   // this.setState({ usedTool: 2 }); 
  //   console.log(2);
  // }
  // setTextColor() {
  //   // this.setState({ usedTool: 3 }); 
  //   console.log(3);
  // }
  // setBgColor() {
  //   // this.setState({ usedTool: 4 }); 
  //   console.log(4);
  // }

  gapClick(coordinates) {

    let x = coordinates[0];
    let y = coordinates[1];
    let table = this.state.excel2DArray;

    if (this.inputHeaderTool.checked) {
      table[x][y].isHeader = !table[x][y].isHeader;
      table[x][y].textColor = "";
      table[x][y].bgColor = "";


    } else if (this.inputTextColorTool.checked) {

      let textColor = this.textColorTool.value;
      let bgColor = this.bgColorTool.value;

      if (!table[x][y].isHeader) {
        table[x][y].textColor = textColor;
        table[x][y].bgColor = bgColor;
      }

    }

    this.setState({ "excel2DArray": table });
    this.getRedmineTableCode(table);
  }
  rowClick(x) {

    let table = this.state.excel2DArray;

    if (this.inputHeaderTool.checked) {
      for (let z = 0; z < table[x].length; z++) {
        table[x][z].isHeader = !table[x][z].isHeader;
        table[x][z].textColor = "";
        table[x][z].bgColor = "";
      }
    } else if (this.inputTextColorTool.checked) {

      let textColor = this.textColorTool.value;
      let bgColor = this.bgColorTool.value;

      for (let z = 0; z < table[x].length; z++) {
        if (!table[x][z].isHeader) {
          table[x][z].textColor = textColor;
          table[x][z].bgColor = bgColor;
        }
      }

    }

    this.setState({ "excel2DArray": table });
    this.getRedmineTableCode(table);
  }

  columnClick(y) {

    let table = this.state.excel2DArray;

    if (this.inputHeaderTool.checked) {
      for (let x = 0; x < table.length; x++) {
        table[x][y].isHeader = !table[x][y].isHeader;
        table[x][y].textColor = "";
        table[x][y].bgColor = "";
      }
    } else if (this.inputTextColorTool.checked) {

      let textColor = this.textColorTool.value;
      let bgColor = this.bgColorTool.value;

      for (let x = 0; x < table.length; x++) {
        if (!table[x][y].isHeader) {
          table[x][y].textColor = textColor;
          table[x][y].bgColor = bgColor;
        }
      }

    }

    this.setState({ "excel2DArray": table });
    this.getRedmineTableCode(table);

  }

  render() {
    return (
      <div className="panel">

        <div id='dragPanel' className={this.state.className}>
          <DragFileHere
            visibility={this.state.dragFileVisibility}
            supports={this.allowedExtensions}
          ></DragFileHere>
          <Loading visibility={this.state.loadingVisibility} />
          <EditTable tableName={this.state.excelFilename}
            tableSize={this.state.tableSize}
            tableArray={this.state.excel2DArray}
            visibility={this.state.excelTableVisibility}
            gapClick={this.gapClick.bind(this)}
            columnClick={this.columnClick.bind(this)}
            rowClick={this.rowClick.bind(this)}
            back={this.back.bind(this)}
            redmineCode={this.state.redmineCode}
            redmineCodeVisibility={this.state.redmineCodeVisibility}
          ></EditTable>
          <div
            id="detectDrag"
            onClick={this.browseHandler.bind(this)}
            className={this.state.detectDragVisibility}>
            <input type="file" className='d-none' id="excelInput" />
          </div>
          <div id="mobileNotAllowed">
            <p>Sorry, web not avaliable on mobiles.</p>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
