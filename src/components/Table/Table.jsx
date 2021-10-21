import React from 'react';
import { default as BootstrapTable } from 'react-bootstrap/Table'

const Table = (props) => {

    const { header, row , paymentTerms } = props;

    console.log(props);
    console.log(row)
    const RenderHeader = () => {
        return (
            Object.values(header).map((item, i) => (
                <th>{item}</th>
            ))
        )
    }


    const RenderBody = () => {
        return (
            row.map((item, i) => {
                return (
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td className="font-weight-bold">Account Name</td>
                                    <td>{item.fromAccount.accountName}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Sort Code</td>  
                                    <td>{item.fromAccount.sortCode}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Account Number</td>
                                    <td>{item.fromAccount.accountNumber}</td>
                                </tr>
                            </table>
                        </td>
                        <td>{item.paymentAmount}</td>
                        <td>{item.paymentCurrency}</td>
                        <td>{item.paymentDate}</td>
                        <td>{paymentTerms[item.paymentStatus]}</td>
                        <td>{item.paymentType}</td>
                        <td>
                        <table>
                                <tr>
                                    <td className="font-weight-bold">Account Name</td>
                                    <td>{item.toAccaunt.accountName}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Sort Code</td>  
                                    <td>{item.toAccaunt.sortCode}</td>
                                </tr>
                                <tr>
                                    <td className="font-weight-bold">Account Number</td>
                                    <td>{item.toAccaunt.accountNumber}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                )
            })
        )
    }
    return (
        <BootstrapTable bordered hover size="sm">
            <thead>
                <tr>
                    <RenderHeader />
                </tr>
            </thead>
            <tbody>
                <RenderBody />
            </tbody>
        </BootstrapTable>
    )
}

export default Table;