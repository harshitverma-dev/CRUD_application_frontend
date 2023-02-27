import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import './Profile.css'
import { MdOutlineMail, MdMobileFriendly } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { GoLocation, GoCalendar } from "react-icons/go";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import Spiner from '../../components/Spiner/Spiner';
import { singleUserDataApi } from '../../services/Api';
import { BASE_URL } from '../../services/helper';
import moment from "moment"

const Profile = () => {
    const [showspinner, setShowSpinner] = useState(true);
    const [userProfileData, setUserProfileData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const getSingleUser = async () => {
        const response = await singleUserDataApi(id);
        if(response.status == 200){
            setUserProfileData(response.data);
        }else{
            console.log('err');
        }
      
    }
  
    useEffect(() => {
        getSingleUser();
        setTimeout(() => {
            setShowSpinner(false)
        }, 1200);
    }, [id])

    return (
        <>
            {
                showspinner ?
                    <Spiner /> :
                    <Container>
                        <h2 className='text-center mt-3 mb-3'>User Details</h2>
                        <Card className="text-center">
                            <Card.Header className='profile_div text-center'>
                                <img src={`${BASE_URL}/upload/${userProfileData.profile}`} width={160} height={160} alt="profile" />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className='mb-3'>{userProfileData.firstName}&nbsp;{userProfileData.lastName}</Card.Title>
                                <Card.Text className='mb-2'>
                                    <MdOutlineMail size={20} />:-
                                    {userProfileData.email}
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    <MdMobileFriendly />:- {userProfileData.mobile}
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    <FaMale size={20} />:-
                                    {userProfileData.gender}
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    <GoLocation size={20} />:-
                                    {userProfileData.location}
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    status:- {userProfileData.status}
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    <GoCalendar size={19} />&nbsp;
                                    Date Created:- {moment(userProfileData.datecreated).format("DD-MM-YYYY")};
                                </Card.Text>
                                <Card.Text className='mb-2'>
                                    <GoCalendar size={19} />&nbsp;
                                    Date Updated:- {moment(userProfileData.dateupdated).format("DD-MM-YYYY hh:mm:ss")}
                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button variant="primary" className="float-end" type="submit" onClick={() => navigate('/')}>
                                    Go Back
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Container>
            }
        </>
    )
}

export default Profile