/**
 * Official competency areas and topics — single source of truth for the portal.
 */
export const competencies = [
  {
    id: 'computer-networks',
    name: 'Computer Networks and Cloud Computing',
    weightage: 10,
    topics: [
      { id: 'data-communication', name: 'Data Communication' },
      { id: 'computer-networks', name: 'Computer Networks' },
      { id: 'data-link-layer', name: 'Data Link Layer' },
      { id: 'network-layer', name: 'Network Layer' },
      { id: 'transport-layer', name: 'Transport Layer' },
      { id: 'application-layer', name: 'Application Layer' },
      { id: 'wireless-networks', name: 'Wireless Networks' },
      { id: 'cloud-computing', name: 'Cloud Computing' },
      {
        id: 'network-security-networks-perspective',
        name: 'Network Security (Networks Perspective)',
      },
      { id: 'next-generation-networks', name: 'Next Generation Networks' },
    ],
  },
  {
    id: 'programming-cpp-java-python',
    name: 'Programming (C++/Java/Python)',
    weightage: 10,
    topics: [
      { id: 'programming-fundamentals', name: 'Programming Fundamentals' },
      { id: 'data-types-variables', name: 'Data Types & Variables' },
      { id: 'operators-expressions', name: 'Operators & Expressions' },
      { id: 'control-structures', name: 'Control Structures' },
      { id: 'functions-methods', name: 'Functions / Methods' },
      { id: 'input-output-handling', name: 'Input / Output Handling' },
      { id: 'strings-text-processing', name: 'Strings & Text Processing' },
      { id: 'arrays-collections', name: 'Arrays & Collections' },
      {
        id: 'object-oriented-programming',
        name: 'Object-Oriented Programming (OOP)',
      },
      { id: 'memory-management-concepts', name: 'Memory Management Concepts' },
      {
        id: 'exception-error-handling',
        name: 'Exception & Error Handling',
      },
      {
        id: 'modules-packages-libraries',
        name: 'Modules, Packages & Libraries',
      },
      {
        id: 'advanced-programming-concepts',
        name: 'Advanced Programming Concepts',
      },
      {
        id: 'concurrency-parallelism-introductory',
        name: 'Concurrency & Parallelism (Introductory)',
      },
      {
        id: 'debugging-testing-optimization',
        name: 'Debugging, Testing & Optimization',
      },
      {
        id: 'software-development-practices',
        name: 'Software Development Practices',
      },
    ],
  },
  {
    id: 'data-structures-algorithms',
    name: 'Data Structures & Algorithms',
    weightage: 10,
    topics: [
      {
        id: 'foundations-of-data-structures-and-algorithms',
        name: 'Foundations of Data Structures and Algorithms',
      },
      { id: 'linear-data-structures', name: 'Linear Data Structures' },
      { id: 'non-linear-data-structures', name: 'Non-Linear Data Structures' },
      { id: 'searching-algorithms', name: 'Searching Algorithms' },
      { id: 'sorting-algorithms', name: 'Sorting Algorithms' },
      { id: 'hashing', name: 'Hashing' },
      { id: 'tree-algorithms', name: 'Tree Algorithms' },
      { id: 'graph-algorithms', name: 'Graph Algorithms' },
      { id: 'algorithm-design-techniques', name: 'Algorithm Design Techniques' },
      { id: 'advanced-data-structures', name: 'Advanced Data Structures' },
      { id: 'string-algorithms', name: 'String Algorithms' },
      { id: 'complexity-optimization', name: 'Complexity & Optimization' },
    ],
  },
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    weightage: 5,
    topics: [
      {
        id: 'introduction-to-operating-systems',
        name: 'Introduction to Operating Systems',
      },
      { id: 'operating-system-structures', name: 'Operating System Structures' },
      { id: 'process-management', name: 'Process Management' },
      { id: 'cpu-scheduling', name: 'CPU Scheduling' },
      { id: 'thread-management', name: 'Thread Management' },
      {
        id: 'concurrency-synchronization',
        name: 'Concurrency & Synchronization',
      },
      { id: 'deadlocks', name: 'Deadlocks' },
      { id: 'memory-management', name: 'Memory Management' },
      { id: 'file-system-management', name: 'File System Management' },
      {
        id: 'secondary-storage-management',
        name: 'Secondary Storage Management',
      },
      { id: 'input-output-systems', name: 'Input / Output Systems' },
      { id: 'protection-security', name: 'Protection & Security' },
    ],
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    weightage: 10,
    topics: [
      {
        id: 'introduction-to-software-engineering',
        name: 'Introduction to Software Engineering',
      },
      { id: 'software-process-models', name: 'Software Process Models' },
      { id: 'agile-software-development', name: 'Agile Software Development' },
      {
        id: 'software-requirements-engineering',
        name: 'Software Requirements Engineering',
      },
      {
        id: 'software-project-management',
        name: 'Software Project Management',
      },
      { id: 'software-design', name: 'Software Design' },
      { id: 'software-architecture', name: 'Software Architecture' },
      { id: 'user-interface-design', name: 'User Interface Design' },
      {
        id: 'software-implementation-coding',
        name: 'Software Implementation & Coding',
      },
      { id: 'software-testing', name: 'Software Testing' },
      {
        id: 'software-maintenance-evolution',
        name: 'Software Maintenance & Evolution',
      },
      {
        id: 'software-quality-assurance',
        name: 'Software Quality Assurance',
      },
      {
        id: 'software-metrics-measurement',
        name: 'Software Metrics & Measurement',
      },
      {
        id: 'software-configuration-management',
        name: 'Software Configuration Management',
      },
      { id: 'software-risk-management', name: 'Software Risk Management' },
      {
        id: 'software-security-engineering',
        name: 'Software Security Engineering',
      },
    ],
  },
  {
    id: 'web-development',
    name: 'Web Development',
    weightage: 10,
    topics: [
      {
        id: 'introduction-to-web-development',
        name: 'Introduction to Web Development',
      },
      {
        id: 'web-architecture-protocols',
        name: 'Web Architecture & Protocols',
      },
      { id: 'html-fundamentals', name: 'HTML Fundamentals' },
      { id: 'css-fundamentals', name: 'CSS Fundamentals' },
      {
        id: 'advanced-css-responsive-design',
        name: 'Advanced CSS & Responsive Design',
      },
      { id: 'javascript-fundamentals', name: 'JavaScript Fundamentals' },
      { id: 'advanced-javascript', name: 'Advanced JavaScript' },
      {
        id: 'frontend-frameworks-libraries',
        name: 'Frontend Frameworks & Libraries',
      },
      {
        id: 'backend-development-fundamentals',
        name: 'Backend Development Fundamentals',
      },
      { id: 'server-side-programming', name: 'Server-Side Programming' },
      {
        id: 'databases-for-web-applications',
        name: 'Databases for Web Applications',
      },
      { id: 'web-security', name: 'Web Security' },
      {
        id: 'web-performance-optimization',
        name: 'Web Performance & Optimization',
      },
      { id: 'web-testing-debugging', name: 'Web Testing & Debugging' },
      { id: 'deployment-hosting', name: 'Deployment & Hosting' },
      { id: 'web-apis-integration', name: 'Web APIs & Integration' },
      {
        id: 'modern-web-development-practices',
        name: 'Modern Web Development Practices',
      },
    ],
  },
  {
    id: 'ai-machine-learning-data-analytics',
    name: 'AI / Machine Learning and Data Analytics',
    weightage: 10,
    topics: [
      { id: 'mathematical-foundations', name: 'Mathematical Foundations' },
      {
        id: 'python-for-ai-data-analytics',
        name: 'Python for AI & Data Analytics',
      },
      {
        id: 'data-collection-pre-processing',
        name: 'Data Collection & Pre-processing',
      },
      {
        id: 'exploratory-data-analysis-eda',
        name: 'Exploratory Data Analysis (EDA)',
      },
      { id: 'supervised-learning', name: 'Supervised Learning' },
      { id: 'unsupervised-learning-1', name: 'Unsupervised Learning' },
      { id: 'ensemble-learning', name: 'Ensemble Learning' },
      { id: 'unsupervised-learning-2', name: 'Unsupervised Learning' },
      {
        id: 'model-evaluation-validation',
        name: 'Model Evaluation & Validation',
      },
      {
        id: 'feature-engineering-selection',
        name: 'Feature Engineering & Selection',
      },
      { id: 'deep-learning-fundamentals', name: 'Deep Learning Fundamentals' },
      { id: 'advanced-deep-learning', name: 'Advanced Deep Learning' },
      {
        id: 'natural-language-processing-nlp',
        name: 'Natural Language Processing (NLP)',
      },
      { id: 'computer-vision', name: 'Computer Vision' },
      {
        id: 'big-data-analytics-introductory',
        name: 'Big Data Analytics (Introductory)',
      },
      {
        id: 'model-deployment-mlops-basics',
        name: 'Model Deployment & MLOps Basics',
      },
      {
        id: 'ai-ethics-security-privacy',
        name: 'AI Ethics, Security & Privacy',
      },
    ],
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    weightage: 5,
    topics: [
      {
        id: 'introduction-to-cyber-security',
        name: 'Introduction to Cyber Security',
      },
      {
        id: 'security-fundamentals-principles',
        name: 'Security Fundamentals & Principles',
      },
      { id: 'cryptography-basics', name: 'Cryptography Basics' },
      { id: 'network-security', name: 'Network Security' },
      { id: 'operating-system-security', name: 'Operating System Security' },
      { id: 'web-application-security', name: 'Web Application Security' },
      { id: 'malware-attack-techniques', name: 'Malware & Attack Techniques' },
      {
        id: 'authentication-access-control',
        name: 'Authentication & Access Control',
      },
      {
        id: 'secure-software-development',
        name: 'Secure Software Development',
      },
      { id: 'wireless-mobile-security', name: 'Wireless & Mobile Security' },
      {
        id: 'cloud-virtualization-security',
        name: 'Cloud & Virtualization Security',
      },
      { id: 'digital-forensics', name: 'Digital Forensics' },
      {
        id: 'incident-response-management',
        name: 'Incident Response & Management',
      },
      {
        id: 'security-monitoring-auditing',
        name: 'Security Monitoring & Auditing',
      },
      { id: 'cyber-laws-ethics', name: 'Cyber Laws & Ethics' },
      {
        id: 'emerging-trends-in-cyber-security',
        name: 'Emerging Trends in Cyber Security',
      },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    weightage: 10,
    topics: [
      {
        id: 'introduction-to-database-systems',
        name: 'Introduction to Database Systems',
      },
      {
        id: 'database-system-architecture',
        name: 'Database System Architecture',
      },
      { id: 'data-models', name: 'Data Models' },
      {
        id: 'relational-database-concepts',
        name: 'Relational Database Concepts',
      },
      {
        id: 'relational-algebra-calculus',
        name: 'Relational Algebra & Calculus',
      },
      {
        id: 'structured-query-language-sql',
        name: 'Structured Query Language (SQL)',
      },
      { id: 'advanced-sql', name: 'Advanced SQL' },
      {
        id: 'database-design-normalization',
        name: 'Database Design & Normalization',
      },
      { id: 'transaction-management', name: 'Transaction Management' },
      { id: 'concurrency-control', name: 'Concurrency Control' },
      { id: 'recovery-management', name: 'Recovery Management' },
      { id: 'indexing-file-organization', name: 'Indexing & File Organization' },
      {
        id: 'query-processing-optimization',
        name: 'Query Processing & Optimization',
      },
      { id: 'database-security', name: 'Database Security' },
      { id: 'distributed-databases', name: 'Distributed Databases' },
      { id: 'nosql-modern-databases', name: 'NoSQL & Modern Databases' },
      {
        id: 'data-warehousing-data-mining-introductory',
        name: 'Data Warehousing & Data Mining (Introductory)',
      },
    ],
  },
  {
    id: 'problem-solving-analytical-skills',
    name: 'Problem Solving and Analytical Skills',
    weightage: 20,
    topics: [
      {
        id: 'introduction-to-problem-solving',
        name: 'Introduction to Problem Solving',
      },
      {
        id: 'problem-understanding-analysis',
        name: 'Problem Understanding & Analysis',
      },
      {
        id: 'logical-reasoning-fundamentals',
        name: 'Logical Reasoning Fundamentals',
      },
      { id: 'algorithms-flow-control', name: 'Algorithms & Flow Control' },
      {
        id: 'data-representation-abstraction',
        name: 'Data Representation & Abstraction',
      },
      {
        id: 'pattern-recognition-generalization',
        name: 'Pattern Recognition & Generalization',
      },
      {
        id: 'mathematical-quantitative-reasoning',
        name: 'Mathematical & Quantitative Reasoning',
      },
      { id: 'algorithmic-thinking', name: 'Algorithmic Thinking' },
      {
        id: 'critical-thinking-decision-making',
        name: 'Critical Thinking & Decision Making',
      },
      { id: 'debugging-error-analysis', name: 'Debugging & Error Analysis' },
      {
        id: 'complexity-efficiency-awareness',
        name: 'Complexity & Efficiency Awareness',
      },
      {
        id: 'problem-solving-using-programming',
        name: 'Problem Solving Using Programming',
      },
      {
        id: 'data-driven-problem-solving',
        name: 'Data-Driven Problem Solving',
      },
      {
        id: 'creative-innovative-thinking',
        name: 'Creative & Innovative Thinking',
      },
      { id: 'real-world-problem-solving', name: 'Real-World Problem Solving' },
      {
        id: 'communication-documentation-of-solutions',
        name: 'Communication & Documentation of Solutions',
      },
    ],
  },
]

export function getCompetencyById(competencyId) {
  return competencies.find((c) => c.id === competencyId) ?? null
}

export function getTopicByIds(competencyId, topicId) {
  const competency = getCompetencyById(competencyId)
  if (!competency) return null
  const topic = competency.topics.find((t) => t.id === topicId)
  if (!topic) return null
  return { competency, topic }
}

export function getOtherTopicNames(competency, excludeTopicId) {
  return competency.topics
    .filter((t) => t.id !== excludeTopicId)
    .map((t) => t.name)
}
