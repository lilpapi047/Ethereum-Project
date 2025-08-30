// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriptoGive {
    enum Role { None, Auditor, Donante, Organizacion }
    enum ProjectType { Temporal, Perpetuo }
    enum ProjectPhase { Inicial, Intermedia, Finalizada }

    struct User {
        address wallet;
        Role role;
    }

    struct Project {
        uint256 id;
        string name;
        address owner;
        string description;
        string beneficiary;
        bool isActive;
        string image;
        ProjectType projectType;
        uint256 fundsRaised;
        ProjectPhase phase;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public organizationProjects;

    uint256 public projectCount;
    uint256 public activeProjectCount;
    uint256 public constant REQUIRED_APPROVALS = 3;

    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);
    event PhaseChangeRequested(uint256 indexed projectId, ProjectPhase newPhase);
    event PhaseChanged(uint256 indexed projectId, ProjectPhase newPhase);
    event ApprovalAdded(uint256 indexed projectId, address indexed approver, uint256 approvalCount);
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed projectId, address indexed owner, uint256 amount);


    function registerUser(Role _role) public {
        require(users[msg.sender].wallet == address(0), "Ya registrado");
        users[msg.sender] = User(msg.sender, _role);
    }

    function getUserInfo() public view returns (address, Role) {
        require(users[msg.sender].role != Role.None, "No registrado");
        return (users[msg.sender].wallet, users[msg.sender].role);
    }

    function createProject(
        string memory _name,
        string memory _description,
        string memory _beneficiary,
        string memory _image,
        ProjectType _projectType
    ) public {
        require(users[msg.sender].role == Role.Organizacion, "Solo organizaciones pueden crear proyectos");

        projectCount++;
        
        Project storage newProject = projects[projectCount];
        newProject.id = projectCount;
        newProject.name = _name;
        newProject.owner = msg.sender;
        newProject.description = _description;
        newProject.beneficiary = _beneficiary;
        newProject.isActive = true;
        newProject.image = _image;
        newProject.projectType = _projectType;
        newProject.fundsRaised = 0;
        newProject.phase = ProjectPhase.Inicial;
        newProject.approvalCount = 0;

        organizationProjects[msg.sender].push(projectCount);
        activeProjectCount++;

        emit ProjectCreated(projectCount, msg.sender, _name);
    }

    function requestPhaseChange(uint256 _projectId, ProjectPhase _newPhase) public {
        Project storage project = projects[_projectId];
        require(project.owner == msg.sender, "Solo el owner puede cambiar fase");
        require(_newPhase > project.phase, "Nueva fase debe ser posterior");
        require(_newPhase <= ProjectPhase.Finalizada, "Fase no valida");

        project.approvalCount = 0;
        
        emit PhaseChangeRequested(_projectId, _newPhase);
    }

    function approvePhaseChange(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        require(users[msg.sender].role == Role.Donante, "Solo donantes pueden aprobar");
        require(!project.approvals[msg.sender], "Ya aprobaste este cambio");

        project.approvals[msg.sender] = true;
        project.approvalCount++;

        emit ApprovalAdded(_projectId, msg.sender, project.approvalCount);

        if (project.approvalCount >= REQUIRED_APPROVALS) {
            project.phase = ProjectPhase(uint(project.phase) + 1);
            emit PhaseChanged(_projectId, project.phase);
        }
    }

    function getProjectPhase(uint256 _projectId) public view returns (ProjectPhase) {
        return projects[_projectId].phase;
    }


    function hasApprovedPhaseChange(uint256 _projectId, address _user) public view returns (bool) {
        return projects[_projectId].approvals[_user];
    }

    function donate(uint256 _projectId) public payable {
    Project storage project = projects[_projectId];
    require(users[msg.sender].role == Role.Donante, "Solo donantes pueden donar");
    require(project.isActive, "Proyecto no activo");
    require(msg.value > 0, "Debes donar mas de 0");

    project.fundsRaised += msg.value;

    emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _projectId) public {
    Project storage project = projects[_projectId];
    require(msg.sender == project.owner, "Solo el owner puede retirar fondos");
    require(project.phase == ProjectPhase.Finalizada, "El proyecto debe estar en fase finalizada");
    require(project.approvalCount >= REQUIRED_APPROVALS, "No hay suficientes aprobaciones");
    require(project.fundsRaised > 0, "No hay fondos para retirar");

    uint256 amount = project.fundsRaised;
    project.fundsRaised = 0;

    payable(project.owner).transfer(amount);

    emit FundsWithdrawn(_projectId, project.owner, amount);
    }

}