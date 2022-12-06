import React from "react";
import { useTable } from 'react-table'

function Price_display(props) {
    console.log(props.data)
    const data = React.useMemo(
        () => props.data[props.currency],
        [props.data, props.currency]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Quantity' + ' (' +props.currency + ')',
                accessor: 'quantity',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
        ],
        [props.currency]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()} style={{ border: 'solid 0.3px grey', backgroundColor:'rgba(0,0,0,0.3)'}}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            style={{
                                color: 'white',
                                fontSize: '1rem',
                                width:'8.5rem',
                                textAlign: column['Header'] === 'Price' ?'left':'right',
                                padding: '2px 2rem 0.7rem 2rem',
                            }}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()} style={{maxHeight:'10rem'}}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        textAlign:cell.column['Header'] === 'Price' ?'left':'right',
                                        padding: '2px 2rem 2px 2rem',
                                        fontSize: '0.8rem',
                                        color: cell.column['Header'] === 'Price' ? (props.type === 'S' ?'green':props.type === 'B' ?'red':'white'):'white',
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default Price_display