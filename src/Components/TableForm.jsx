import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

////////////////////////////////////////////////////////////////////

const TableForm = (props) => {

    function createData(name, parkingInfo) {
        return { name, parkingInfo };
    }

    const rows = [
        createData('Weekday 1', (props.weekOne)),
        createData('Weekday 2', props.weekTwo),
        createData('Saturday', props.sat),
        createData('Sunday/PH', props.sun),

    ];

    return (
        <div className="parkingRatesContainer" >
            <TableContainer component={Paper} style={{ maxWidth: "800px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rates</TableCell>
                            <TableCell align="right">{props.parking}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.parkingInfo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default TableForm;