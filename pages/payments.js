import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    paymentsGrid: {
    },
    paymentsGridHeader: {
        textAlign: "center",
    },
    paymentsGridCell: {
        textAlign: "center !important",
    }
});

export default  function Payments({payments}) {
    const classes = useStyles();

    useEffect( () => {
        console.log(payments);
    }, [payments])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid className={classes.paymentsGrid}
                columns={[{ field: '_id', headerName: 'Opération', flex: 0.5, headerClassName: 'paymentsGridHeader',
                    headerAlign: 'center'},
                    { field: 'label', headerName: 'Libellé', flex: 1, headerClassName: 'paymentsGridHeader',
                        headerAlign: 'center' },
                    { field: 'amount', headerName: 'Montant', flex: 0.5, headerClassName: 'paymentsGridHeader',
                        headerAlign: 'center', cellClassName: 'paymentsGridCell' },
                    { field: 'status', headerName: 'Status', flex: 0.5, headerClassName: 'paymentsGridHeader',
                        headerAlign: 'center', cellClassName: 'paymentsGridCell' },
                    { field: 'transactionDate', headerName: 'Date du traitement', flex: 1, headerClassName: 'paymentsGridHeader',
                        headerAlign: 'center', cellClassName: 'paymentsGridCell' }]}
                rows={payments}
            />
        </div>
    )
}


export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3000/api/payment");

    const payments = await res.data
    console.log(payments)

    return {
        props: {
            payments,
        },
    }
}
