import { MouseEvent, useContext, useState, useEffect } from 'react';
import { TaskContext } from '../Context/TaskContext';
import ReactIcon from '../assets/react.svg';

function Header() {
  // ------- INICIALIZACION DE HOOKS ------- //
  const { Theme, GoogleUser } = useContext(TaskContext);
  const [imgProfile, setImgProfile] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
  );

  useEffect(() => {
    if (GoogleUser.get !== undefined)
      handleProfileImage(GoogleUser.get?.picture as string);
  }, [GoogleUser.get]);

  // ------- HANDLE EVENTS ------- //
  const handleProfileImage = async (src: string) => {
    GoogleUser.get === undefined
      ? setImgProfile(
          'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
        )
      : setImgProfile(src);
  }; //*/

  const handleSignOut = (_evento: MouseEvent) => {
    if (confirm('Desea Cerrar la sesión actual de Google?')) {
      GoogleUser.set(undefined);
      (document.getElementById('GoogleIdentityBTN') as HTMLElement).hidden =
        false;
    }
  };
  // ------- RETURN COMPONENT ------- //
  return (
    <header>
      <h1>Bienvenido</h1>
      <img
        title={`React Logo - ${Theme.get}`}
        src={ReactIcon}
        className={Theme.get}
        alt=''
        onClick={() =>
          Theme.get == 'LightMode'
            ? Theme.set('DarkMode')
            : Theme.set('LightMode')
        }
      />
      <div id='GoogleIdentityBTN' />
      {GoogleUser.get !== undefined && (
        <button onClick={handleSignOut} id='GoogleIdentitySignOut'>
          <div className='GUserIMG'>
            <img src={imgProfile} />
          </div>
          <div className='GUserDesc'>
            <span>
              Logged in as <b>{GoogleUser.get.given_name}</b>
            </span>
            <span> Click here to Sign Out</span>
          </div>
          <div className='GLogo'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />
          </div>
        </button>
      )}
    </header>
  );
}

export default Header;
