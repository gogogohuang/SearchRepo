import React, { useRef } from 'react';

const useHandler = (handler) => useRef(handler).current;
const SearchBtn = () => {

  const test = useRef(null);
  const handleClick = useHandler(e=>{
    e.preventDefault();

    test.current.style.height = '500px';
    test.current.style.display ='block';
  })

  return (<div>
    <div ref={test} style={{display: 'none'}}>你看屁啊</div>
  <button onClick={handleClick}>按我</button>
  </div>)
}


export default SearchBtn;