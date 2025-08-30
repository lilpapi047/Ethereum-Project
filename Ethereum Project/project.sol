// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriptoGive {
    enum Role { None, Auditor, Donante, Organizacion }
    enum ProjectType { Temporal, Perpetuo }

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
    }

    mapping(address => User) public users;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public OrganizationProjects;

    uint256 public projectCount;
    uint256 public activeProjectCount;

    // Evento para notificar la creación de un proyecto (opcional pero recomendado)
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);

    function registerUser(Role _role) public {
        require(users[msg.sender].wallet == address(0), "Ya registrado");
        users[msg.sender] = User(msg.sender, _role);
    }

    function getUserInfo() public view returns (address, Role) {
        require(users[msg.sender].role != Role.None, "No registrado");
        return (users[msg.sender].wallet, users[msg.sender].role);
    }

    // Función para crear un nuevo proyecto
    function createProject(
        string memory _name,
        string memory _description,
        string memory _beneficiary,
        string memory _image,
        ProjectType _projectType
    ) public {
        // Verificar que el caller es una organización
        require(users[msg.sender].role == Role.Organizacion, "Solo organizaciones pueden crear proyectos");

        // Incrementar el contador de proyectos
        projectCount++;
        
        // Crear el proyecto
        projects[projectCount] = Project({
            id: projectCount,
            name: _name,
            owner: msg.sender,
            description: _description,
            beneficiary: _beneficiary,
            isActive: true,
            image: _image,
            projectType: _projectType,
            fundsRaised: 0
        });

        // Añadir el proyecto a la lista de la organización
        OrganizationProjects[msg.sender].push(projectCount);

        // Incrementar el contador de proyectos activos
        activeProjectCount++;

        // Emitir evento
        emit ProjectCreated(projectCount, msg.sender, _name);
    }
}