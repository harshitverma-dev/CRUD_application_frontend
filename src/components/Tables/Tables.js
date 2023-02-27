import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import userDataEmptyImg from './../../assets/no-data-icon-10.png'
import { BASE_URL } from '../../services/helper';
import './Tables.css'
import { NavLink } from 'react-router-dom';
import { updateUserStatusApi } from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';

const Tables = ({ usersAllData, deleteUser, usersGetAll }) => {
// console.log(usersAllData)
    const changeStatus = async (id, status) => {
        const response = await updateUserStatusApi(id, status);
        if (response.status === 200) {
            usersGetAll();
            toast.success("Status Updated successfully !");
        } else {
            toast.error("error");
        }

    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card className='shadow'>
                        <Table responsive bordered hover size="sm" className='user_data'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Id</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Mobile</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersAllData?.length > 0 ?
                                        usersAllData.map((items, index) => {
                                            {/* console.log(items) */ }
                                            const { firstName, lastName, email, mobile, gender, status, profile, location } = items
                                            {/* console.log(profile) */ }
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{firstName}&nbsp;{lastName}</td>
                                                    <td>{email}</td>
                                                    <td>{gender}</td>
                                                    <td>{mobile}</td>
                                                    <td>{location}</td>
                                                    <td>
                                                        <Dropdown className="d-inline mx-2">
                                                            <Dropdown.Toggle variant='white' className='dropdown_btn' id="dropdown-autoclose-true">
                                                                <Badge bg={status == "Active" ? "primary" : "danger"}>
                                                                    {status} <MdOutlineKeyboardArrowDown size={15} />
                                                                </Badge>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => changeStatus(items._id, "Active")}>Active</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => changeStatus(items._id, "InActive")}>InActive</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                    <td className='img_parent'>
                                                        <img src={`${BASE_URL}/upload/${profile}`} width={40} height={40} alt="profile" />
                                                    </td>
                                                    <td className="action">
                                                        <Dropdown className="d-inline mx-2">
                                                            <Dropdown.Toggle variant='white' className='dropdown_btn' id="dropdown-autoclose-true">
                                                                <Badge bg='white'>
                                                                    <HiOutlineDotsVertical size={15} color="#000" />
                                                                </Badge>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="">
                                                                    <NavLink to={`/userprofile/${items._id}`} className="text-decoration-none">
                                                                        <AiOutlineEye size={15} /> View
                                                                    </NavLink>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item href="#">
                                                                    <NavLink to={`/edit/${items._id}`} className="text-decoration-none">
                                                                        <GrEdit size={15} /> Edit
                                                                    </NavLink>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <div onClick={() => deleteUser(items._id)}>
                                                                        <AiOutlineDelete size={15} /> Delete
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>

                                                </tr>
                                            )
                                        }) : <tr className='emptyState'>
                                            <td colSpan={9}>
                                                <img src={userDataEmptyImg} alt="empty_data_img" />
                                            </td>
                                        </tr>
                                }

                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
            <ToastContainer
                position="top-right"
            />
        </Container>
    )
}

export default Tables