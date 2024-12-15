import logo from './bebezians_logo.svg';

function Logo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36vh' }}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Logo;
