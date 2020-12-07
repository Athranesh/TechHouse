import React, { useState, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const [size, setSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 975) {
        setSize(50);
      } else {
        setSize(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        style={{ width: '70%' }}
        htmlSize={size && size}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-1 mr-md-0 my-sm-4 my-md-0"
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
