import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiExport } from "react-icons/ci";
import { RxDropdownMenu } from "react-icons/rx";
import './Home.css'
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import Spiner from '../../components/Spiner/Spiner';
import { addData, deleteData, updateData } from '../../components/context/ContextProvider';
import { allUsersDataApi, deleteSingleUserApi, exportToCsvApi } from '../../services/Api';
import { toast } from 'react-toastify';

const Home = () => {
    const { useradd, setUseradd } = useContext(addData);  // for user add alert
    const { userUpdateData, setUserUpdateData } = useContext(updateData)  // for user update alert
    const { storeDeleteData, setStoreDeleteData } = useContext(deleteData); // for user delete alert
    const navigate = useNavigate()
    const [showspinner, setShowSpinner] = useState(true);
    const [usersAllData, setUsersAllData] = useState();
    const [search, setSearch] = useState("")
    const [gender, setGender] = useState("All");
    const [status, setStatus] = useState("All");
    const [sort, setSort] = useState("new");
    // console.log(status)
    // console.log(sort)
    // console.log(usersAllData)
    const adduser = () => {
        navigate('/register');
    }

    // get all users
    const usersGetAll = async () => {
        const response = await allUsersDataApi(search, gender, status, sort);
        // console.log(response)
        if (response.status === 200) {
            setUsersAllData(response.data);
            // console.log(response.data)
        } else {
            throw new Error('failed!');
        }
    }

    // delete user
    const deleteUser = async (id) => {
        const response = await deleteSingleUserApi(id);
        if (response.status === 200) {
            usersGetAll()
            setStoreDeleteData(response.data.deletedUserData);
        } else {
            toast.error('something went wrong!');
        }
    }

    // export user
    const exportUser = async () => {
        const response = await exportToCsvApi()
        // console.log(response);
        if (response.status === 200) {
            window.open(response.data.downloadUrl, "blank");
        } else {
            toast.error('error !');
        }
    }



    useEffect(() => {
        usersGetAll();
        setTimeout(() => {
            setShowSpinner(false)
        }, 1200);
    }, [search, gender, status, sort])

    return (
        <>
            {
                useradd ?
                    <Alert variant="success" onClose={() => setUseradd('')} dismissible>{(useradd.firstName).toUpperCase()} successfully registered!</Alert> :
                    userUpdateData ?
                        <Alert variant="success" onClose={() => setUserUpdateData('')} dismissible>{(userUpdateData.firstName).toUpperCase()} successfully Updated!</Alert> :
                        storeDeleteData ?
                            <Alert variant="success" onClose={() => setStoreDeleteData('')} dismissible>{(storeDeleteData.firstName).toUpperCase()} successfully deleted from the list !</Alert> : ''
            }
            <Container fluid="lg">
                <Row className='mt-4 search_add'>
                    <Col md={4} className="search">
                        <Form className='d-flex'>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className='me-2'
                                aria-label='Search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="success" type="submit" className='search_btn'>
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col md={8} className="add_btn mt-3 mt-md-0">
                        <Button variant="primary" type="submit" className='float-end' onClick={adduser}>
                            <AiOutlineUserAdd size={20} />&nbsp;
                            Add User
                        </Button>
                    </Col>
                </Row>
                {/* export, gender, status */}
                <Row className='mt-5 filter_div'>
                    <Col md={3} className="export_csv col-6">
                        <Button variant="primary" type="submit" className='export_btn' onClick={exportUser}>
                            <CiExport size={20} />&nbsp;
                            export to csv
                        </Button>
                    </Col>
                    {/* sort By value */}
                    <Col md={3} className="filter_newold text-center-md col-6">
                        <h3 className='fontsize'>Sort By value</h3>
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant='white' className='dropdown_btn' id="dropdown-autoclose-true">
                                <RxDropdownMenu size={20} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <span onClick={() => setSort("new")}>New</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span onClick={() => setSort("old")}>Old</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={3} className="filter mt-3 mt-md-0 col-6">
                        <h3 className='fontsize'>Filter By Gender</h3>
                        <Form.Group className="mb-3 flex-column" controlId="formBasicEmail">
                            <Form.Check
                                type={"radio"}
                                label={"All"}
                                value={"All"}
                                name="gender"
                                className='me-3'
                                defaultChecked
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"Male"}
                                value={"Male"}
                                name="gender"
                                className='me-3'
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"Female"}
                                value={"Female"}
                                name="gender"
                                className='me-3'
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </Form.Group>

                    </Col>

                    {/* filter by status */}
                    <Col md={3} className="filter_status mt-3 mt-md-0 col-6">
                        <h3 className='fontsize'>Filter By Status</h3>
                        <Form.Group className="mb-3 flex-column" controlId="formBasicEmail">
                            <Form.Check
                                type={"radio"}
                                label={"All"}
                                value={"All"}
                                name="status"
                                className='me-3'
                                defaultChecked
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"Active"}
                                value={"Active"}
                                name="status"
                                className='me-3'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <Form.Check
                                type={"radio"}
                                label={"InActive"}
                                value={"InActive"}
                                name="status"
                                className='me-3'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                </Row>
                {
                    showspinner ? <Spiner /> : <Tables usersAllData={usersAllData} deleteUser={deleteUser} usersGetAll={usersGetAll} />
                }

            </Container>
        </>
    )
}

export default Home