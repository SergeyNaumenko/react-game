import React from 'react';

const Footer: React.FunctionComponent = () => {
  const createdYear = 2021;
  const currentYear = new Date().getFullYear();
  const years = (createdYear !== currentYear) ? 
    `© ${createdYear} - ${currentYear}` : `© ${createdYear}`;
  
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row d-flex align-content-center'>
          <div className='col d-flex align-items-center justify-content-center'>
            <span>{years}</span>
          </div>
          <div className='col d-flex align-items-center justify-content-center'>
            <a className='w-25' href='https://rs.school/js/' target='_blank' rel='noreferrer'>
              <img className=''
                src='https://rs.school/images/rs_school_js.svg'
                alt='RS School logo'/>
            </a>
          </div>
          <div className='col flex-column d-flex align-items-center justify-content-center'>
            <span>developed by </span>
            <a href='https://github.com/SergeyNaumenko'>Sergey Naumenko</a>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
