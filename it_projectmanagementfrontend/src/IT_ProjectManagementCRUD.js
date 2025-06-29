import React,{useState,useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const IT_ProjectManagementCRUD = () =>
{
   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [JobTitle, setJobTitle] = useState('')

  const [editId, setEditId] = useState('')
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editJobTitle, setEditJobTitle] = useState('')

    const EmployeeData = [
        {
           id: 1,
           Name: 'Vincent',
           Surname: 'Mamboyi',
           Email: 'Mamboyi@gmail.com',
           JobTitle: 'Web Developer'
        },
        {
            id: 2,
            Name: 'Glen',
            Surname: 'Mlelinoh ',
            Email: 'Chef@gmail.com',
            JobTitle: 'Data Analyst'
         },
         {
            id: 7,
            Name: 'Svigy',
            Surname: 'Van Dijk',
            Email: 'SvigyThirdLeg@gmail.com',
            JobTitle: 'Network Engineer'
         }
    ]
   const [data,setData] =useState([]);
   useEffect(() =>
   {
      getEmployeeData();
   },[]
   )
   const getEmployeeData = () =>
   {
      axios.get('http://localhost:5154/api/Employees/GetEmployees')
      .then((result)=>
      {
         setData(result.data)
      })
      .catch((error)=>
      {
         console.log(error)
      })
   }

   const handleSave = () =>
   {
         const url = 'http://localhost:5154/api/Employees/AddEmployees'
         const data = 
         {

            "name": firstName,
            "surname": lastName,
            "email": email,
            "jobTitle": JobTitle
         }
         axios.post(url, data) 
         .then((result) => {
            getEmployeeData()
            clear();
            toast.success('Employee Successfully Added!');
         }).catch((error)=>
            {
               toast.error(error);
            })
   }
   const clear =() =>{
      setFirstName('');
      setLastName('');
      setEmail('');
      setJobTitle('');

      setEditId('');
      setEditFirstName('');
      setEditLastName('');
      setEditEmail('');
      setEditJobTitle('');
   }
   const handleEdit = (id) =>
   {
      handleShow();
      axios.get('http://localhost:5154/api/Employees/GetEmployee/' + id)
      .then((result)=>
         {
            setEditFirstName(result.data.firstName);
            setEditLastName(result.data.lastName);
            setEditEmail(result.data.email);
            setEditJobTitle(result.data.jobTitle);
            setEditId(id);

         })
         .catch((error)=>
         {
            console.log(error)
         })
   }
   const handleUpdate = ()=>
   {
      const url = 'http://localhost:5154/api/Employees/UpdateEmployees'+ editId;
      const data = 
       {
            "id": editId,
            "name": editFirstName,
            "surname": editLastName,
            "email": editEmail,
            "jobTitle": editJobTitle
       }
       axios.put(url, data)
       .then((result) => {
         getEmployeeData()
         clear();
         toast.success('Employee Successfully Updated!');
      }).catch((error)=>
         {
            toast.error(error);
         })
      
   }
   const handleDelete = (id) =>
      {
         if(window.confirm("Are you sure you want to delete this employee?") === true)
         {
            axios.delete('http://localhost:5154/api/Employees/DeleteEmployees/' + id)
            .then((result) => {
               if(result.status === 200)
               {
                  toast.success('Employee successfully deleted!');
                  getEmployeeData();
               }
            })
            .catch((error)=> {
               toast.error(error);
            })
         } 
         
      }
   return(
    <Fragment> 
       <ToastContainer/>
      <br></br>
      <div>
         <h1>WELCOME ADMIN</h1>
         
         </div>
         <h3>Add employee: </h3>
         
      <Container>
      
      <Row>
        <Col>
        <input type = "text" className="form-control" placeholder="Enter First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
        </Col>
        <Col><input type = "text" className="form-control" placeholder="Enter Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
        </Col>
        <Col><input type = "text" className="form-control" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </Col>
        <Col><input type = "text" className="form-control" placeholder="Enter Job title"value={JobTitle} onChange={(e)=> setJobTitle(e.target.value)}/>
        </Col>
        <Col><button className="btn btn-primary" onClick={()=> handleSave()}>Submit</button></Col>
      </Row>
    </Container>
    <br></br>
    <h3>Employee Data: </h3>

      <Table striped bordered hover>
      <thead>
        <tr>
        <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>JobTitle</th>
          <th>Actions</th>
        </tr>
      </thead>
      
      <tbody>
      {
         data && data.length > 0?
         data.map((items,index) => 
         {
            return (
               <tr key={index}>
               <td>{index+1}</td>
               <td>{items.name}</td>
               <td>{items.surname}</td>
               <td>{items.email}</td>
               <td>{items.jobTitle}</td>
               <td colSpan={2}>
                  <button className="btn btn-primary" onClick={() => handleEdit(items.id)}>Edit</button> &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(items.id)}>Delete</button>
               </td>


             </tr>
            )
         })
         :
         'Loading...'
      }
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
        <input type = "text" className="form-control" placeholder="Enter First Name" value={editFirstName} onChange={(e)=> setEditFirstName(e.target.value)}/>
        </Col>
        <br></br>
        <br></br>
        <Col><input type = "text" className="form-control" placeholder="Enter Last Name" value={editLastName} onChange={(e)=> setEditLastName(e.target.value)}/>
        </Col>
        <br></br>
        <br></br>
        <Col><input type = "text" className="form-control" placeholder="Enter Email" value={editEmail} onChange={(e)=> setEditEmail(e.target.value)}/>
        </Col>
        <br></br>
        <br></br>
        <Col><input type = "text" className="form-control" placeholder="Enter Job title"value={editJobTitle} onChange={(e)=> setEditJobTitle(e.target.value)}/>
        </Col>
        <br></br>
        <br></br>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
   )
}
export default IT_ProjectManagementCRUD;

