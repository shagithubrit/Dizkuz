import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CategoryCard from '../../Components/CategoryCard';
import './CategoryPage.css';
import Modal from 'react-bootstrap/Modal';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

function NewCategoryModal(props) {
  const [CategoryName, setCategoryName] = useState( '');

  const updateCategoryName = (e) => {
    setCategoryName( e.target.value);
  }


  const addCategory = async (e) =>{
    props.onHide();
    try {
        const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
        const curUser = JSON.parse(localStorage.getItem('currentUser'));
        const OrgID = dizkuzData.currentOrganisation;
        const inp = {
          name: currentUser_.name,
          email: currentUser_.email,
          password: currentUser_.password,
          organisations: currentUser_.organisations,
          User_id: currentUser_._id,
          NAME: CategoryName,
          ID: OrgID,
        };
        const response = await fetch("http://localhost:8080/newCategory", {
          method: "POST",
          body: JSON.stringify(inp),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data==null) {
          window.alert("category with given name already exists");
        }
        else
        {
          window.alert("successfully added the new category");
        }
        }catch (error) {
        console.log(error);
        window.alert( "Try again !");
      }

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Enter category name" value={CategoryName} onChange={updateCategoryName}/>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addCategory}>
            Create
          </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default function CategoryPage(props) {
  const navigate = useNavigate();

    // modal
  const [ show, setShow] = useState(false);
  const [ modalShow, setModalShow] = React.useState(false);
  const [ HtmlLoaded, setHtmlLoaded] = useState( false);
  const [ Categories, setCategories] = useState( [] );
  const [ orgName, setOrgName] = useState( 'Organization');
  const [ CategoryComponent, setCategoryComponent] = useState(<></>);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };
  const handleLeave = () => {
    setShow(false)
    // console.log( "organisation : ", prop.id);
  }

    

    const JumpToNewCategory = async (e) => {
      setModalShow( true);
    }

    const openMembers = () => {

    }
    
    useEffect( () => {
      let currentUser_ = {};
      currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
      if( currentUser_ == null){
        navigate( '/landing');
      }

      const doWork = async() => {
         try {
           const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
           const OrgID = dizkuzData.currentOrganisation;
           const inp = {
             NAME: CategoryName,
             ID: OrgID,
           };
           const response = await fetch("http://localhost:8080/categories", {
             method: "POST",
             body: JSON.stringify(inp),
             headers: {
               "Content-Type": "application/json",
             },
           });
           const data = await response.json();
           if (data == null) {
             window.alert("category with given name already exists");
           } else {
             window.alert("successfully added the new category");
           }
         } catch (error) {
           console.log(error);
           window.alert("Try again !");
         }


        //=================================================================================
        //=================================================================================
        // A POST request to find and store all categories with organisationID === OrgID in in Categories using setCategories()
        //=================================================================================
        //=================================================================================

        const tempCategoryComponent = Categories.map((category) =>{
          return(
            <div>
                <CategoryCard title={category.title} description={category.description} id={category.id} key={category.id}/>
            </div>
          );
        });

        setCategoryComponent( tempCategoryComponent);

        setHtmlLoaded( true);
      }

      doWork();
    }, []);

  return (
    HtmlLoaded ? 
    <>
    <NavBar />
    <div className='CategoryConainer' style={{paddingTop : '70px'}}>

        <h3 style={{textAlign: 'center'}}>{orgName}</h3>
        <hr/>
        <div className='OrganisationButton2'>
            <Button className='orgbtn_' variant="outline-primary" onClick={openMembers}>Members</Button>
            <Button className='orgbtn_' variant="primary" onClick={JumpToNewCategory}>New Category</Button>
        </div>
        {CategoryComponent}
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Once you leave this, you won't be able to access it ever again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLeave}>
            Leave
          </Button>
        </Modal.Footer>
    </Modal>
    <NewCategoryModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <Footer />
    </>
    :
    <>
      <NavBar />
      <div className='SpinnerContainer'>
        <Spinner animation="border" variant="dark" />
      </div>
      <Footer />
    </>
  )
}
