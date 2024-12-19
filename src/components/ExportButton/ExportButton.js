import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, fileName }) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Analytics');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <Button variant="contained" color="secondary" onClick={exportToExcel}>
            Export to Excel
        </Button>
    );
};

export default ExportButton;