/*import React, { useState, useEffect, Fragment } from "react";
import { Search, Briefcase, CheckSquare, Users, Clock, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Enhanced mock data for the existing dashboard
const mockProjects = [
  // ... your existing project mock data
];
const mockTasks = [
  // ... your existing task mock data
];
const mockEmployees = [
  // ... your existing employee mock data
];

const ProjectManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');

  const TabButton = ({ label, value, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === value ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Project Manager Dashboard</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <TabButton label="Projects" value="projects" icon={Briefcase} />
            <TabButton label="Tasks" value="tasks" icon={CheckSquare} />
            <TabButton label="Employees" value="employees" icon={Users} />
            <TabButton label="CRUD Operations" value="crud" icon={Users} />
          </div>

          {activeTab === 'projects' && <ProjectsView projects={mockProjects} />}
          {activeTab === 'tasks' && (
            <TasksView
              tasks={mockTasks}
              statusFilter={taskStatusFilter}
              onStatusFilterChange={setTaskStatusFilter}
            />
          )}
          {activeTab === 'employees' && (
            <EmployeesView
              employees={mockEmployees}
              searchTerm={employeeSearch}
              onSearchChange={setEmployeeSearch}
            />
          )}
          {activeTab === 'crud' && <IT_ProjectManagementCRUD />}
        </div>
      </div>
    </div>
  );
};

const ProjectsView = ({ projects }) => (
  // ... your existing ProjectsView component
);

const TasksView = ({ tasks, statusFilter, onStatusFilterChange }) => (
  // ... your existing TasksView component
);

const EmployeesView = ({ employees, searchTerm, onSearchChange }) => (
  // ... your existing EmployeesView component
);

const IT_ProjectManagementCRUD = () => {
  // Your CRUD component code from IT_ProjectManagementCRUD
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [JobTitle, setJobTitle] = useState('');

  const [editId, setEditId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editJobTitle, setEditJobTitle] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = () => {
    axios.get('http://localhost:5154/api/Employees/GetEmployees')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = 'http://localhost:5154/api/Employees/AddEmployees';
    const data = {
      name: firstName,
      surname: lastName,
      email: email,
      jobTitle: JobTitle
    };
    axios.post(url, data)
      .then(() => {
        getEmployeeData();
        clear();
        toast.success('Employee Successfully Added!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setJobTitle('');
    setEditId('');
    setEditFirstName('');
    setEditLastName('');
    setEditEmail('');
    setEditJobTitle('');
  };

  const handleEdit = (id) => {
    handleShow();
    axios.get('http://localhost:5154/api/Employees/GetEmployee/' + id)
      .then((result) => {
        setEditFirstName(result.data.firstName);
        setEditLastName(result.data.lastName);
        setEditEmail(result.data.email);
        setEditJobTitle(result.data.jobTitle);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const url = 'http://localhost:5154/api/Employees/UpdateEmployees' + editId;
    const data = {
      id: editId,
      name: editFirstName,
      surname: editLastName,
      email: editEmail,
      jobTitle: editJobTitle
    };
    axios.put(url, data)
      .then(() => {
        getEmployeeData();
        clear();
        toast.success('Employee Successfully Updated!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete('http://localhost:5154/api/Employees/DeleteEmployees/' + id)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Employee successfully deleted!');
            getEmployeeData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <br />
      <Container>
        <Row>
          <Col>
            <input type="text" className="form-control" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Col>
          <Col>
            <input type="text" className="form-control" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Col>
          <Col>
            <input type="text" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Col>
          <Col>
            <input type="text" className="form-control" placeholder="Enter Job Title" value={JobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={handleSave}>Submit</button>
          </Col>
        </Row>
      </Container>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        [23:18, 31/10/2024] Glenh0305-Maselaelo: <tbody>
    {data && data.length > 0 ? (
      data.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.surname}</td>
          <td>{item.email}</td>
          <td>{item.jobTitle}</td>
          <td colSpan={2}>
            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
      ))
    ) : (
      'Loading...'
    )}
  </tbody>
</Table>
<Modal show={show} onHide={handleClose} animation={false}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Employee details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row>
      <Col>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          value={editFirstName}
          onChange={(e) => setEditFirstName(e.target.value)}
        />
      </Col>
      <br /><br />
      <Col>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
          value={editLastName}
          onChange={(e) => setEditLastName(e.target.value)}
        />
      </Col>
      <br /><br />
      <Col>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
      </Col>
      <br /><br />
      <Col>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Job Title"
          value={editJobTitle}
          onChange={(e) => setEditJobTitle(e.target.value)}
        />
      </Col>
      <br /><br />
    </Row>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleUpdate}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
[23:20, 31/10/2024] Glenh0305-Maselaelo: </Fragment>
  );
};

export default IT_ProjectManagementCRUD;*/