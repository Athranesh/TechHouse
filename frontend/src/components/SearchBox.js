import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

import useResize from '../hooks/useResize';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const { width } = useResize();

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      inline
      style={{
        marginTop: width < 992 ? '20px' : 0,
        marginBottom: width < 992 ? '20px' : 0,
      }}
    >
      <Form.Control
        type="text"
        style={{ width: '70%' }}
        htmlSize={width > 975 ? 40 : null}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-1 mr-md-0"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 mx-2 mr-md-2"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
