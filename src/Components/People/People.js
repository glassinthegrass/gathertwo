import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CreatePerson from "./CreatePerson";
import Person from "./Person";
let Container = styled.section`
  width: 100vw;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
let PeopleColumn = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`;
let PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  border: 1px dotted rgb(88, 88, 88, 0.5);

  @media (min-width: 780px) {
    width: 70vw;
  }
`;
let Directions = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

let Edit = styled.p`
  width: 98%;

  font-family: "Nunito";
  text-align: right;
  padding-right: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(88, 88, 88, 0.1);
  }
`;

const People = (props) => {
  const [toggle, setToggle] = useState(false);

  const push = useHistory().push;
  const [people, setPeople] = useState([]);
  const { user_id, isLoggedIn } = props.user;
  useEffect(() => {
    axios
      .get(`/api/people?user_id=${user_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  }, [user_id]);
  const handleToggle = () => {
    !toggle ? setToggle(!toggle) : setToggle(!toggle);
  };
  const handleDelete = (person_id, user_id) => {
    axios
      .delete(`/api/people?person_id=${person_id}&user_id=${user_id}`)
      .then((res) => setPeople(res.data))
      .catch((err) => console.log(err));
  };
  let mappedPeople = people ? (
    people.map((person, i) => {
      return (
        <Person
          toggle={toggle}
          handleDelete={handleDelete}
          user_id={user_id}
          person={person}
          key={i}
        />
      );
    })
  ) : (
    <></>
  );

  const handleAddPerson = (persons) => {
    setPeople(persons);
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      push("/");
    }
  }, [isLoggedIn, push]);
  return (
    <Container>
      <Directions></Directions>
      <PeopleContainer>
        <CreatePerson creator={user_id} setPeople={handleAddPerson} />
        <Edit onClick={handleToggle}>edit people</Edit>
        <PeopleColumn>{mappedPeople}</PeopleColumn>
      </PeopleContainer>
    </Container>
  );
};
const mapStateToProps = (reduxState) => {
  return reduxState.userReducer;
};
export default connect(mapStateToProps)(People);
