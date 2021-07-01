import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push('/');
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push('/');
    },
  });
  return (
    <div>
      <h4 className='mv3'>{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className='flex flex-column'>
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(event) =>
              setFormState({
                ...formState,
                name: event.target.value,
              })
            }
            type='text'
            placeholder='Your name'
          />
        )}
        <input
          value={formState.email}
          onChange={(event) =>
            setFormState({
              ...formState,
              email: event.target.value,
            })
          }
          type='text'
          placeholder='Your email address'
        />
        <input
          value={formState.password}
          onChange={(event) =>
            setFormState({
              ...formState,
              password: event.target.value,
            })
          }
          type='password'
          placeholder='Choose a safe password'
        />
      </div>
      <div className='flex mt3'>
        <button
          className='pointer mr2 button'
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className='pointer button'
          onClick={(event) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
