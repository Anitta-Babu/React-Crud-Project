import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      firstName
      lastName
      email
      course
    }
  }
`;

export const GET_STUDENT_BYID = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      firstName
      lastName
      age
      gender
      dateOfBirth
      email
      country
      course
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($input: StudentInput!) {
    createStudent(input: $input) {
      firstName
      lastName
      age
      gender
      dateOfBirth
      email
      country
      course
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $input: StudentInput!) {
    updateStudent(id: $id, input: $input) {
      firstName
      lastName
      age
      gender
      dateOfBirth
      email
      country
      course
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      firstName
      lastName
    }
  }
`;
