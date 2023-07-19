import React, { useState } from 'react';

function About() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    candy: '',
    description: '',
    price: ''
  });

  function handleChange(e) {
    setFormData({ ...formData,[e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setData([...data, formData]);
    setFormData({ candy: '', description: '', price: '' });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='enter candy'
          name='candy'
          value={formData.candy}
          onChange={handleChange}
        />
        <br />
        <input
          type='text'
          placeholder='enter description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <input
          type='number'
          placeholder='enter price'
          name='price'
          value={formData.price}
          onChange={handleChange}
        />
        <br />
        <button type='submit'>ADD CANDY</button>
      </form>
        <ul>
        {data.map((list, index) => (
          <div key={index}>
            <li>{list.candy}-{list.description}-{list.price}</li>
          </div>
        ))}
        </ul>
    </div>
  );
}

export default About;
