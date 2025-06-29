/*import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

const ProjectManagerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  
  // Fetch data on mount
  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchEmployees();
  }, []);
  
  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container>
      <ToastContainer />
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={() => setActiveTab('projects')}>Projects</Button>
          <Button variant="secondary" onClick={() => setActiveTab('tasks')}>Tasks</Button>
          <Button variant="secondary" onClick={() => setActiveTab('employees')}>Employees</Button>
        </Col>
        <Col className="text-end">
          {activeTab === 'projects' && <Button onClick={() => openModal('project')}>New Project</Button>}
          {activeTab === 'tasks' && <Button onClick={() => openModal('task')}>New Task</Button>}
        </Col>
      </Row>
      
      {activeTab === 'projects' && <ProjectsTable projects={projects} />}
      {activeTab === 'tasks' && <TasksTable tasks={tasks} />}
      {activeTab === 'employees' && <EmployeesTable employees={employees} />}
      
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'project' ? 'New Project' : 'New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form content for adding a project or task goes here */}
         /* <p>Add form content here</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" onClick={closeModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const ProjectsTable = ({ projects }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Status</th>
        <th>Completion Rate</th>
        <th>Tasks</th>
      </tr>
    </thead>
    <tbody>
      {projects.map(project => (
        <tr key={project.id}>
          <td>{project.name}</td>
          <td>{project.description}</td>
          <td>{project.status}</td>
          <td>{project.completionRate}%</td>
          <td>{project.tasks}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const TasksTable = ({ tasks }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Title</th>
        <th>Assigned To</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Estimated Hours</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task.id}>
          <td>{task.title}</td>
          <td>{task.assignedTo}</td>
          <td>{task.status}</td>
          <td>{task.priority}</td>
          <td>{task.estimatedHours}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const EmployeesTable = ({ employees }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Email</th>
        <th>Active Tasks</th>
        <th>Completed Tasks</th>
      </tr>
    </thead>
    <tbody>
      {employees.map(employee => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.title}</td>
          <td>{employee.email}</td>
          <td>{employee.activeTasks}</td>
          <td>{employee.completedTasks}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ProjectManagerDashboard;*/

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Users, 
  Clock,
  Calendar,
  Briefcase,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ClipboardList
} from 'lucide-react';

// Mock data
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Build a new e-commerce platform",
    status: "in-progress",
    completionRate: 65,
    tasks: 12,
    startDate: "2024-03-01",
    endDate: "2024-06-30"
  },
  // Add more mock projects...
];

const mockTasks = [
  {
    id: 1,
    title: "Database Design",
    projectId: 1,
    assignedTo: "John Doe",
    status: "completed",
    priority: "high",
    estimatedHours: 20,
    actualHours: 18,
    startDate: "2024-03-01",
    completedDate: "2024-03-15"
  },
  // Add more mock tasks...
];

const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    title: "System Analyst",
    email: "john@example.com",
    activeTasks: 3,
    completedTasks: 15
  },
  // Add more mock employees...
];

const ProjectManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
            </TabsList>
            
            {activeTab === 'projects' && (
              <CreateProjectDialog />
            )}
            {activeTab === 'tasks' && (
              <CreateTaskDialog />
            )}
          </div>

          <TabsContent value="projects">
            <ProjectsView projects={mockProjects} />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksView 
              tasks={mockTasks} 
              statusFilter={taskStatusFilter}
              onStatusFilterChange={setTaskStatusFilter}
            />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeesView 
              employees={mockEmployees}
              searchTerm={employeeSearch}
              onSearchChange={setEmployeeSearch}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Projects View Component
const ProjectsView = ({ projects }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={<Briefcase />}
        label="Active Projects"
        value={projects.filter(p => p.status === 'in-progress').length}
      />
      <StatCard
        icon={<CheckCircle />}
        label="Completed Projects"
        value={projects.filter(p => p.status === 'completed').length}
      />
      <StatCard
        icon={<ClipboardList />}
        label="Total Tasks"
        value={projects.reduce((acc, p) => acc + p.tasks, 0)}
      />
    </div>

    <div className="space-y-4">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  </div>
);

// Tasks View Component
const TasksView = ({ tasks, statusFilter, onStatusFilterChange }) => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-4">
      {tasks
        .filter(task => statusFilter === 'all' || task.status === statusFilter)
        .map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
    </div>
  </div>
);

// Employees View Component
const EmployeesView = ({ employees, searchTerm, onSearchChange }) => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees
        .filter(emp => 
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
    </div>
  </div>
);

// Card Components
const ProjectCard = ({ project }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{project.startDate} - {project.endDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{project.tasks} tasks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{project.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2" 
            //style={{ width: ${project.completionRate}% }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TaskCard = ({ task }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="outline">{task.priority}</Badge>
            <Badge 
              className={
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }
            >
              {task.status}
            </Badge>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{task.assignedTo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Est: {task.estimatedHours}h | Actual: {task.actualHours}h
              </span>
            </div>
          </div>
        </div>

        <Select defaultValue={task.status}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

const EmployeeCard = ({ employee }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{employee.email}</p>
          
          <div className="flex items-center space-x-4 mt-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Active Tasks:</span>
              <span className="ml-1 font-medium">{employee.activeTasks}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Completed:</span>
              <span className="ml-1 font-medium">{employee.completedTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ icon, label, value }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/5 p-3 rounded-full">
          {React.cloneElement(icon, { className: "h-5 w-5 text-primary" })}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Dialog Components for Create/Edit operations
const CreateProjectDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        New Project
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
      </DialogHeader>
      {/* Add project form here */}
    </DialogContent>
  </Dialog>
);

const CreateTaskDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        New Task
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
      </DialogHeader>
      {/* Add task form here */}
    </DialogContent>
  </Dialog>
);

export default ProjectManagerDashboard;