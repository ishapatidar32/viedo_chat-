import "../App.css"
function LandingPage(){
    return (
        <div className='landingpage'>
            <nav>
                <h2>Apna Video Call</h2>
                <div className='navebarlist'>
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <button className='login-btn' type='button'>Login</button>
                </div>
            </nav>
            <div className='landingpagecontent'>
                <div className='content'>
                    <h1><span>Connect</span> with your<br />Loved Ones</h1>
                    <p>Cover a distance by apna video call</p>
                    <button type='button'>Get Started</button>
                </div>
                <div className='templet'>
                    <img src="/mobile.png" alt="mobile" />
                </div>
            </div>
        </div>
    );
}
export default LandingPage