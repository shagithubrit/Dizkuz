import React from 'react';
import './HomePage.css';
import Footer from '../../Components/Footer';
import { useNavigate} from 'react-router-dom';

export default function HomePage( prop) {
  const navigate = useNavigate();
  const jumptoOrganisations = () => {
    navigate( '/organisations');
  }

  return (
    <>
      <div className='HomePageOuterContainer'>
          <div className='HomePageProfileContainer'>
            <h2>User name : {prop.name}</h2>
            <h5>email : {prop.email}</h5>
            <h5>Organisations : {prop.numOrg}</h5>
            <h5>Organisations : {prop.messages}</h5>
          </div>
          <hr/>
          <div className='HomePageButtons'>
            <div className='HBtn' onClick={jumptoOrganisations}>
              Go to your Organisations
            </div>
            <div className='HBtn'>
              Create a new Organisation
            </div>
          </div>
          <hr/>
          <div className='appInfo'>
            <p><b>Dizkuz</b> is a platform for a complete Organisation to work seamlessly on any project by
            having discussions
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nostrum quae rem modi, vitae magni harum quo molestiae error dolorem quia. Tempora nemo nihil sint aperiam exercitationem ipsa eos possimus blanditiis ullam necessitatibus beatae accusamus magni velit molestiae architecto repudiandae, vero aliquid inventore aspernatur optio quos est error quia dolor. Expedita dolor dignissimos voluptatibus commodi ullam nemo, at, fugit perspiciatis nulla labore doloribus sapiente assumenda voluptas deserunt quo adipisci voluptate minima provident. Qui harum quasi cupiditate quas! Consectetur aliquam fugiat repudiandae non enim voluptatum eligendi nulla voluptas. Maxime eos quis expedita accusantium eveniet a repudiandae ipsum nostrum libero recusandae? Consectetur obcaecati beatae dolor sapiente esse nam iste exercitationem velit illo odit, repudiandae vel cupiditate alias quas commodi enim! Mollitia debitis excepturi eaque quo natus provident ipsa deleniti aperiam labore suscipit, impedit fugiat magni expedita similique odit atque voluptatibus quas voluptatum. Vero tempora vitae, accusantium cupiditate accusamus voluptatem alias quisquam iusto, repudiandae, tempore quo dolor! Aut assumenda deserunt, dolores necessitatibus, 
            </p>
          </div>
          <hr/>
          <div className='abt'>
            <div className='HBtn small'>
              Learn more about us
            </div>
          </div>
      </div>
      <Footer />
    </>
  )
}
