import React from 'react'
import * as XLSX from 'xlsx';

const ExportExcel = ({ data, fileName, sheetName }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      };
    
      return (
        <button className="btn btn-success" onClick={exportToExcel}>
          Xuất Excel
        </button>
      );
}

export default ExportExcel