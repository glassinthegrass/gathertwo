import React from 'react';
import styled from 'styled-components';
let CommentContainer = styled.div`
width:22rem;
display:flex;
background-color:white;
border-radius:10px;
padding:1px;
margin-bottom:2px;
`
let Img = styled.img`
width:25px;
height:25px;
padding:3px;
`
let CommentText =styled.p`
font-size:14px;
font-family:'Nunito Light';
border-radius:10px;
padding:5px;
width:90%;
margin:3px;
padding-top:2px;
margin-top:0px;
text-align:left;
background-color:rgb(245,240,232);
`
let CommentUsername = styled(CommentText)`
font-size:8px;
width:30%;
padding-top:0px;
padding-bottom:0px;
margin-bottom:2px;
margin-top:2px;
`
let Column = styled.div`
display:flex;
flex-direction:column;
width:100%;

`
// comment_content: "sadf"
//first_name
//last_name
// username: "glassinthegrass"

const Comment =(props)=>{
    const {picture_version,picture_public_id,username,last_name,first_name,comment_content}=props.comment
    let userUrl = picture_public_id
    ? `https://res.cloudinary.com/glassinthegrass/image/upload/w_30,h_30,r_max,c_fill,g_face,f_png/${picture_version}/${picture_public_id}`
    : "";
    return<CommentContainer>
        <Img src={userUrl} alt=''/>
        <Column>
        <CommentUsername>{username}</CommentUsername>
        <CommentText>{comment_content}</CommentText>
        </Column>
    </CommentContainer>
}
export default Comment