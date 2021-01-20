import { ButtonGroup, InputAdornment, List, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, withStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useTable from '../components/useTable'
import * as actions from "../actions/order";
import { connect } from "react-redux";
import Controls from "../components/controls/Controls";
import { Add, Close, EditOutlined, PhotoLibrary, Search, ViewList } from '@material-ui/icons';
import MainForm from "./MainForm";

const styles = () => ({
    paper: {
        padding: '1%',
        marginTop: '3%',
        marginRight: '5%',
        marginLeft: '5%'
    },
    pageContent: {
        margin: '3%',
        padding: '2%',
    },
    searchInput: {
        width: "75%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
})

const headCells = [
    { id: "date", label: "วันที่ขาย" },
    { id: "storeId", label: "Store" },
    { id: "pool", label: "Pool" },
    { id: "qty", label: "จำนวน" },
    { id: "amount", label: "ยอดเงินรวม" },
    { id: "dueDate", label: "วันที่ติดตั้ง" },
    { id: "salesId", label: "Sales order" },
    { id: "purchId", label: "Purchase order" },
    { id: "custName", label: "ชื่อลูกค้า" },
    { id: "action", label: "", disableSoring: true },
]

const Main = ({ classes, ...props }) => {

    const [recordForEdit, setRecordForEdit] = useState(null);

    useEffect(() => {
        props.fetchAllOrder();
    }, [])

    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState(props.orderList);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn)

    const openInPopup = (item) => {
        setRecordForEdit(item);
        //setOpenPopup(true);
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Controls.Input
                        label="Search"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search></Search>
                                </InputAdornment>
                            )
                        }}
                    ></Controls.Input>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<Add />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead></TblHead>
                    <TableBody>
                        {
                            
                            recordsAfterPagingAndSorting().map((record, index) => {
                                console.log('TableRow ===');
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.storeId}</TableCell>
                                        <TableCell>{record.pool}</TableCell>
                                        <TableCell>{record.qty}</TableCell>
                                        <TableCell>{record.amount}</TableCell>
                                        <TableCell>{record.confirmDate}</TableCell>
                                        <TableCell>{record.salesId}</TableCell>
                                        <TableCell>{record.purchId}</TableCell>
                                        <TableCell>{record.custName}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => {
                                                        openInPopup(record);
                                                    }}
                                                >
                                                    <EditOutlined fontSize="small"></EditOutlined>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="secondary"
                                                >
                                                    <Close fontSize="small"></Close>
                                                </Controls.ActionButton>
                                                <Controls.ActionButtonBadge
                                                    color="primary"
                                                    onClick={() => {
                                                        openInPopup(record);
                                                    }}
                                                >
                                                    <PhotoLibrary fontSize="small"></PhotoLibrary>
                                                </Controls.ActionButtonBadge>
                                                <Controls.ActionButtonBadge
                                                    color="secondary"
                                                >
                                                    <ViewList fontSize="small"></ViewList>
                                                </Controls.ActionButtonBadge>
                                            </ButtonGroup>

                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination></TblPagination>
            </Paper>
            <Controls.Popup
                title="New Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <MainForm></MainForm>
            </Controls.Popup>
        </>
    )
}

const mapStateToProps = (state) => ({
    orderList: state.order.list
})

const mapActionToProps = {
    fetchAllOrder: actions.fetchAll
    //fetchStoreOrder: actions.fetchStore
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Main));
