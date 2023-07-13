import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from '../UserSidebarPages/Chat'
import '../UserSidebarPages/LiveChat.css'
import { Input } from 'antd';
import axios from 'axios';

const socket = io.connect('http://localhost:4000');

const LiveChat = () => {
    const userFname = localStorage.getItem('userfname');
    const userid = localStorage.getItem('userid');

    const [username, setUsername] = useState(userFname);
    const [room, setRoom] = useState(userid);
    const [showChat, setShowChat] = useState(false);
    const [type, setType] = useState('USER')

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room, type);
            setShowChat(true);
        }
    }

    useEffect(() => {
        exitChatUser();
    }, [])

    const exitChatUser = () => {
        let token = localStorage.getItem('token')
        let data = {
            userid: localStorage.getItem('userid')
        }

        let config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }

        axios.post('/user/users/fetch-chat-details-user', data, config)
            .then((result) => {
                const length = result.data.userChatDetails.length;
                if (length > 0) {
                    joinRoom()
                    setShowChat(true)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <>
            <div className="text-center">
                {!showChat ? (
                    <div className='joinChatContainer'>
                <h3 >Join a Chat</h3>
                <Input
                    type="text"
                    value={username}
                    placeholder='Join......'
                    onChange={(event) => { setUsername(event.target.value) }
                    }
                    disabled={true}
                     />
                <Input
                    type="text"
                    value={room}
                    placeholder='Room Id...'
                    onChange={(event) => { setRoom(event.target.value) }
                    }
                    disabled={true} />

                    <button className='btn btn-primary' onClick={joinRoom} style={{fontFamily:'Calibri'}} >Join Chat</button>
                </div>

            )
            : (
            <Chat socket={socket} username={username} room={room} />
                )}
        </div >

        </>
    )
}

export default LiveChat