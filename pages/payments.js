import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';

const statusEnum = new Map([
    [0, "UNKNOW"],
    [1, "PENDING"],
    [2, "ACCEPTED"],
    [3, "VALIDATED"]
])

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
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid className={classes.paymentsGrid}
                      id='id'
                      columns={[{ field: 'id', headerName: 'Opération', flex: 0.5, headerClassName: 'paymentsGridHeader',
                        headerAlign: 'center', cellClassName: 'MuiDataGrid-cellCenter'},
                        { field: 'label', headerName: 'Libellé', flex: 1, headerClassName: 'paymentsGridHeader',
                            headerAlign: 'center' },
                        { field: 'amount', headerName: 'Montant', flex: 0.5, headerClassName: 'paymentsGridHeader',
                            headerAlign: 'center', cellClassName: 'MuiDataGrid-cellCenter' },
                        { field: 'status', headerName: 'Status', flex: 0.5, headerClassName: 'paymentsGridHeader',
                            headerAlign: 'center', cellClassName: 'MuiDataGrid-cellCenter' },
                        { field: 'transactionDate', headerName: 'Date du traitement', flex: 1, headerClassName: 'paymentsGridHeader',
                            headerAlign: 'center', cellClassName: 'MuiDataGrid-cellCenter' }]}
                      rows={payments}
                      sortingOrder={['desc', 'asc']}
                      sortModel={[
                          {
                              field: 'transactionDate',
                              sort: 'desc',
                          }
                      ]}
            />
        </div>
    )
}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3000/api/payment");
    const payments = res.data.map(
        (payment, id) => {
            return {
                ...payment,
                id : id + 1,
                transactionDate : new Date(payment.transactionDate).toString(),
                amount : payment.amount / 100,
                status : statusEnum.get(payment.status)
            }
        })

    console.log(payments)

    return {
        props: {
            payments,
        },
    }
}
