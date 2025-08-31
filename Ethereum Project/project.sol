// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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
        uint256 goal;
        bool isActive;
        string image;
        ProjectType projectType;
        uint256 fundsRaised;
        uint256 fundsWithdrawn;
        ProjectPhase phase;

        mapping(uint8 => uint256) approvalsCount;
        mapping(uint8 => mapping(address => bool)) approvedByPhase;
        mapping(uint8 => string) evidenceURI;

    }

    // Usuarios / Proyectos
    mapping(address => bool) public isDonant;
    mapping(address => bool) public isONG;
    mapping(address => Donant) public donants;
    mapping(address => ONG) public ongs;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) public organizationProjects;

    // Saldos y aportes
    mapping(uint256 => uint256) public projectBalance;
    // NUEVO: cuánto donó cada address a cada proyecto
    mapping(uint256 => mapping(address => uint256)) public contributions;

    // Contadores y parámetros
    uint256 public projectCount;
    uint256 public activeProjectCount;
    uint256 public constant REQUIRED_APPROVALS = 3;

    // Desbloqueo por fase en basis points (bp): 10000 = 100%
    // Inicial 33%, Intermedia 33%, Final 34% (puedes ajustarlo)
    uint16 public constant PHASE_INITIAL_BPS   = 3300;
    uint16 public constant PHASE_MIDDLE_BPS    = 3300;
    uint16 public constant PHASE_FINAL_BPS     = 3400;

    // Eventos
    event DonantRegistered(address indexed wallet, string name);
    event ONGRegistered(address indexed wallet, string name);
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name);
    event EvidenceSubmitted(uint256 indexed projectId, ProjectPhase phase, string uri);
    event ApprovalAdded(uint256 indexed projectId, address indexed approver, ProjectPhase phase, uint256 approvalCount);
    event PhaseAdvanced(uint256 indexed projectId, ProjectPhase newPhase);
    event DonationMade(uint256 indexed projectId, address indexed donor, uint256 amount);
    event FundsWithdrawn(uint256 indexed projectId, address indexed owner, uint256 amount);

    modifier onlyDonant() {
        require(isDonant[msg.sender], "Solo donantes");
        _;
    }
    modifier onlyONG() {
        require(isONG[msg.sender], "Solo ONGs");
        _;
    }
    modifier onlyProjectOwner(uint256 _projectId) {
        require(projects[_projectId].owner == msg.sender, "No eres el owner");
        _;
    }

    // ---------- Registro ----------
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
        require(!isDonant[msg.sender] && !isONG[msg.sender], "ONG ya registrada");
        isONG[msg.sender] = true;
        ongs[msg.sender] = ONG(msg.sender, _name, _description, _RTN, _location, _email);
        emit ONGRegistered(msg.sender, _name);
    }

    function getUserInfo(address _user) public view returns (string memory userType, string memory name) {
        if (isDonant[_user]) return ("Donante", donants[_user].name);
        if (isONG[_user]) return ("ONG", ongs[_user].name);
        return ("No registrado", "");
    }

    // ---------- Proyectos ----------
    function createProject(
        string memory _name,
        string memory _description,
        string memory _beneficiary,
        string memory _image,
        ProjectType _projectType,
        uint256 _goal
    ) public onlyONG {
        require(_goal > 0, "Meta > 0");
        projectCount++;

        Project storage p = projects[projectCount];
        p.id = projectCount;
        p.name = _name;
        p.owner = msg.sender;
        p.description = _description;
        p.beneficiary = _beneficiary;
        p.isActive = true;
        p.image = _image;
        p.projectType = _projectType;
        p.fundsRaised = 0;
        p.fundsWithdrawn = 0;
        p.goal = _goal;
        p.phase = ProjectPhase.Inicial;

        organizationProjects[msg.sender].push(projectCount);
        activeProjectCount++;

        emit ProjectCreated(projectCount, msg.sender, _name);
    }

    // ---------- Donaciones ----------
    function deposit(uint256 _projectId) public payable {
        require(msg.value > 0, "Monto > 0");
        Project storage p = projects[_projectId];
        require(p.isActive, "Proyecto inactivo");

        // No exceder meta
        require(p.fundsRaised + msg.value <= p.goal, "Excede la meta");

        p.fundsRaised += msg.value;
        projectBalance[_projectId] += msg.value;
        contributions[_projectId][msg.sender] += msg.value;

        emit DonationMade(_projectId, msg.sender, msg.value);

        // (Opcional) desactivar donaciones cuando alcance la meta
        if (p.fundsRaised == p.goal) {
            p.isActive = false;
        }
    }


    function submitEvidence(uint256 _projectId, string calldata _uri)
        external
        onlyProjectOwner(_projectId)
    {
        Project storage p = projects[_projectId];
        p.evidenceURI[uint8(p.phase)] = _uri;
        p.approvalsCount[uint8(p.phase)] = 0;
        emit EvidenceSubmitted(_projectId, p.phase, _uri);
    }


    function approveCurrentPhase(uint256 _projectId) external onlyDonant {
        Project storage p = projects[_projectId];
        uint8 phase = uint8(p.phase);

        require(bytes(p.evidenceURI[phase]).length != 0, "Sin evidencia");
        require(contributions[_projectId][msg.sender] > 0, "No donaste a este proyecto");
        require(!p.approvedByPhase[phase][msg.sender], "Ya aprobaste");

        p.approvedByPhase[phase][msg.sender] = true;
        p.approvalsCount[phase]++;

        emit ApprovalAdded(_projectId, msg.sender, p.phase, p.approvalsCount[phase]);

        if (p.approvalsCount[phase] >= REQUIRED_APPROVALS) {
            if (p.phase == ProjectPhase.Inicial) {
                p.phase = ProjectPhase.Intermedia;
            } else if (p.phase == ProjectPhase.Intermedia) {
                p.phase = ProjectPhase.Finalizada;
            }
            emit PhaseAdvanced(_projectId, p.phase);
        }
    }

    function _cumulativeUnlockBps(ProjectPhase phase) internal pure returns (uint256) {
        if (phase == ProjectPhase.Inicial) {
            return PHASE_INITIAL_BPS;
        } else if (phase == ProjectPhase.Intermedia) {
            return PHASE_INITIAL_BPS + PHASE_MIDDLE_BPS; 
        } else {
            return PHASE_INITIAL_BPS + PHASE_MIDDLE_BPS + PHASE_FINAL_BPS; 
        }
    }

    function unlockedAmount(uint256 _projectId) public view returns (uint256) {
        Project storage p = projects[_projectId];
        uint256 bps = _cumulativeUnlockBps(p.phase);
        // Desbloqueo se calcula sobre la meta (goal) alcanzada
        // Si prefieres sobre fundsRaised, cambia p.goal por p.fundsRaised
        uint256 maxUnlock = (p.goal * bps) / 10000;
        if (maxUnlock > p.fundsRaised) {
            // Seguridad: nunca más de lo realmente recaudado
            maxUnlock = p.fundsRaised;
        }
        return maxUnlock;
    }

    function withdrawable(uint256 _projectId) public view returns (uint256) {
        Project storage p = projects[_projectId];
        uint256 allowed = unlockedAmount(_projectId);
        if (allowed <= p.fundsWithdrawn) return 0;
        uint256 remaining = allowed - p.fundsWithdrawn;
        // También limitado por el saldo vivo del proyecto
        if (remaining > projectBalance[_projectId]) {
            remaining = projectBalance[_projectId];
        }
        return remaining;
    }


    function withdraw(uint256 _projectId, uint256 amount)
        external
        onlyProjectOwner(_projectId)
    {
        Project storage p = projects[_projectId];

        require(p.fundsRaised >= p.goal, "Aun no se alcanza la meta");

        uint256 maxNow = withdrawable(_projectId);
        require(amount > 0 && amount <= maxNow, "Monto no disponible para retirar");
        require(p.approvalsCount[uint8(p.phase)] > 3,"Todavia no puede retirar los fondos para esta fase");
        projectBalance[_projectId] -= amount;
        p.fundsWithdrawn += amount;

        (bool sent, ) = payable(p.owner).call{value: amount}("");
        require(sent, "Fallo en transferencia");

        emit FundsWithdrawn(_projectId, p.owner, amount);
    }

    function getProjectPhase(uint256 _projectId) public view returns (ProjectPhase) {
        return projects[_projectId].phase;
    }
    function evidenceOf(uint256 _projectId, ProjectPhase phase) public view returns (string memory) {
        return projects[_projectId].evidenceURI[uint8(phase)];
    }
    function approvalsOf(uint256 _projectId, ProjectPhase phase) public view returns (uint256) {
        return projects[_projectId].approvalsCount[uint8(phase)];
    }
    function hasApproved(uint256 _projectId, ProjectPhase phase, address user) public view returns (bool) {
        return projects[_projectId].approvedByPhase[uint8(phase)][user];
    }
}
