import './style.scss';

type HeaderProps = {
  onShowConfigView: Function,
}

const Header = ({onShowConfigView}: HeaderProps) => {
  return (
    <header className='header mt-1'>
      <div className='container'>
        <div className='row d-flex'>
          <div className='col d-flex justify-content-between align-items-center'>
            <h1 className='d-none'>2048</h1>
            <img src='favicon.ico' alt='2048 logo'/>
            <div className='header-btn' onClick={() => onShowConfigView()}>
              <svg className='header-config-icon' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 16 16'>
                <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header