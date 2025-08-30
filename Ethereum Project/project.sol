// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriptoGive {
    
    enum ProjectType { Temporal, Perpetuo }
    enum ProjectPhase { Inicial, Intermedia, Finalizada }

    struct Donant {
        address wallet;
        string name;
    }
    
    struct ONG {
        address wallet;
        string name;
        string description;
        uint16 RTN;
        string location;
        string email;
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

    
    mapping(address => bool) public isDonant;
    mapping(address => bool) public isONG;
    mapping(address => Donant) public donants;
    mapping(address => ONG) public ongs;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public organizationProjects;

    
    uint256 public projectCount;
    uint256 public activeProjectCount;
    uint256 public constant REQUIRED_APPROVALS = 3;

    
    event DonantRegistered(address indexed wallet, string name);
    event ONGRegistered(address indexed wallet, string name);
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);
    event PhaseChangeRequested(uint256 indexed projectId, ProjectPhase newPhase);
    event PhaseChanged(uint256 indexed projectId, ProjectPhase newPhase);
    event ApprovalAdded(uint256 indexed projectId, address indexed approver, uint256 approvalCount);

    
    modifier onlyDonant() {
        require(isDonant[msg.sender], "Solo donantes pueden realizar esta accion");
        _;
    }


    modifier onlyONG() {
        require(isONG[msg.sender], "Solo ONGs pueden realizar esta accion");
        _;
    }

    
    function registerDonant(string memory _name) public {
        require(!isDonant[msg.sender] && !isONG[msg.sender], "Usuario ya registrado");
        
        isDonant[msg.sender] = true;
        donants[msg.sender] = Donant(msg.sender, _name);
        
        emit DonantRegistered(msg.sender, _name);
    }

    function registerONG(
        string memory _name,
        string memory _description,
        uint16 _RTN,
        string memory _location,
        string memory _email
    ) public {
        require(!isDonant[msg.sender] && !isONG[msg.sender], "Usuario ya registrado");
        
        isONG[msg.sender] = true;
        ongs[msg.sender] = ONG(msg.sender, _name, _description, _RTN, _location, _email);
        
        emit ONGRegistered(msg.sender, _name);
    }

    
    function getUserInfo(address _user) public view returns (string memory userType, string memory name) {
        if (isDonant[_user]) {
            return ("Donante", donants[_user].name);
        } else if (isONG[_user]) {
            return ("ONG", ongs[_user].name);
        } else {
            return ("No registrado", "");
        }
    }

    
    function createProject(
        string memory _name,
        string memory _description,
        string memory _beneficiary,
        string memory _image,
        ProjectType _projectType
    ) public onlyONG {
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

    
    function approvePhaseChange(uint256 _projectId) public onlyDonant {
        Project storage project = projects[_projectId];
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
}