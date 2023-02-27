import React, { useContext, useEffect, useState } from 'react'
import './Edit.css'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import Spiner from '../../components/Spiner/Spiner';
import { useNavigate, useParams } from 'react-router-dom';
import { singleUserDataApi, updateUserApi } from '../../services/Api';
import { BASE_URL } from '../../services/helper';
import { updateData } from '../../components/context/ContextProvider';

const Edit = () => {
    const [showspinner, setShowSpinner] = useState(true);
    const { userUpdateData, setUserUpdateData } = useContext(updateData);
    const navigate = useNavigate();
    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [imgData, setImgData] = useState("");
    const { id } = useParams();
    const [inputdata, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        location: ""
    })
    console.log(inputdata);
    console.log(status);
    console.log(imgData);

    // status options
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];

    // set input value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputdata,
            [name]: value
        })
    }


    // set status
    const setStatusValue = (e) => {
        setStatus(e.value)
    }

    // set profile img >>
    const setProfile = (e) => {
        setImage(e.target.files[0])
        // console.log(e.target.files[0])
    }

    const getSingleUser = async () => {
        const response = await singleUserDataApi(id);
        if (response.status == 200) {
            setInputData(response.data);
            setStatus(response.data.status);
            setImgData(response.data.profile);
            
        } else {
            console.log('err');
        }
    }
    useEffect(()=>{
        getSingleUser();
    }, [id])
    // console.log(inputdata)
    useEffect(() => {
        if (image) {
            setImgData("");
            setPreview(URL.createObjectURL(image));
        }
        setTimeout(() => {
            setShowSpinner(false)
        }, 1200);
    }, [image])

    // form data submit
    const updateUserData = async (e) => {
        e.preventDefault()
        const { firstName, lastName, email, mobile, gender, location } = inputdata

        if (!firstName) {
            toast.error('first Name is required !');
        } else if (!lastName) {
            toast.error('last Name is required !');
        } else if (!email) {
            toast.error('email is required !');
        } else if (!email.includes('@gmail.com')) {
            toast.error('Enter vaild email !');
        } else if (!mobile) {
            toast.error('mobile is required !');
        } else if (mobile.length !== 10) {
            toast.error('Enter corrent mobile number !')
        } else if (!gender) {
            toast.error('gender is rquired !');
        } else if (!location) {
            toast.error('location is required !');
        } else if (!status) {
            toast.error('status is required !')
        } else {
            const data = new FormData();
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('email', email)
            data.append('mobile', mobile)
            data.append('gender', gender)
            data.append('status', status)
            data.append('user_profile', image || imgData)
            data.append('location', location)

            const config = {
                "content-type": "application/form-data"
            }
            const response = await updateUserApi(id, data, config);
            if (response.status === 200) {
                setUserUpdateData(response.data)
                toast.success('User updated the data !')
                navigate('/');
            } else {
                toast.error('getting some error !')
            }
        }

    }

    return (
        <>
            {
                showspinner ?
                    <Spiner /> :
                    <Container>
                        <h2 className='text-center mt-3 mb-3'>Update User profile</h2>
                        <Card className='shadow'>
                            <Card.Header className='profile_div text-center'>
                                <img src={image ? preview : `${BASE_URL}/upload/${imgData}`} width={160} height={160} alt="profile" />
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" name="firstName" value={inputdata.firstName} onChange={setInputValue} placeholder="Enter firstName" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" name="lastName" value={inputdata.lastName} onChange={setInputValue} placeholder="Enter lastName" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue} placeholder="Enter email" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                                                <Form.Label>Mobile Number</Form.Label>
                                                <Form.Control type="number" name="mobile" value={inputdata.mobile} onChange={setInputValue} placeholder="Enter mobileNumber" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Select Your Gender</Form.Label>
                                                <Form.Check
                                                    type={"radio"}
                                                    label={"Male"}
                                                    value={"Male"}
                                                    name="gender"
                                                    onChange={setInputValue}
                                                    checked={inputdata.gender === 'Male' ? true : false}
                                                />
                                                <Form.Check
                                                    type={"radio"}
                                                    label={"Female"}
                                                    value={"Female"}
                                                    name="gender"
                                                    onChange={setInputValue}
                                                    checked={inputdata.gender === 'Female' ? true : false}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Select Your Status</Form.Label>
                                                <Select
                                                    defaultValue={status}
                                                    onChange={setStatusValue}
                                                    options={options}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="formFileSm" className="mb-3">
                                                <Form.Label>Select Your Profile</Form.Label>
                                                <Form.Control type="file" name="user_profile" onChange={setProfile} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email Your Location</Form.Label>
                                                <Form.Control type="text" name="location" value={inputdata.location} onChange={setInputValue} placeholder="Enter Your Location" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="float-end" type="submit" onClick={updateUserData}>
                                        Submit
                                    </Button>
                                    <Button variant="primary" className="float-end me-3" type="submit" onClick={() => navigate("/")}>
                                        Go Back
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <ToastContainer
                            position="top-right"
                        />
                    </Container>
            }
        </>
    )
}

export default Edit