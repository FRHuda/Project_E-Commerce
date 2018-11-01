import React, { Component } from 'react';
import { UncontrolledCollapse } from 'reactstrap';

// IMPOR CSS
import '../Supports/css/components/transaction.css';

class Transaction extends Component {
    render() {
        return (
            <div class="panel">
                <div class="panel-heading">Transactions</div>
                <div class="container filters">
                    <div class="col-md-3">
                        <input type="text" id="searchbox" class="form-control" placeholder="Search by keyword" />
                    </div>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction details</th>
                            <th>Currency</th>
                            <th class="rightAlign">Amount</th>
                            <th>Token ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="transaction-row collapsed" id='cobalagi' >
                            <td>02 Feb 2016</td>
                            <td class="transaction-details">the purspoes of this paymen...</td>
                            <td class="uppercase">AUD</td>
                            <td class="rightAlign"><span><i class="fa fa-minus red"></i> 1,334.23</span></td>
                            <td>?ILxO6vN</td>
                            <td>SETTLED</td>
                        </tr>
                        <UncontrolledCollapse toggler="#cobalagi" class="more-detail" colspan="6">

                        </UncontrolledCollapse>


                        <tr class="transaction-row collapsed" data-toggle="collapse" data-target="#cOCekrw-hidden">
                            <td>02 Feb 2016</td>
                            <td class="transaction-details">the purspoes of this paymen...</td>
                            <td class="uppercase">AUD</td>
                            <td class="rightAlign"><span><i class="fa fa-minus red"></i> 1,334.23</span></td>
                            <td>?cOCekrw</td>
                            <td>SETTLED</td>
                        </tr>

                        <tr id="cOCekrw-hidden" class="collapse">
                            <td colspan="6" class="more-detail">
                                <span class="notch"></span>
                                <div class="container-fluid"></div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <i class="fa fa-clock-o"></i> 19:02:20 PM
                                    </div>
                                    <div class="col-md-3 col-md-offset-6">
                                        <button class="btn btn-info trace-btn" data-toggle="modal" data-target="#transaction-history-modal">Trace</button>
                                    </div>
                                </div>
                                <h3>From Account</h3>
                                <div class="row">
                                    <div class="col-md-3">
                                        <p><b>Paski Dhileep</b></p>
                                        <p>3250834058340698430<small>Hong Kong</small></p>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Purpose</b></p>
                                        <p>the purspoes of this payment is for POC purposes</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Authorised by</b></p>
                                        <p>Paski Dhileep</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Transaction date and time</b></p>
                                        <p>02/02/16 19:02:20 PM</p>
                                    </div>
                                </div>
                                <h3>To Account</h3>
                                <div class="row">
                                    <div class="col-md-3">
                                        <p><b>My Mate His Name</b></p>
                                        <p>463464645<small>CHINA</small>
                                        </p>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Attachments</b></p>
                                        <ul>
                                            <li>
                                                <a target="_blank" href="https://sparro-uploads.s3.amazonaws.com/7b33bcdf-24d9-4c16-9f03-47fd2e1772ff.pdf">Purpose of payment</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Exchange Rate</b></p>
                                        <p>1 AUD = 0.25 HKD</p>
                                    </div>
                                    <div class="col-md-3">
                                        <p><b>Amount</b></p>
                                        <p>HKD <i class="fa fa-plus green"></i> 6,345.23</p>
                                    </div>
                                </div>
                                <h3>Notes</h3>
                                <p>I Only paid you half cos you're a dickhead, Also this is a long text field to show what ould happen if there was this much data. la la l al  la la l a Umm... Some other text that I'm typing in, There should be a text cap on the notes field.</p>
                            </td>
                        </tr>
                        <tr>
                            <button className="btn btn-default" id='coba' style={{ marginBottom: '1rem', width: '150px', backgroundColor: "#8c8c8c" }}>Coba</button>
                            <UncontrolledCollapse toggler='#coba' className="sub-menu">
                                <li>
                                    <a href={`/shop?category=coba`}>All</a>
                                </li>
                            </UncontrolledCollapse>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="load-more" colspan="6">Load more</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Transaction;