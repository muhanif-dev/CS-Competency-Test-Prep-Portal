import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Question from '../models/Question.js'

const sampleQuestions = [
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes the CIA triad in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Confidentiality, Integrity, Availability"
      },
      {
        "id": "B",
        "text": "Cryptography, Integrity, Authentication"
      },
      {
        "id": "C",
        "text": "Compliance, Investigation, Analysis"
      },
      {
        "id": "D",
        "text": "Control, Identification, Access"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a \"vulnerability\" in cybersecurity terms?",
    "options": [
      {
        "id": "A",
        "text": "A person who breaks into a system"
      },
      {
        "id": "B",
        "text": "A weakness in a system or process that can be exploited"
      },
      {
        "id": "C",
        "text": "A potential pathway for an attack to succeed"
      },
      {
        "id": "D",
        "text": "A type of security policy"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is an example of a *threat*?",
    "options": [
      {
        "id": "A",
        "text": "Unpatched software"
      },
      {
        "id": "B",
        "text": "A hacker attempting to break into a server"
      },
      {
        "id": "C",
        "text": "A misconfigured firewall"
      },
      {
        "id": "D",
        "text": "A weak password policy"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does \"confidentiality\" mean in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Ensuring data is always available on demand"
      },
      {
        "id": "B",
        "text": "Ensuring data does not change unexpectedly"
      },
      {
        "id": "C",
        "text": "Ensuring only authorized people can access data"
      },
      {
        "id": "D",
        "text": "Ensuring systems are backed up regularly"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does \"integrity\" mean in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Data is protected from unauthorized modification"
      },
      {
        "id": "B",
        "text": "Data is encrypted and unreadable to attackers"
      },
      {
        "id": "C",
        "text": "Systems are always reachable online"
      },
      {
        "id": "D",
        "text": "Users can log in anytime they want"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does \"availability\" mean in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Data is kept secret from competitors"
      },
      {
        "id": "B",
        "text": "Data is protected from deletion"
      },
      {
        "id": "C",
        "text": "Systems and data are accessible when needed"
      },
      {
        "id": "D",
        "text": "Users are authenticated properly"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes a *risk* in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "A theoretical idea about security"
      },
      {
        "id": "B",
        "text": "A tool used to detect malware"
      },
      {
        "id": "C",
        "text": "A type of security policy"
      },
      {
        "id": "D",
        "text": "The likelihood that a threat will exploit a vulnerability and cause harm"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of a security policy?",
    "options": [
      {
        "id": "A",
        "text": "To list all employees in a company"
      },
      {
        "id": "B",
        "text": "To define roles, responsibilities, and rules for protecting information"
      },
      {
        "id": "C",
        "text": "To replace antivirus software"
      },
      {
        "id": "D",
        "text": "To prevent all attacks from happening"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common *non‑technical* control?",
    "options": [
      {
        "id": "A",
        "text": "Security awareness training"
      },
      {
        "id": "B",
        "text": "Firewall"
      },
      {
        "id": "C",
        "text": "Access control list"
      },
      {
        "id": "D",
        "text": "Encryption"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is an example of a *technical* control?",
    "options": [
      {
        "id": "A",
        "text": "Intrusion Detection System (IDS)"
      },
      {
        "id": "B",
        "text": "Acceptable use policy"
      },
      {
        "id": "C",
        "text": "Security awareness poster"
      },
      {
        "id": "D",
        "text": "Background check"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a \"zero‑day vulnerability\"?",
    "options": [
      {
        "id": "A",
        "text": "A vulnerability that is unknown to the vendor and has no patch yet"
      },
      {
        "id": "B",
        "text": "A vulnerability that has already been patched"
      },
      {
        "id": "C",
        "text": "A vulnerability that is publicly known but not yet fixed"
      },
      {
        "id": "D",
        "text": "A vulnerability that only exists on weekends"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a *security incident*?",
    "options": [
      {
        "id": "A",
        "text": "A minor configuration change"
      },
      {
        "id": "B",
        "text": "A scheduled system update"
      },
      {
        "id": "C",
        "text": "A user changing their password"
      },
      {
        "id": "D",
        "text": "A suspected or confirmed violation of security policy"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes *malware*?",
    "options": [
      {
        "id": "A",
        "text": "Malicious software designed to harm or exploit systems"
      },
      {
        "id": "B",
        "text": "Any legal software"
      },
      {
        "id": "C",
        "text": "Software designed to protect systems"
      },
      {
        "id": "D",
        "text": "A type of firewall"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is *phishing*?",
    "options": [
      {
        "id": "A",
        "text": "A type of antivirus software"
      },
      {
        "id": "B",
        "text": "An attack that uses fake emails or messages to trick users"
      },
      {
        "id": "C",
        "text": "A method of encrypting emails"
      },
      {
        "id": "D",
        "text": "A firewall rule"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is NOT one of the three main elements of authentication?",
    "options": [
      {
        "id": "A",
        "text": "Something you know"
      },
      {
        "id": "B",
        "text": "Something you have"
      },
      {
        "id": "C",
        "text": "Something you read"
      },
      {
        "id": "D",
        "text": "Something you are"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes *multi‑factor authentication (MFA)*?",
    "options": [
      {
        "id": "A",
        "text": "Using multiple usernames"
      },
      {
        "id": "B",
        "text": "Requiring at least two different types of credentials to log in"
      },
      {
        "id": "C",
        "text": "Using only a password"
      },
      {
        "id": "D",
        "text": "Using only a smart card"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of *patch management*?",
    "options": [
      {
        "id": "A",
        "text": "To remove all users from a system"
      },
      {
        "id": "B",
        "text": "To delete all logs"
      },
      {
        "id": "C",
        "text": "To stop all network traffic"
      },
      {
        "id": "D",
        "text": "To keep software updated with security fixes"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes *defense in depth*?",
    "options": [
      {
        "id": "A",
        "text": "Having only one layer of security"
      },
      {
        "id": "B",
        "text": "Relying only on a firewall"
      },
      {
        "id": "C",
        "text": "Ignoring vulnerabilities"
      },
      {
        "id": "D",
        "text": "Using multiple layers of security controls"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is an *asset* in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Any resource that has value to the organization"
      },
      {
        "id": "B",
        "text": "A type of ransom"
      },
      {
        "id": "C",
        "text": "A person who runs attacks"
      },
      {
        "id": "D",
        "text": "A temporary backup"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is an example of *data at rest*?",
    "options": [
      {
        "id": "A",
        "text": "Data being sent over a network"
      },
      {
        "id": "B",
        "text": "Data being processed in memory"
      },
      {
        "id": "C",
        "text": "Data being typed by a user"
      },
      {
        "id": "D",
        "text": "Data stored in a database or on a hard drive"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of a firewall in network security?",
    "options": [
      {
        "id": "A",
        "text": "To act as a barrier between networks and control traffic based on rules"
      },
      {
        "id": "B",
        "text": "To speed up internet browsing"
      },
      {
        "id": "C",
        "text": "To automatically update all software"
      },
      {
        "id": "D",
        "text": "To scan hardware for faults"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes a *packet‑filtering firewall*?",
    "options": [
      {
        "id": "A",
        "text": "It inspects only the payload of packets"
      },
      {
        "id": "B",
        "text": "It runs only on mobile devices"
      },
      {
        "id": "C",
        "text": "It encrypts all packets"
      },
      {
        "id": "D",
        "text": "It filters traffic based only on IP addresses, ports, and protocols"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a *Virtual Private Network (VPN)* used for?",
    "options": [
      {
        "id": "A",
        "text": "To increase CPU speed"
      },
      {
        "id": "B",
        "text": "To delete logs automatically"
      },
      {
        "id": "C",
        "text": "To connect two networks over the internet using encrypted tunnels"
      },
      {
        "id": "D",
        "text": "To block all inbound traffic permanently"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a key function of an Intrusion Detection System (IDS)?",
    "options": [
      {
        "id": "A",
        "text": "To fix configuration errors"
      },
      {
        "id": "B",
        "text": "To detect possible malicious network activity and alert administrators"
      },
      {
        "id": "C",
        "text": "To block all unknown programs"
      },
      {
        "id": "D",
        "text": "To manage user passwords"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "How does an Intrusion Prevention System (IPS) differ from an IDS?",
    "options": [
      {
        "id": "A",
        "text": "An IPS only logs traffic, while an IDS blocks it"
      },
      {
        "id": "B",
        "text": "An IPS works only on Wi‑Fi"
      },
      {
        "id": "C",
        "text": "An IPS never produces alerts"
      },
      {
        "id": "D",
        "text": "An IPS can actively block or drop malicious traffic"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is *Network Address Translation (NAT)* used for?",
    "options": [
      {
        "id": "A",
        "text": "To encrypt passwords"
      },
      {
        "id": "B",
        "text": "To hide internal IP addresses from the outside world"
      },
      {
        "id": "C",
        "text": "To control user permissions on files"
      },
      {
        "id": "D",
        "text": "To detect malware in emails"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common goal of a Denial‑of‑Service (DoS) attack?",
    "options": [
      {
        "id": "A",
        "text": "To slowly read small amounts of data without being noticed"
      },
      {
        "id": "B",
        "text": "To encrypt data for backup"
      },
      {
        "id": "C",
        "text": "To make a system or service unavailable by overwhelming it with traffic"
      },
      {
        "id": "D",
        "text": "To improve response time of servers"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a Distributed Denial‑of‑Service (DDoS) attack?",
    "options": [
      {
        "id": "A",
        "text": "An attack launched from a single computer"
      },
      {
        "id": "B",
        "text": "A physical attack on a data center"
      },
      {
        "id": "C",
        "text": "A DoS attack launched from many compromised devices (a botnet)"
      },
      {
        "id": "D",
        "text": "A policy that blocks all external traffic"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes a man‑in‑the‑middle (MitM) attack?",
    "options": [
      {
        "id": "A",
        "text": "Intercepting and possibly altering communication between two parties"
      },
      {
        "id": "B",
        "text": "Deleting all files on a server"
      },
      {
        "id": "C",
        "text": "Locking a user out of their account forever"
      },
      {
        "id": "D",
        "text": "Formatting a hard drive remotely"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common method to protect against MitM attacks on Wi‑Fi?",
    "options": [
      {
        "id": "A",
        "text": "Using WPA3 or WPA2 encryption with strong passwords"
      },
      {
        "id": "B",
        "text": "Disabling all Wi‑Fi networks"
      },
      {
        "id": "C",
        "text": "Using only pay‑per‑view websites"
      },
      {
        "id": "D",
        "text": "Turning off all firewalls"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the role of encryption in network security?",
    "options": [
      {
        "id": "A",
        "text": "To increase bandwidth"
      },
      {
        "id": "B",
        "text": "To delete log files automatically"
      },
      {
        "id": "C",
        "text": "To make data unreadable to unauthorized parties"
      },
      {
        "id": "D",
        "text": "To assign IP addresses"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a transport‑layer security protocol?",
    "options": [
      {
        "id": "A",
        "text": "TLS"
      },
      {
        "id": "B",
        "text": "HTTP"
      },
      {
        "id": "C",
        "text": "FTP"
      },
      {
        "id": "D",
        "text": "ICMP"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of segmentation in network design?",
    "options": [
      {
        "id": "A",
        "text": "To join all users into one big network"
      },
      {
        "id": "B",
        "text": "To delete all subnets"
      },
      {
        "id": "C",
        "text": "To remove all security devices"
      },
      {
        "id": "D",
        "text": "To divide a network into smaller parts to limit the spread of attacks"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes a proxy firewall?",
    "options": [
      {
        "id": "A",
        "text": "It forwards all packets without inspection"
      },
      {
        "id": "B",
        "text": "It only runs on mobile phones"
      },
      {
        "id": "C",
        "text": "It stores all user passwords"
      },
      {
        "id": "D",
        "text": "It acts as an intermediary that receives and inspects traffic before forwarding it"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is *port scanning* in the context of network security?",
    "options": [
      {
        "id": "A",
        "text": "A legitimate way to find misconfigured ports, but often used by attackers"
      },
      {
        "id": "B",
        "text": "A method to permanently close all ports"
      },
      {
        "id": "C",
        "text": "A way to delete all software"
      },
      {
        "id": "D",
        "text": "A type of encryption"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common mitigation against many network‑based attacks?",
    "options": [
      {
        "id": "A",
        "text": "Turning off all security alarms"
      },
      {
        "id": "B",
        "text": "Keeping systems patched and using up‑to‑date security devices"
      },
      {
        "id": "C",
        "text": "Using default passwords"
      },
      {
        "id": "D",
        "text": "Disabling all logging"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is *sniffing* in a network context?",
    "options": [
      {
        "id": "A",
        "text": "Illegally capturing and analyzing network traffic"
      },
      {
        "id": "B",
        "text": "Compressing data"
      },
      {
        "id": "C",
        "text": "Deleting log files"
      },
      {
        "id": "D",
        "text": "Updating drivers"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a security‑related use for *logging* in network devices?",
    "options": [
      {
        "id": "A",
        "text": "To store private user messages permanently"
      },
      {
        "id": "B",
        "text": "To help debug problems and detect suspicious activity"
      },
      {
        "id": "C",
        "text": "To speed up network traffic"
      },
      {
        "id": "D",
        "text": "To replace antivirus software"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main reason for restricting unnecessary ports and services on a server?",
    "options": [
      {
        "id": "A",
        "text": "To slow down the system deliberately"
      },
      {
        "id": "B",
        "text": "To increase bandwidth usage"
      },
      {
        "id": "C",
        "text": "To reduce the number of possible attack paths (attack surface)"
      },
      {
        "id": "D",
        "text": "To make backups easier"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes *defense in depth* at the network level?",
    "options": [
      {
        "id": "A",
        "text": "Using multiple layers such as firewalls, segmentation, IDS/IPS, and encryption"
      },
      {
        "id": "B",
        "text": "Relying only on a single firewall"
      },
      {
        "id": "C",
        "text": "Blocking all internal traffic"
      },
      {
        "id": "D",
        "text": "Disabling all authentication"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the primary purpose of cryptography in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "To increase network speed"
      },
      {
        "id": "B",
        "text": "To convert plaintext into unreadable ciphertext for confidentiality and integrity"
      },
      {
        "id": "C",
        "text": "To compress data before storage"
      },
      {
        "id": "D",
        "text": "To list all network users"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes symmetric‑key cryptography?",
    "options": [
      {
        "id": "A",
        "text": "One key encrypts and another key decrypts"
      },
      {
        "id": "B",
        "text": "The same key is used for both encryption and decryption​"
      },
      {
        "id": "C",
        "text": "Only one key is used for hashing"
      },
      {
        "id": "D",
        "text": "Only public keys are involved"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is an example of a modern symmetric encryption algorithm?",
    "options": [
      {
        "id": "A",
        "text": "RSA"
      },
      {
        "id": "B",
        "text": "Diffie‑Hellman"
      },
      {
        "id": "C",
        "text": "AES (Advanced Encryption Standard)​"
      },
      {
        "id": "D",
        "text": "SHA‑256"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes asymmetric‑key cryptography?",
    "options": [
      {
        "id": "A",
        "text": "Everyone shares the same secret key"
      },
      {
        "id": "B",
        "text": "Only hashes are used"
      },
      {
        "id": "C",
        "text": "One public key and one private key are used for encryption/decryption and signing"
      },
      {
        "id": "D",
        "text": "Only symmetric keys exist"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "In public‑key cryptography, what is the main role of the public key?",
    "options": [
      {
        "id": "A",
        "text": "To decrypt data"
      },
      {
        "id": "B",
        "text": "To store passwords"
      },
      {
        "id": "C",
        "text": "To compress files"
      },
      {
        "id": "D",
        "text": "To encrypt data or verify digital signatures"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "In public‑key cryptography, what is the main role of the private key?",
    "options": [
      {
        "id": "A",
        "text": "To be shared with everyone"
      },
      {
        "id": "B",
        "text": "To encrypt data for others"
      },
      {
        "id": "C",
        "text": "To store public keys"
      },
      {
        "id": "D",
        "text": "To decrypt data or create digital signatures"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a digital signature used for?",
    "options": [
      {
        "id": "A",
        "text": "To ensure integrity and non‑repudiation of a message​"
      },
      {
        "id": "B",
        "text": "To decrease file size"
      },
      {
        "id": "C",
        "text": "To increase bandwidth"
      },
      {
        "id": "D",
        "text": "To hide source IP addresses"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What property does a hash function mainly provide?",
    "options": [
      {
        "id": "A",
        "text": "Encryption of data"
      },
      {
        "id": "B",
        "text": "Irreversible fixed‑length output that helps detect changes (integrity)"
      },
      {
        "id": "C",
        "text": "Key exchange"
      },
      {
        "id": "D",
        "text": "Network routing"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common cryptographic hash algorithm?",
    "options": [
      {
        "id": "A",
        "text": "SHA‑256"
      },
      {
        "id": "B",
        "text": "AES"
      },
      {
        "id": "C",
        "text": "RSA"
      },
      {
        "id": "D",
        "text": "WPA3"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is non‑repudiation in cryptography?",
    "options": [
      {
        "id": "A",
        "text": "A user can change their password"
      },
      {
        "id": "B",
        "text": "A user cannot deny performing an action (e.g., sending a digitally signed message)​"
      },
      {
        "id": "C",
        "text": "A file can be compressed"
      },
      {
        "id": "D",
        "text": "A system can run faster"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the role of a Certificate Authority (CA) in PKI?",
    "options": [
      {
        "id": "A",
        "text": "To encrypt all user data"
      },
      {
        "id": "B",
        "text": "To manage firewalls"
      },
      {
        "id": "C",
        "text": "To design network topologies"
      },
      {
        "id": "D",
        "text": "To create and sign digital certificates that bind public keys to identities"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a digital certificate used for?",
    "options": [
      {
        "id": "A",
        "text": "To store usernames only"
      },
      {
        "id": "B",
        "text": "To replace passwords"
      },
      {
        "id": "C",
        "text": "To increase internet speed"
      },
      {
        "id": "D",
        "text": "To bind a public key to an identity (e.g., domain or user) and to be trusted in TLS/SSL"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which protocol commonly uses PKI certificates to secure web traffic?",
    "options": [
      {
        "id": "A",
        "text": "TLS/SSL"
      },
      {
        "id": "B",
        "text": "FTP"
      },
      {
        "id": "C",
        "text": "HTTP"
      },
      {
        "id": "D",
        "text": "ICMP"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main security goal of PKI (Public Key Infrastructure)?",
    "options": [
      {
        "id": "A",
        "text": "To make all data public"
      },
      {
        "id": "B",
        "text": "To manage public and private keys and certificates for secure communication"
      },
      {
        "id": "C",
        "text": "To delete all logs"
      },
      {
        "id": "D",
        "text": "To assign IP addresses"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common use of cryptography at rest?",
    "options": [
      {
        "id": "A",
        "text": "Increasing CPU clock speed"
      },
      {
        "id": "B",
        "text": "Blocking all network traffic"
      },
      {
        "id": "C",
        "text": "Managing usernames"
      },
      {
        "id": "D",
        "text": "Encrypting files or disks on a hard drive"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is key compromise in cryptography?",
    "options": [
      {
        "id": "A",
        "text": "Changing font in a document"
      },
      {
        "id": "B",
        "text": "Rebooting a server"
      },
      {
        "id": "C",
        "text": "Losing or exposing a secret key so attackers can decrypt data or forge signatures"
      },
      {
        "id": "D",
        "text": "Updating firewall rules"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main benefit of using key rotation?",
    "options": [
      {
        "id": "A",
        "text": "To limit the damage if a key is compromised by changing it periodically"
      },
      {
        "id": "B",
        "text": "To reduce system performance"
      },
      {
        "id": "C",
        "text": "To lock out all users"
      },
      {
        "id": "D",
        "text": "To delete all certificates"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does confidentiality mean in the context of cryptography?",
    "options": [
      {
        "id": "A",
        "text": "Data cannot be changed without detection"
      },
      {
        "id": "B",
        "text": "Only authorized users can read the data"
      },
      {
        "id": "C",
        "text": "Systems are always available"
      },
      {
        "id": "D",
        "text": "Users are forced to change passwords"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does integrity mean in the context of cryptography?",
    "options": [
      {
        "id": "A",
        "text": "Data can be compressed"
      },
      {
        "id": "B",
        "text": "Users can log in faster"
      },
      {
        "id": "C",
        "text": "Data has not been altered in an unauthorized way"
      },
      {
        "id": "D",
        "text": "Data is stored in multiple locations"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main difference between encryption and hashing?",
    "options": [
      {
        "id": "A",
        "text": "Encryption is reversible; hashing is not​"
      },
      {
        "id": "B",
        "text": "Only hashing provides confidentiality"
      },
      {
        "id": "C",
        "text": "Only encryption uses keys"
      },
      {
        "id": "D",
        "text": "Only hashing increases performance"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes malware?",
    "options": [
      {
        "id": "A",
        "text": "Any legal software used for backups"
      },
      {
        "id": "B",
        "text": "Only antivirus programs"
      },
      {
        "id": "C",
        "text": "Software designed to harm or exploit systems and data"
      },
      {
        "id": "D",
        "text": "A type of firewall"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a computer virus?",
    "options": [
      {
        "id": "A",
        "text": "A biological infection for computers"
      },
      {
        "id": "B",
        "text": "A worm that only spreads over Wi‑Fi"
      },
      {
        "id": "C",
        "text": "Malware that attaches itself to a legitimate file or program and spreads when executed"
      },
      {
        "id": "D",
        "text": "A security patch"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "How does a worm differ from a virus?",
    "options": [
      {
        "id": "A",
        "text": "A worm can self‑replicate and spread across networks without user action"
      },
      {
        "id": "B",
        "text": "A worm needs to be attached to a file"
      },
      {
        "id": "C",
        "text": "A worm cannot infect files"
      },
      {
        "id": "D",
        "text": "A worm is harmless by design"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a Trojan horse (or Trojan) in malware terms?",
    "options": [
      {
        "id": "A",
        "text": "A program that openly declares itself as malicious"
      },
      {
        "id": "B",
        "text": "A seemingly useful or legitimate program that hides malicious behavior"
      },
      {
        "id": "C",
        "text": "A firewall rule"
      },
      {
        "id": "D",
        "text": "A hardware component"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is ransomware designed to do?",
    "options": [
      {
        "id": "A",
        "text": "Slow down the keyboard"
      },
      {
        "id": "B",
        "text": "Improve network speed"
      },
      {
        "id": "C",
        "text": "Encrypt files and demand payment for decryption"
      },
      {
        "id": "D",
        "text": "Automatically delete itself after 24 hours"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a rootkit used for?",
    "options": [
      {
        "id": "A",
        "text": "To speed up boot‑up time"
      },
      {
        "id": "B",
        "text": "To create strong passwords"
      },
      {
        "id": "C",
        "text": "To hide itself and other malware from detection and maintain persistent access​"
      },
      {
        "id": "D",
        "text": "To update the operating system"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a botnet?",
    "options": [
      {
        "id": "A",
        "text": "A network of compromised devices controlled by an attacker for coordinated attacks (e.g., DDoS)"
      },
      {
        "id": "B",
        "text": "A single compromised computer"
      },
      {
        "id": "C",
        "text": "A type of antivirus software"
      },
      {
        "id": "D",
        "text": "A firewall device"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a zero‑day attack?",
    "options": [
      {
        "id": "A",
        "text": "An attack that happens at midnight"
      },
      {
        "id": "B",
        "text": "An attack that exploits a vulnerability that is unknown and unpatched"
      },
      {
        "id": "C",
        "text": "An attack that only targets old hardware"
      },
      {
        "id": "D",
        "text": "An attack that is always detected by antivirus"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is phishing designed to achieve?",
    "options": [
      {
        "id": "A",
        "text": "To trick users into revealing sensitive information (e.g., passwords, card data)"
      },
      {
        "id": "B",
        "text": "To speed up browsing"
      },
      {
        "id": "C",
        "text": "To compress files"
      },
      {
        "id": "D",
        "text": "To back up data"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the difference between spear phishing and regular phishing?",
    "options": [
      {
        "id": "A",
        "text": "Spear phishing targets specific individuals or organizations with tailored messages"
      },
      {
        "id": "B",
        "text": "Spear phishing uses only SMS"
      },
      {
        "id": "C",
        "text": "Regular phishing is always more dangerous"
      },
      {
        "id": "D",
        "text": "Spear phishing never uses email"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is smishing?",
    "options": [
      {
        "id": "A",
        "text": "A type of computer virus"
      },
      {
        "id": "B",
        "text": "A firewall log entry"
      },
      {
        "id": "C",
        "text": "A network monitoring tool"
      },
      {
        "id": "D",
        "text": "A phishing attack delivered via SMS or text messages"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is vishing?",
    "options": [
      {
        "id": "A",
        "text": "A computer worm"
      },
      {
        "id": "B",
        "text": "A type of encryption"
      },
      {
        "id": "C",
        "text": "A certificate signing request"
      },
      {
        "id": "D",
        "text": "A phishing attack that uses voice calls or voicemail"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes a Denial‑of‑Service (DoS) attack?",
    "options": [
      {
        "id": "A",
        "text": "An attack that tries to make a system or service unavailable by overwhelming it"
      },
      {
        "id": "B",
        "text": "An attack that slowly reads data from a database"
      },
      {
        "id": "C",
        "text": "An attack that only affects physical security"
      },
      {
        "id": "D",
        "text": "An attack that only changes background colors"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "How is a Distributed Denial‑of‑Service (DDoS) attack usually carried out?",
    "options": [
      {
        "id": "A",
        "text": "From a single laptop"
      },
      {
        "id": "B",
        "text": "From many compromised devices (a botnet) flooding the target"
      },
      {
        "id": "C",
        "text": "Only via Wi‑Fi"
      },
      {
        "id": "D",
        "text": "Only during working hours"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a man‑in‑the‑middle (MitM) attack?",
    "options": [
      {
        "id": "A",
        "text": "An attacker who physically sits between two users"
      },
      {
        "id": "B",
        "text": "A type of firewall"
      },
      {
        "id": "C",
        "text": "A legitimate debug tool"
      },
      {
        "id": "D",
        "text": "An attacker who secretly intercepts and possibly alters communication between two parties"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a way attackers can use social engineering?",
    "options": [
      {
        "id": "A",
        "text": "Improving system performance"
      },
      {
        "id": "B",
        "text": "Automating backups"
      },
      {
        "id": "C",
        "text": "Tricking users with fake emails, calls, or urgent messages to reveal passwords or install malware"
      },
      {
        "id": "D",
        "text": "Fixing broken code"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is credential stuffing?",
    "options": [
      {
        "id": "A",
        "text": "Using the same password repeatedly on the same account"
      },
      {
        "id": "B",
        "text": "Creating strong passwords"
      },
      {
        "id": "C",
        "text": "Formatting a disk"
      },
      {
        "id": "D",
        "text": "Using leaked usernames/passwords from one site to try to log in to many other sites"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is brute‑force password cracking?",
    "options": [
      {
        "id": "A",
        "text": "Trying every possible password combination until the correct one is found"
      },
      {
        "id": "B",
        "text": "Using only one attempt"
      },
      {
        "id": "C",
        "text": "Guessing purely by intuition"
      },
      {
        "id": "D",
        "text": "Only guessing birthdays"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a backdoor in malware?",
    "options": [
      {
        "id": "A",
        "text": "A hidden way for an attacker to bypass normal authentication and gain access​"
      },
      {
        "id": "B",
        "text": "A legitimate support tool"
      },
      {
        "id": "C",
        "text": "A firewall log"
      },
      {
        "id": "D",
        "text": "A type of certificate"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is one common defense against many malware attacks?",
    "options": [
      {
        "id": "A",
        "text": "Using only default passwords"
      },
      {
        "id": "B",
        "text": "Keeping software updated, using antivirus, and training users on phishing"
      },
      {
        "id": "C",
        "text": "Disabling all network connections"
      },
      {
        "id": "D",
        "text": "Turning off all logging"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does OWASP stand for?",
    "options": [
      {
        "id": "A",
        "text": "Open Web Application Security Project​"
      },
      {
        "id": "B",
        "text": "Open Web Application Software Project"
      },
      {
        "id": "C",
        "text": "Organizational Web App Security Protocol"
      },
      {
        "id": "D",
        "text": "Online Web Analysis Service Program"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of the OWASP Top 10?",
    "options": [
      {
        "id": "A",
        "text": "To identify the 10 most critical web application security risks"
      },
      {
        "id": "B",
        "text": "To list the 10 most popular web frameworks"
      },
      {
        "id": "C",
        "text": "To rank web hosting providers"
      },
      {
        "id": "D",
        "text": "To define pricing for web apps"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes SQL injection (SQLi)?",
    "options": [
      {
        "id": "A",
        "text": "An attack that sends malicious SQL commands through user input to a database"
      },
      {
        "id": "B",
        "text": "A way to speed up database queries"
      },
      {
        "id": "C",
        "text": "A method to back up databases"
      },
      {
        "id": "D",
        "text": "A way to compress web pages"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a common result of a successful SQL injection attack?",
    "options": [
      {
        "id": "A",
        "text": "Improved page load time"
      },
      {
        "id": "B",
        "text": "Automatic deletion of the app"
      },
      {
        "id": "C",
        "text": "Data leakage, data modification, or full database compromise"
      },
      {
        "id": "D",
        "text": "Enhanced SEO ranking"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Cross‑Site Scripting (XSS)?",
    "options": [
      {
        "id": "A",
        "text": "An attack where malicious scripts are injected into web pages viewed by other users"
      },
      {
        "id": "B",
        "text": "A way to change the font on a website"
      },
      {
        "id": "C",
        "text": "A method to encrypt all traffic"
      },
      {
        "id": "D",
        "text": "A type of firewall rule"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a good defense against XSS?",
    "options": [
      {
        "id": "A",
        "text": "Disabling all JavaScript"
      },
      {
        "id": "B",
        "text": "Using only HTTP (no HTTPS)"
      },
      {
        "id": "C",
        "text": "Allowing any script in user profiles"
      },
      {
        "id": "D",
        "text": "Properly sanitizing and escaping user input/output"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Cross‑Site Request Forgery (CSRF)?",
    "options": [
      {
        "id": "A",
        "text": "An attack where a user unintentionally sends a request to a site they are logged into"
      },
      {
        "id": "B",
        "text": "A virus that attacks the CPU"
      },
      {
        "id": "C",
        "text": "A way to compress images"
      },
      {
        "id": "D",
        "text": "A protocol for email"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common mitigation for CSRF attacks?",
    "options": [
      {
        "id": "A",
        "text": "Using the same random token for every user"
      },
      {
        "id": "B",
        "text": "Removing all login features"
      },
      {
        "id": "C",
        "text": "Allowing any request from any site"
      },
      {
        "id": "D",
        "text": "Using anti‑CSRF tokens (e.g., unique tokens per session)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does insecure direct object reference (IDOR) mean?",
    "options": [
      {
        "id": "A",
        "text": "Forcing users to use long URLs"
      },
      {
        "id": "B",
        "text": "A way to encrypt sessions"
      },
      {
        "id": "C",
        "text": "Allowing users to access objects (e.g., files, IDs) they should not access by manipulating identifiers"
      },
      {
        "id": "D",
        "text": "A firewall configuration"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a common example of broken authentication in web apps?",
    "options": [
      {
        "id": "A",
        "text": "Checking for strong passwords and enforcing MFA"
      },
      {
        "id": "B",
        "text": "Using strong hashes"
      },
      {
        "id": "C",
        "text": "Disabling all user accounts"
      },
      {
        "id": "D",
        "text": "Allowing weak passwords, credential stuffing, or predictable session IDs"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is session fixation?",
    "options": [
      {
        "id": "A",
        "text": "An attack where an attacker forces a user to use a known session ID to gain access"
      },
      {
        "id": "B",
        "text": "Creating long‑lasting sessions"
      },
      {
        "id": "C",
        "text": "A way to delete cookies"
      },
      {
        "id": "D",
        "text": "A method to speed up logins"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is HTTPS important for web security?",
    "options": [
      {
        "id": "A",
        "text": "It makes web pages load faster"
      },
      {
        "id": "B",
        "text": "It removes all JavaScript"
      },
      {
        "id": "C",
        "text": "It encrypts traffic between the browser and server to prevent eavesdropping"
      },
      {
        "id": "D",
        "text": "It disables user accounts"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a common risk of insecure deserialization in web apps?",
    "options": [
      {
        "id": "A",
        "text": "Improved UI performance"
      },
      {
        "id": "B",
        "text": "Automatic backups"
      },
      {
        "id": "C",
        "text": "Executing arbitrary code or creating denial‑of‑service conditions"
      },
      {
        "id": "D",
        "text": "Better SEO"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does security misconfiguration mean?",
    "options": [
      {
        "id": "A",
        "text": "Using strong passwords everywhere"
      },
      {
        "id": "B",
        "text": "Keeping all services with default settings and exposed interfaces​"
      },
      {
        "id": "C",
        "text": "Turning off all security devices"
      },
      {
        "id": "D",
        "text": "Only using open‑source software"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main goal of input validation in web apps?",
    "options": [
      {
        "id": "A",
        "text": "To accept any data no matter how malformed"
      },
      {
        "id": "B",
        "text": "To delete all logs"
      },
      {
        "id": "C",
        "text": "To check and filter user input so it does not contain malicious or unexpected content"
      },
      {
        "id": "D",
        "text": "To disable all user forms"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is output encoding/escaping used for?",
    "options": [
      {
        "id": "A",
        "text": "To compress images"
      },
      {
        "id": "B",
        "text": "To hide passwords"
      },
      {
        "id": "C",
        "text": "To disable cookies"
      },
      {
        "id": "D",
        "text": "To safely render user‑controlled data so it is not executed as code (e.g., preventing XSS)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is insecure file upload a risk for?",
    "options": [
      {
        "id": "A",
        "text": "Automatically optimizing images"
      },
      {
        "id": "B",
        "text": "Uploading malicious files (e.g., webshells) that can be executed on the server"
      },
      {
        "id": "C",
        "text": "Speeding up downloads"
      },
      {
        "id": "D",
        "text": "Improving search engine ranking"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is exposure of sensitive data in web apps?",
    "options": [
      {
        "id": "A",
        "text": "Leaking or mishandling data such as passwords, keys, or financial data​"
      },
      {
        "id": "B",
        "text": "Showing only public information"
      },
      {
        "id": "C",
        "text": "Encrypting everything"
      },
      {
        "id": "D",
        "text": "Using strong usernames only"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a simple way to harden authentication in a web app?",
    "options": [
      {
        "id": "A",
        "text": "Using default passwords"
      },
      {
        "id": "B",
        "text": "Sharing passwords via email"
      },
      {
        "id": "C",
        "text": "Allowing unlimited failed logins"
      },
      {
        "id": "D",
        "text": "Enforcing strong passwords, rate limiting login attempts, and using MFA"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main reason for security headers (e.g., Content‑Security‑Policy, X‑Frame‑Options) in web apps?",
    "options": [
      {
        "id": "A",
        "text": "To improve CPU speed"
      },
      {
        "id": "B",
        "text": "To delete cookies"
      },
      {
        "id": "C",
        "text": "To control how browsers handle content and reduce risks like XSS and clickjacking"
      },
      {
        "id": "D",
        "text": "To disable HTTPS"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main goal of incident response in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "To detect, contain, eradicate, and recover from security incidents efficiently"
      },
      {
        "id": "B",
        "text": "To prevent all attacks from happening"
      },
      {
        "id": "C",
        "text": "To delete all logs"
      },
      {
        "id": "D",
        "text": "To improve CPU speed"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is the first phase of the incident response lifecycle?",
    "options": [
      {
        "id": "A",
        "text": "Preparation"
      },
      {
        "id": "B",
        "text": "Detection"
      },
      {
        "id": "C",
        "text": "Eradication"
      },
      {
        "id": "D",
        "text": "Recovery"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of an Incident Response Plan (IRP)?",
    "options": [
      {
        "id": "A",
        "text": "To define roles, procedures, and tools for handling security incidents"
      },
      {
        "id": "B",
        "text": "To redesign a website's layout"
      },
      {
        "id": "C",
        "text": "To block all outbound traffic permanently"
      },
      {
        "id": "D",
        "text": "To train users on typing speed"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does containment mean in incident response?",
    "options": [
      {
        "id": "A",
        "text": "Ignoring all alerts"
      },
      {
        "id": "B",
        "text": "Limiting the spread and impact of an incident (e.g., isolating affected systems)"
      },
      {
        "id": "C",
        "text": "Deleting all data"
      },
      {
        "id": "D",
        "text": "Turning off the internet"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main goal of eradication in incident response?",
    "options": [
      {
        "id": "A",
        "text": "To hide the incident"
      },
      {
        "id": "B",
        "text": "To remove the root cause of the incident (e.g., malware, backdoors)"
      },
      {
        "id": "C",
        "text": "To create new user accounts"
      },
      {
        "id": "D",
        "text": "To increase bandwidth"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of the recovery phase in incident response?",
    "options": [
      {
        "id": "A",
        "text": "To restore systems and data to normal operations while validating security"
      },
      {
        "id": "B",
        "text": "To start a new organization"
      },
      {
        "id": "C",
        "text": "To delete all patches"
      },
      {
        "id": "D",
        "text": "To stop all backups"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the importance of the post‑incident review / lessons‑learned phase?",
    "options": [
      {
        "id": "A",
        "text": "To blame individuals only"
      },
      {
        "id": "B",
        "text": "To analyze what happened and improve future response and defenses"
      },
      {
        "id": "C",
        "text": "To ignore future incidents"
      },
      {
        "id": "D",
        "text": "To disable all logging"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the role of a Computer Security Incident Response Team (CSIRT)?",
    "options": [
      {
        "id": "A",
        "text": "To design marketing campaigns"
      },
      {
        "id": "B",
        "text": "To detect, analyze, and respond to security incidents for an organization"
      },
      {
        "id": "C",
        "text": "To manage office supplies"
      },
      {
        "id": "D",
        "text": "To block all users"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of logging in incident response?",
    "options": [
      {
        "id": "A",
        "text": "To consume disk space"
      },
      {
        "id": "B",
        "text": "To record events so they can be analyzed during and after an incident"
      },
      {
        "id": "C",
        "text": "To speed up the system"
      },
      {
        "id": "D",
        "text": "To remove user accounts"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is evidence preservation important in incident response?",
    "options": [
      {
        "id": "A",
        "text": "To increase CPU usage"
      },
      {
        "id": "B",
        "text": "To maintain integrity so evidence can be used in investigations or legal proceedings"
      },
      {
        "id": "C",
        "text": "To delete all traces of the attack"
      },
      {
        "id": "D",
        "text": "To hide system configurations"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does chain of custody mean in digital forensics?",
    "options": [
      {
        "id": "A",
        "text": "A sequence of software updates"
      },
      {
        "id": "B",
        "text": "The documented trail showing who handled evidence and when"
      },
      {
        "id": "C",
        "text": "A list of default passwords"
      },
      {
        "id": "D",
        "text": "A network topology diagram"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following best describes computer/digital forensics?",
    "options": [
      {
        "id": "A",
        "text": "The preservation, identification, extraction, and analysis of digital evidence"
      },
      {
        "id": "B",
        "text": "Fixing broken hardware"
      },
      {
        "id": "C",
        "text": "A type of antivirus software"
      },
      {
        "id": "D",
        "text": "A firewall policy"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why should you avoid modifying the original evidence during forensics?",
    "options": [
      {
        "id": "A",
        "text": "To save time"
      },
      {
        "id": "B",
        "text": "To increase network speed"
      },
      {
        "id": "C",
        "text": "To hide the attacker"
      },
      {
        "id": "D",
        "text": "To preserve the integrity and admissibility of evidence"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of creating a forensic image of a disk?",
    "options": [
      {
        "id": "A",
        "text": "To compress the disk for backup"
      },
      {
        "id": "B",
        "text": "To create a bitwise copy of data for analysis without changing the original"
      },
      {
        "id": "C",
        "text": "To delete malware"
      },
      {
        "id": "D",
        "text": "To speed up the operating system"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is malware analysis used for in incident response?",
    "options": [
      {
        "id": "A",
        "text": "To design better user interfaces"
      },
      {
        "id": "B",
        "text": "To slow down the system"
      },
      {
        "id": "C",
        "text": "To understand how malware behaves and how to remove it safely"
      },
      {
        "id": "D",
        "text": "To change screen resolutions"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is one common goal of threat hunting?",
    "options": [
      {
        "id": "A",
        "text": "To ignore suspicious events"
      },
      {
        "id": "B",
        "text": "To delete all logs"
      },
      {
        "id": "C",
        "text": "To disable antivirus"
      },
      {
        "id": "D",
        "text": "To proactively search for threats that may not be detected by alerts"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What type of information do security logs usually contain?",
    "options": [
      {
        "id": "A",
        "text": "Events such as logins, failed attempts, and system changes with timestamps"
      },
      {
        "id": "B",
        "text": "Only user names and no timestamps"
      },
      {
        "id": "C",
        "text": "Only CPU usage data"
      },
      {
        "id": "D",
        "text": "Only marketing emails"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of communications during an incident?",
    "options": [
      {
        "id": "A",
        "text": "To keep everyone in the dark"
      },
      {
        "id": "B",
        "text": "To coordinate response, inform stakeholders, and maintain transparency"
      },
      {
        "id": "C",
        "text": "To increase system load"
      },
      {
        "id": "D",
        "text": "To delete backups"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What should be documented in an incident report?",
    "options": [
      {
        "id": "A",
        "text": "Only the time of detection"
      },
      {
        "id": "B",
        "text": "Personal opinions only"
      },
      {
        "id": "C",
        "text": "Timeline, impact, actions taken, and lessons learned"
      },
      {
        "id": "D",
        "text": "Nothing; keep it verbal"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a benefit of having a well‑tested incident response plan?",
    "options": [
      {
        "id": "A",
        "text": "More confusion during attacks"
      },
      {
        "id": "B",
        "text": "Slower recovery time"
      },
      {
        "id": "C",
        "text": "Faster, more organized response and reduced business impact"
      },
      {
        "id": "D",
        "text": "Increased data loss"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is endpoint security mainly focused on protecting?",
    "options": [
      {
        "id": "A",
        "text": "Only servers in data centers"
      },
      {
        "id": "B",
        "text": "Physical office doors"
      },
      {
        "id": "C",
        "text": "Devices such as laptops, desktops, and mobile phones that connect to a network​"
      },
      {
        "id": "D",
        "text": "Only routers"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a typical endpoint security control?",
    "options": [
      {
        "id": "A",
        "text": "Default passwords on all devices"
      },
      {
        "id": "B",
        "text": "Turning off all logs"
      },
      {
        "id": "C",
        "text": "Antivirus/EDR, firewalls, and device control on end‑user devices​"
      },
      {
        "id": "D",
        "text": "Sharing USB drives freely"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does EDR stand for in endpoint security?",
    "options": [
      {
        "id": "A",
        "text": "Easy Data Recovery"
      },
      {
        "id": "B",
        "text": "Encrypted Desktop Repair"
      },
      {
        "id": "C",
        "text": "Endpoint Detection and Response​"
      },
      {
        "id": "D",
        "text": "Email Data Reader"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is cloud security primarily concerned with?",
    "options": [
      {
        "id": "A",
        "text": "Only physical data‑center power supplies"
      },
      {
        "id": "B",
        "text": "Protecting data, applications, and infrastructure in cloud environments (IaaS, PaaS, SaaS)​"
      },
      {
        "id": "C",
        "text": "Managing office printers"
      },
      {
        "id": "D",
        "text": "Designing websites only"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "In cloud security, what does IaaS mean?",
    "options": [
      {
        "id": "A",
        "text": "Internet‑based app services"
      },
      {
        "id": "B",
        "text": "Internal app system"
      },
      {
        "id": "C",
        "text": "Internal authentication system"
      },
      {
        "id": "D",
        "text": "Infrastructure as a Service (e.g., virtual machines, storage, networking)​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "In cloud security, what does PaaS mean?",
    "options": [
      {
        "id": "A",
        "text": "Password authentication system"
      },
      {
        "id": "B",
        "text": "Platform as a Service, providing a development and deployment environment​"
      },
      {
        "id": "C",
        "text": "Public app storage"
      },
      {
        "id": "D",
        "text": "Private access system"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "In cloud security, what does SaaS mean?",
    "options": [
      {
        "id": "A",
        "text": "Systematic app security"
      },
      {
        "id": "B",
        "text": "Secure authentication system"
      },
      {
        "id": "C",
        "text": "Simple access software"
      },
      {
        "id": "D",
        "text": "Software as a Service, where applications are hosted in the cloud and accessed over the internet​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the shared responsibility model in cloud security?",
    "options": [
      {
        "id": "A",
        "text": "Security responsibilities are split between the cloud provider (infrastructure) and the customer (data and apps)​"
      },
      {
        "id": "B",
        "text": "The cloud provider is responsible for everything"
      },
      {
        "id": "C",
        "text": "Only the customer is responsible"
      },
      {
        "id": "D",
        "text": "Security is not needed in the cloud"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common cloud security risk?",
    "options": [
      {
        "id": "A",
        "text": "Too many physical firewalls"
      },
      {
        "id": "B",
        "text": "Strong passwords on all devices"
      },
      {
        "id": "C",
        "text": "Frequent security training"
      },
      {
        "id": "D",
        "text": "Misconfigured storage buckets or overly permissive access controls​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a best practice for cloud‑based identity and access management (IAM)?",
    "options": [
      {
        "id": "A",
        "text": "Sharing root/admin credentials"
      },
      {
        "id": "B",
        "text": "Using least‑privilege access, MFA, and role‑based permissions​"
      },
      {
        "id": "C",
        "text": "Giving full access to everyone"
      },
      {
        "id": "D",
        "text": "Disabling logging"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main goal of mobile device security?",
    "options": [
      {
        "id": "A",
        "text": "To make phones faster"
      },
      {
        "id": "B",
        "text": "To protect data and access on mobile devices (phones, tablets) used in the organization​"
      },
      {
        "id": "C",
        "text": "To block Wi‑Fi"
      },
      {
        "id": "D",
        "text": "To disable all apps"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common mobile security control?",
    "options": [
      {
        "id": "A",
        "text": "MDM (Mobile Device Management), encryption, and app‑whitelisting/blacklisting​"
      },
      {
        "id": "B",
        "text": "Turning off all updates"
      },
      {
        "id": "C",
        "text": "Sharing unlocked phones"
      },
      {
        "id": "D",
        "text": "Disabling all passwords"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is zero‑trust security mainly about?",
    "options": [
      {
        "id": "A",
        "text": "Trusting all users once they are inside the network"
      },
      {
        "id": "B",
        "text": "Never trusting by default; always verifying identity and device before granting access​"
      },
      {
        "id": "C",
        "text": "Never using any security tools"
      },
      {
        "id": "D",
        "text": "Giving admin rights to all employees"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data encryption at the endpoint commonly used for?",
    "options": [
      {
        "id": "A",
        "text": "To make data take up more space"
      },
      {
        "id": "B",
        "text": "To delete backups"
      },
      {
        "id": "C",
        "text": "To slow down logins"
      },
      {
        "id": "D",
        "text": "To protect data on laptops/phones if they are lost or stolen​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a benefit of using patch management for endpoints and cloud resources?",
    "options": [
      {
        "id": "A",
        "text": "Increase the number of vulnerabilities"
      },
      {
        "id": "B",
        "text": "Delete all software"
      },
      {
        "id": "C",
        "text": "Disable all security"
      },
      {
        "id": "D",
        "text": "Reduce the risk of exploits by keeping software updated​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the role of cloud‑based threat detection in security?",
    "options": [
      {
        "id": "A",
        "text": "To hide all threats"
      },
      {
        "id": "B",
        "text": "To remove all logs"
      },
      {
        "id": "C",
        "text": "To increase bandwidth cost"
      },
      {
        "id": "D",
        "text": "To monitor cloud environments and detect suspicious activity (e.g., unusual logins, data exfiltration)​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a common security risk in bring‑your‑own‑device (BYOD) environments?",
    "options": [
      {
        "id": "A",
        "text": "Strong endpoint encryption everywhere"
      },
      {
        "id": "B",
        "text": "Mixing personal and corporate data on unmanaged devices​"
      },
      {
        "id": "C",
        "text": "Limited internet usage"
      },
      {
        "id": "D",
        "text": "Regular security training"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a good practice for cloud storage security?",
    "options": [
      {
        "id": "A",
        "text": "Leaving all buckets publicly open"
      },
      {
        "id": "B",
        "text": "Sharing keys via email"
      },
      {
        "id": "C",
        "text": "Enabling encryption and strict access controls on cloud storage​"
      },
      {
        "id": "D",
        "text": "Disabling logging"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main advantage of centralized endpoint management (e.g., MDM/SOC tools)?",
    "options": [
      {
        "id": "A",
        "text": "Harder to update any device"
      },
      {
        "id": "B",
        "text": "Increased risk from user changes"
      },
      {
        "id": "C",
        "text": "Removing all user accounts"
      },
      {
        "id": "D",
        "text": "Ability to enforce policies, push updates, and monitor security across devices​"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is endpoint visibility important in modern networks?",
    "options": [
      {
        "id": "A",
        "text": "To ignore devices"
      },
      {
        "id": "B",
        "text": "To hide logs"
      },
      {
        "id": "C",
        "text": "To detect compromised devices and respond quickly to threats​"
      },
      {
        "id": "D",
        "text": "To disable all antivirus"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is identity usually referring to in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "A user's favorite color"
      },
      {
        "id": "B",
        "text": "The physical location of a data center"
      },
      {
        "id": "C",
        "text": "A password reset link sent via email"
      },
      {
        "id": "D",
        "text": "A unique identifier for a user, device, or system (e.g., username, email)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does authentication mean?",
    "options": [
      {
        "id": "A",
        "text": "Letting everyone access everything"
      },
      {
        "id": "B",
        "text": "Proving that a user is who they claim to be (e.g., via password, token)"
      },
      {
        "id": "C",
        "text": "Encrypting data at rest"
      },
      {
        "id": "D",
        "text": "Assigning permissions to a role"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does authorization mean?",
    "options": [
      {
        "id": "A",
        "text": "Determining what resources or actions a user is allowed to access"
      },
      {
        "id": "B",
        "text": "Logging in for the first time"
      },
      {
        "id": "C",
        "text": "Verifying a user's identity via password"
      },
      {
        "id": "D",
        "text": "Backing up user data automatically"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a common authentication factor?",
    "options": [
      {
        "id": "A",
        "text": "Something you know (password), something you have (token), something you are (biometrics)"
      },
      {
        "id": "B",
        "text": "Something you buy"
      },
      {
        "id": "C",
        "text": "Something you deleted"
      },
      {
        "id": "D",
        "text": "Something someone else knows about you"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Single Sign‑On (SSO)?",
    "options": [
      {
        "id": "A",
        "text": "Logging in once and being logged out immediately"
      },
      {
        "id": "B",
        "text": "Requiring a new password for every application"
      },
      {
        "id": "C",
        "text": "Logging in once to access multiple systems or applications without re‑entering credentials"
      },
      {
        "id": "D",
        "text": "Sharing one password across all employees"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is multi‑factor authentication (MFA)?",
    "options": [
      {
        "id": "A",
        "text": "Using multiple usernames"
      },
      {
        "id": "B",
        "text": "Logging in from multiple devices simultaneously"
      },
      {
        "id": "C",
        "text": "Changing your password multiple times a day"
      },
      {
        "id": "D",
        "text": "Using at least two different authentication factors to log in"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Least Privilege in access control?",
    "options": [
      {
        "id": "A",
        "text": "Giving users as many permissions as possible"
      },
      {
        "id": "B",
        "text": "Allowing admin access to all employees by default"
      },
      {
        "id": "C",
        "text": "Giving users only the minimum permissions needed to do their job"
      },
      {
        "id": "D",
        "text": "Removing all access controls to simplify IT"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Role‑Based Access Control (RBAC)?",
    "options": [
      {
        "id": "A",
        "text": "Giving each user a random role"
      },
      {
        "id": "B",
        "text": "Assigning permissions to roles, and users are assigned to roles"
      },
      {
        "id": "C",
        "text": "Assigning permissions individually to every user account"
      },
      {
        "id": "D",
        "text": "Allowing users to choose their own access level"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Attribute‑Based Access Control (ABAC) based on?",
    "options": [
      {
        "id": "A",
        "text": "Randomly chosen attributes"
      },
      {
        "id": "B",
        "text": "A fixed list of roles with no flexibility"
      },
      {
        "id": "C",
        "text": "Access based only on job title"
      },
      {
        "id": "D",
        "text": "Policies that use attributes (user role, location, time, device type, etc.) to decide access"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is privilege escalation in security terms?",
    "options": [
      {
        "id": "A",
        "text": "Changing a user's job title"
      },
      {
        "id": "B",
        "text": "Reducing a user's access after a policy review"
      },
      {
        "id": "C",
        "text": "A user or attacker gaining higher privileges than they should have"
      },
      {
        "id": "D",
        "text": "A routine password reset process"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is separation of duties?",
    "options": [
      {
        "id": "A",
        "text": "Splitting critical tasks across multiple users to reduce fraud or error"
      },
      {
        "id": "B",
        "text": "One user handling all critical tasks"
      },
      {
        "id": "C",
        "text": "Assigning the same task to no one"
      },
      {
        "id": "D",
        "text": "Automating all approvals without human review"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is account provisioning?",
    "options": [
      {
        "id": "A",
        "text": "Creating and configuring user accounts and access rights in systems"
      },
      {
        "id": "B",
        "text": "Selling user accounts"
      },
      {
        "id": "C",
        "text": "Monitoring network traffic for anomalies"
      },
      {
        "id": "D",
        "text": "Encrypting stored account data"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is account deprovisioning?",
    "options": [
      {
        "id": "A",
        "text": "Giving users extra access"
      },
      {
        "id": "B",
        "text": "Creating a new account for a new hire"
      },
      {
        "id": "C",
        "text": "Resetting a forgotten password"
      },
      {
        "id": "D",
        "text": "Removing or disabling accounts and access when a user leaves or changes role"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is password policy important in IAM?",
    "options": [
      {
        "id": "A",
        "text": "To make passwords easier to guess"
      },
      {
        "id": "B",
        "text": "Eliminating the need for passwords entirely"
      },
      {
        "id": "C",
        "text": "To enforce rules such as minimum length, complexity, and expiration to strengthen security"
      },
      {
        "id": "D",
        "text": "Sharing passwords among team members for convenience"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is password hashing used for?",
    "options": [
      {
        "id": "A",
        "text": "To store plaintext passwords"
      },
      {
        "id": "B",
        "text": "Encrypting passwords with a key that can be reversed"
      },
      {
        "id": "C",
        "text": "To store passwords in a one‑way, irreversible form to protect them if the database is breached"
      },
      {
        "id": "D",
        "text": "Displaying passwords on screen for verification"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is brute‑force protection in IAM systems?",
    "options": [
      {
        "id": "A",
        "text": "Allowing unlimited login attempts"
      },
      {
        "id": "B",
        "text": "Disabling all password requirements"
      },
      {
        "id": "C",
        "text": "Using account lockouts, rate‑limiting, or CAPTCHA to slow down attackers"
      },
      {
        "id": "D",
        "text": "Allowing login without any credentials"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is session management in IAM?",
    "options": [
      {
        "id": "A",
        "text": "Managing physical meetings"
      },
      {
        "id": "B",
        "text": "Tracking which files a user has downloaded"
      },
      {
        "id": "C",
        "text": "Configuring network firewall rules"
      },
      {
        "id": "D",
        "text": "Controlling how long a user stays logged in and how sessions are terminated"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is federation in identity terms (e.g., SAML, OAuth, OpenID Connect)?",
    "options": [
      {
        "id": "A",
        "text": "A way to delete identities"
      },
      {
        "id": "B",
        "text": "Storing all passwords in a single central database"
      },
      {
        "id": "C",
        "text": "Allowing one organization to trust identity information from another (e.g., \"login with Google\")"
      },
      {
        "id": "D",
        "text": "Blocking access from external organizations"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is monitoring and logging important in IAM?",
    "options": [
      {
        "id": "A",
        "text": "To hide all login attempts"
      },
      {
        "id": "B",
        "text": "Automatically deleting old log files"
      },
      {
        "id": "C",
        "text": "To detect suspicious logins, privilege misuse, or policy violations"
      },
      {
        "id": "D",
        "text": "Preventing users from logging in more than once"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a key benefit of a central IAM system?",
    "options": [
      {
        "id": "A",
        "text": "More password prompts on every device"
      },
      {
        "id": "B",
        "text": "Slower access to systems due to added checks"
      },
      {
        "id": "C",
        "text": "Requiring separate credentials for each system"
      },
      {
        "id": "D",
        "text": "Consistent control over user identities and access across systems and applications"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does governance mean in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Only technical fixes"
      },
      {
        "id": "B",
        "text": "Leadership, policies, and oversight that direct how security is managed"
      },
      {
        "id": "C",
        "text": "The process of installing antivirus software"
      },
      {
        "id": "D",
        "text": "A tool used to encrypt network traffic"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is risk in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Any event that will never happen"
      },
      {
        "id": "B",
        "text": "A confirmed security breach that already occurred"
      },
      {
        "id": "C",
        "text": "The likelihood that a threat will exploit a vulnerability and cause harm"
      },
      {
        "id": "D",
        "text": "A technical control used to block attacks"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is risk assessment?",
    "options": [
      {
        "id": "A",
        "text": "Guessing randomly about threats"
      },
      {
        "id": "B",
        "text": "Automatically fixing all vulnerabilities found"
      },
      {
        "id": "C",
        "text": "A legal contract with a security vendor"
      },
      {
        "id": "D",
        "text": "The process of identifying, analyzing, and prioritizing risks"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is a risk treatment option?",
    "options": [
      {
        "id": "A",
        "text": "Ignoring all risks"
      },
      {
        "id": "B",
        "text": "Only accepting risks, never treating them"
      },
      {
        "id": "C",
        "text": "Documenting risks without any further action"
      },
      {
        "id": "D",
        "text": "Accept, avoid, mitigate, or transfer the risk"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is risk mitigation?",
    "options": [
      {
        "id": "A",
        "text": "Making risks larger"
      },
      {
        "id": "B",
        "text": "Transferring all risk to insurance without any internal action"
      },
      {
        "id": "C",
        "text": "Ignoring risks that seem unlikely"
      },
      {
        "id": "D",
        "text": "Taking steps to reduce the likelihood or impact of a risk"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data privacy mainly about?",
    "options": [
      {
        "id": "A",
        "text": "Only improving website speed"
      },
      {
        "id": "B",
        "text": "Encrypting network traffic between servers"
      },
      {
        "id": "C",
        "text": "Protecting individuals' personal information and how it is collected, stored, and used"
      },
      {
        "id": "D",
        "text": "Backing up company financial records"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does GDPR stand for and relate to?",
    "options": [
      {
        "id": "A",
        "text": "Global Data Registry Protocol"
      },
      {
        "id": "B",
        "text": "A U.S. federal law on internet speed regulation"
      },
      {
        "id": "C",
        "text": "An international network security certification"
      },
      {
        "id": "D",
        "text": "General Data Protection Regulation (EU data‑privacy law)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is ISO/IEC 27001?",
    "options": [
      {
        "id": "A",
        "text": "An international standard for Information Security Management Systems (ISMS)"
      },
      {
        "id": "B",
        "text": "A web browser"
      },
      {
        "id": "C",
        "text": "A programming language used for encryption"
      },
      {
        "id": "D",
        "text": "A type of firewall hardware"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main goal of an ISMS (Information Security Management System)?",
    "options": [
      {
        "id": "A",
        "text": "To delete all data"
      },
      {
        "id": "B",
        "text": "To replace all human security staff with automation"
      },
      {
        "id": "C",
        "text": "To manage information security systematically using policies, controls, and continuous improvement"
      },
      {
        "id": "D",
        "text": "To increase the number of user accounts in a system"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is NIST in cyber security context?",
    "options": [
      {
        "id": "A",
        "text": "A single product"
      },
      {
        "id": "B",
        "text": "A type of malware detection tool"
      },
      {
        "id": "C",
        "text": "A framework (e.g., NIST Cyber security Framework) for managing and improving security"
      },
      {
        "id": "D",
        "text": "A private company that sells firewalls"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does PCI‑DSS stand for?",
    "options": [
      {
        "id": "A",
        "text": "Personal Computer Internal Data Security System"
      },
      {
        "id": "B",
        "text": "Public Cloud Infrastructure Data Storage System"
      },
      {
        "id": "C",
        "text": "Payment Card Industry Data Security Standard"
      },
      {
        "id": "D",
        "text": "Personal Credential Identification and Data Sharing"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main purpose of PCI‑DSS?",
    "options": [
      {
        "id": "A",
        "text": "To design logos for banks"
      },
      {
        "id": "B",
        "text": "To protect cardholder data and secure payment systems"
      },
      {
        "id": "C",
        "text": "To regulate international currency exchange rates"
      },
      {
        "id": "D",
        "text": "To manage employee payroll systems"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is compliance in cyber security?",
    "options": [
      {
        "id": "A",
        "text": "Adhering to laws, regulations, standards, and internal policies"
      },
      {
        "id": "B",
        "text": "Only following personal preferences"
      },
      {
        "id": "C",
        "text": "Ignoring regulations that seem inconvenient"
      },
      {
        "id": "D",
        "text": "A one-time certification that never needs renewal"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is due diligence in security governance?",
    "options": [
      {
        "id": "A",
        "text": "Avoiding all security work"
      },
      {
        "id": "B",
        "text": "Reasonable steps taken to find and reduce risk before an incident"
      },
      {
        "id": "C",
        "text": "Reacting only after an incident has occurred"
      },
      {
        "id": "D",
        "text": "Delegating all responsibility to a third-party vendor"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is due care?",
    "options": [
      {
        "id": "A",
        "text": "Nothing being done"
      },
      {
        "id": "B",
        "text": "The minimum level of security measures an organization should reasonably provide"
      },
      {
        "id": "C",
        "text": "The maximum possible security measures regardless of cost"
      },
      {
        "id": "D",
        "text": "A legal document signed after a breach"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is information classification used for?",
    "options": [
      {
        "id": "A",
        "text": "To increase data volume"
      },
      {
        "id": "B",
        "text": "To label data (e.g., public, internal, confidential) so protection matches its value and sensitivity"
      },
      {
        "id": "C",
        "text": "Deleting data that is no longer needed"
      },
      {
        "id": "D",
        "text": "Encrypting all data equally regardless of sensitivity"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is an acceptable use policy (AUP)?",
    "options": [
      {
        "id": "A",
        "text": "A rule that allows any use of systems"
      },
      {
        "id": "B",
        "text": "A policy describing allowed and prohibited use of organizational IT resources"
      },
      {
        "id": "C",
        "text": "A technical control that blocks malware"
      },
      {
        "id": "D",
        "text": "A list of approved software vendors"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is security awareness training meant to achieve?",
    "options": [
      {
        "id": "A",
        "text": "To educate users about threats (e.g., phishing) and safe behavior"
      },
      {
        "id": "B",
        "text": "To confuse users"
      },
      {
        "id": "C",
        "text": "To replace the need for technical security controls"
      },
      {
        "id": "D",
        "text": "To test the speed of the company network"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is asset management in security?",
    "options": [
      {
        "id": "A",
        "text": "Only buying hardware"
      },
      {
        "id": "B",
        "text": "Identifying, cataloging, and managing information assets and their protection"
      },
      {
        "id": "C",
        "text": "Selling unused company equipment"
      },
      {
        "id": "D",
        "text": "Monitoring employee productivity"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is business continuity planning (BCP)?",
    "options": [
      {
        "id": "A",
        "text": "Ensuring a business never stops"
      },
      {
        "id": "B",
        "text": "A marketing plan for new products"
      },
      {
        "id": "C",
        "text": "Planning how to keep critical functions running during or after a major incident"
      },
      {
        "id": "D",
        "text": "A checklist for hiring new employees"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is disaster recovery (DR)?",
    "options": [
      {
        "id": "A",
        "text": "Just buying new servers"
      },
      {
        "id": "B",
        "text": "A daily backup schedule with no recovery testing"
      },
      {
        "id": "C",
        "text": "A policy for employee vacation requests"
      },
      {
        "id": "D",
        "text": "A plan to restore systems and data after a disruptive event"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is conflict of interest in governance?",
    "options": [
      {
        "id": "A",
        "text": "Two users using the same password"
      },
      {
        "id": "B",
        "text": "A technical error in access control configuration"
      },
      {
        "id": "C",
        "text": "A disagreement between two departments about budget"
      },
      {
        "id": "D",
        "text": "A situation where personal interests may interfere with objective decision‑making"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is vendor risk management?",
    "options": [
      {
        "id": "A",
        "text": "Assessing and managing security risks from external vendors and partners"
      },
      {
        "id": "B",
        "text": "Ignoring third‑party suppliers"
      },
      {
        "id": "C",
        "text": "Only reviewing vendor risk after a breach occurs"
      },
      {
        "id": "D",
        "text": "Requiring vendors to lower their prices"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is security metrics used for?",
    "options": [
      {
        "id": "A",
        "text": "To slow down systems"
      },
      {
        "id": "B",
        "text": "To measure security performance (e.g., number of incidents, patch levels)"
      },
      {
        "id": "C",
        "text": "To design marketing materials"
      },
      {
        "id": "D",
        "text": "To replace the need for audits"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is audit in cyber security?",
    "options": [
      {
        "id": "A",
        "text": "Only fixing things later"
      },
      {
        "id": "B",
        "text": "A one-time software installation"
      },
      {
        "id": "C",
        "text": "A tool that automatically blocks all attacks"
      },
      {
        "id": "D",
        "text": "A systematic review of security controls and processes to check compliance and effectiveness"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the purpose of regulatory reporting after a data breach?",
    "options": [
      {
        "id": "A",
        "text": "To hide the incident"
      },
      {
        "id": "B",
        "text": "To notify regulators within legal timeframes as required by law"
      },
      {
        "id": "C",
        "text": "An optional step organizations can skip"
      },
      {
        "id": "D",
        "text": "A marketing announcement about new products"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data minimization in GDPR?",
    "options": [
      {
        "id": "A",
        "text": "Collecting as much data as possible"
      },
      {
        "id": "B",
        "text": "Storing data indefinitely regardless of need"
      },
      {
        "id": "C",
        "text": "Only collecting the data that is necessary for a specific purpose"
      },
      {
        "id": "D",
        "text": "Sharing data with as many third parties as possible"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is consent in data privacy?",
    "options": [
      {
        "id": "A",
        "text": "Automatic sharing of all data"
      },
      {
        "id": "B",
        "text": "A default setting that cannot be changed"
      },
      {
        "id": "C",
        "text": "Permission given once and valid forever regardless of purpose"
      },
      {
        "id": "D",
        "text": "Clear, informed permission given by the data subject to process their personal data"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data portability under GDPR?",
    "options": [
      {
        "id": "A",
        "text": "The right of individuals to receive their data in a structured, commonly used format"
      },
      {
        "id": "B",
        "text": "Moving data to any device without restriction"
      },
      {
        "id": "C",
        "text": "Deleting data permanently upon request"
      },
      {
        "id": "D",
        "text": "Encrypting data before it is shared"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is right to be forgotten (right to erasure)?",
    "options": [
      {
        "id": "A",
        "text": "Forcing users to remember passwords forever"
      },
      {
        "id": "B",
        "text": "The right to request deletion of personal data under certain conditions"
      },
      {
        "id": "C",
        "text": "A backup requirement for all databases"
      },
      {
        "id": "D",
        "text": "A rule that prevents any data from being deleted"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data subject access request (DSAR)?",
    "options": [
      {
        "id": "A",
        "text": "A way to block user requests"
      },
      {
        "id": "B",
        "text": "A request to reset a forgotten password"
      },
      {
        "id": "C",
        "text": "A technical report on network performance"
      },
      {
        "id": "D",
        "text": "A formal request from an individual to know what data an organization holds about them"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data breach notification?",
    "options": [
      {
        "id": "A",
        "text": "Informing affected individuals and relevant authorities about a breach of personal data"
      },
      {
        "id": "B",
        "text": "Only internal jokes"
      },
      {
        "id": "C",
        "text": "An optional courtesy with no legal requirement"
      },
      {
        "id": "D",
        "text": "A marketing email sent to customers"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data protection impact assessment (DPIA)?",
    "options": [
      {
        "id": "A",
        "text": "A free marketing survey"
      },
      {
        "id": "B",
        "text": "A financial audit of a company's budget"
      },
      {
        "id": "C",
        "text": "A risk analysis for processing activities that may significantly affect individuals' privacy"
      },
      {
        "id": "D",
        "text": "A technical test of network speed"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is security policy?",
    "options": [
      {
        "id": "A",
        "text": "A random idea"
      },
      {
        "id": "B",
        "text": "A piece of antivirus software"
      },
      {
        "id": "C",
        "text": "A single employee's personal opinion on security"
      },
      {
        "id": "D",
        "text": "A formal document defining security rules, responsibilities, and procedures"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is acceptable risk?",
    "options": [
      {
        "id": "A",
        "text": "Any risk that is ignored"
      },
      {
        "id": "B",
        "text": "The total elimination of all risk"
      },
      {
        "id": "C",
        "text": "Risk that has already caused damage"
      },
      {
        "id": "D",
        "text": "The level of risk an organization is willing to accept after treatment"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is residual risk?",
    "options": [
      {
        "id": "A",
        "text": "Risk after all controls are removed"
      },
      {
        "id": "B",
        "text": "Risk that remains after security measures are applied"
      },
      {
        "id": "C",
        "text": "The very first risk identified in an assessment"
      },
      {
        "id": "D",
        "text": "Risk that only affects external parties"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is security culture?",
    "options": [
      {
        "id": "A",
        "text": "Just installing software"
      },
      {
        "id": "B",
        "text": "The shared values, attitudes, and behaviors toward security in an organization"
      },
      {
        "id": "C",
        "text": "A mandatory annual exam for employees"
      },
      {
        "id": "D",
        "text": "The technical architecture of a network"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is third‑party risk assessment?",
    "options": [
      {
        "id": "A",
        "text": "Assuming vendors are always safe"
      },
      {
        "id": "B",
        "text": "Evaluating the security practices of suppliers and partners before allowing access"
      },
      {
        "id": "C",
        "text": "Only assessing vendors after a breach occurs"
      },
      {
        "id": "D",
        "text": "A one-time check performed at contract signing only"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is security baseline?",
    "options": [
      {
        "id": "A",
        "text": "No security requirements"
      },
      {
        "id": "B",
        "text": "A minimum set of security controls that all systems must meet"
      },
      {
        "id": "C",
        "text": "The maximum security controls physically possible"
      },
      {
        "id": "D",
        "text": "A list of all past security incidents"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main benefit of aligning security with business goals?",
    "options": [
      {
        "id": "A",
        "text": "Slowing down business operations"
      },
      {
        "id": "B",
        "text": "Ensuring security supports, rather than hinders, mission and objectives"
      },
      {
        "id": "C",
        "text": "Making security decisions without business input"
      },
      {
        "id": "D",
        "text": "Prioritizing compliance paperwork over actual protection"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Wi‑Fi security mainly trying to protect against?",
    "options": [
      {
        "id": "A",
        "text": "Unauthorized access and eavesdropping on wireless networks"
      },
      {
        "id": "B",
        "text": "Only slow internet"
      },
      {
        "id": "C",
        "text": "Improving the range of a wireless signal"
      },
      {
        "id": "D",
        "text": "Reducing the cost of internet service"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Which of the following is the strongest current Wi‑Fi security standard?",
    "options": [
      {
        "id": "A",
        "text": "WEP"
      },
      {
        "id": "B",
        "text": "WPA3"
      },
      {
        "id": "C",
        "text": "WPA"
      },
      {
        "id": "D",
        "text": "Open network with no password"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is WPA2?",
    "options": [
      {
        "id": "A",
        "text": "A mobile‑phone brand"
      },
      {
        "id": "B",
        "text": "A type of router hardware"
      },
      {
        "id": "C",
        "text": "A Wi‑Fi security protocol that uses AES encryption for securing traffic"
      },
      {
        "id": "D",
        "text": "A wired Ethernet cable standard"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is WEP considered insecure?",
    "options": [
      {
        "id": "A",
        "text": "It uses strong modern encryption"
      },
      {
        "id": "B",
        "text": "It requires a subscription fee to use"
      },
      {
        "id": "C",
        "text": "It only works on older phone models"
      },
      {
        "id": "D",
        "text": "Its encryption is weak and easy to crack with common tools"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is an evil twin attack in Wi‑Fi?",
    "options": [
      {
        "id": "A",
        "text": "A fake coffee shop"
      },
      {
        "id": "B",
        "text": "A backup Wi-Fi router installed for redundancy"
      },
      {
        "id": "C",
        "text": "A fake Wi‑Fi access point that imitates a legitimate network to steal credentials"
      },
      {
        "id": "D",
        "text": "A type of malware that duplicates files"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is wardriving?",
    "options": [
      {
        "id": "A",
        "text": "Driving around to find and map unsecured or weakly secured Wi‑Fi networks"
      },
      {
        "id": "B",
        "text": "Driving to work"
      },
      {
        "id": "C",
        "text": "A method of physically damaging routers"
      },
      {
        "id": "D",
        "text": "A legal certification for network engineers"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What can help defend against wireless eavesdropping?",
    "options": [
      {
        "id": "A",
        "text": "Using public Wi‑Fi with no password"
      },
      {
        "id": "B",
        "text": "Using WPA2/WPA3 and VPNs for sensitive traffic"
      },
      {
        "id": "C",
        "text": "Broadcasting the network name (SSID) loudly"
      },
      {
        "id": "D",
        "text": "Disabling encryption to improve speed"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Bluetooth pairing security mainly concerned with?",
    "options": [
      {
        "id": "A",
        "text": "Preventing unauthorized devices from connecting or eavesdropping"
      },
      {
        "id": "B",
        "text": "Only file size"
      },
      {
        "id": "C",
        "text": "Increasing the transfer speed of files"
      },
      {
        "id": "D",
        "text": "Reducing battery consumption on the device"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Bluejacking?",
    "options": [
      {
        "id": "A",
        "text": "A harmless PowerPoint feature"
      },
      {
        "id": "B",
        "text": "A harmless joke Bluetooth attack that sends unsolicited messages"
      },
      {
        "id": "C",
        "text": "A type of ransomware that encrypts Bluetooth devices"
      },
      {
        "id": "D",
        "text": "A method of permanently disabling Bluetooth hardware"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is Bluesnarfing?",
    "options": [
      {
        "id": "A",
        "text": "A Bluetooth attack that steals data from a device without authorization"
      },
      {
        "id": "B",
        "text": "A Bluetooth audio‑quality fix"
      },
      {
        "id": "C",
        "text": "A legal way to backup Bluetooth device data"
      },
      {
        "id": "D",
        "text": "A firmware update process for Bluetooth speakers"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is mobile device security trying to achieve?",
    "options": [
      {
        "id": "A",
        "text": "Protecting data, apps, and network access on mobile phones and tablets"
      },
      {
        "id": "B",
        "text": "Only faster games"
      },
      {
        "id": "C",
        "text": "Increasing app download speed"
      },
      {
        "id": "D",
        "text": "Extending battery life on all devices"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is a common mobile security practice?",
    "options": [
      {
        "id": "A",
        "text": "Installing apps from unknown sources with no checks"
      },
      {
        "id": "B",
        "text": "Disabling all app permissions by default"
      },
      {
        "id": "C",
        "text": "Using app stores, screen locks, and device encryption"
      },
      {
        "id": "D",
        "text": "Sharing device passwords with coworkers"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is MDM (Mobile Device Management) used for?",
    "options": [
      {
        "id": "A",
        "text": "Managing and enforcing security policies on corporate mobile devices"
      },
      {
        "id": "B",
        "text": "Deleting all user photos"
      },
      {
        "id": "C",
        "text": "A social media management tool"
      },
      {
        "id": "D",
        "text": "A cloud storage backup service"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is BYOD security mainly concerned with?",
    "options": [
      {
        "id": "A",
        "text": "Ignoring personal devices"
      },
      {
        "id": "B",
        "text": "Protecting corporate data on employees' personal devices"
      },
      {
        "id": "C",
        "text": "Requiring all employees to use only company-owned devices"
      },
      {
        "id": "D",
        "text": "Banning smartphones from the workplace entirely"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is geofencing in mobile security?",
    "options": [
      {
        "id": "A",
        "text": "Blocking GPS on all devices"
      },
      {
        "id": "B",
        "text": "Using location to allow or restrict access based on device proximity to a defined area"
      },
      {
        "id": "C",
        "text": "Encrypting location data permanently"
      },
      {
        "id": "D",
        "text": "A method of physically securing server rooms"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is sandboxing in mobile apps?",
    "options": [
      {
        "id": "A",
        "text": "A children's toy box"
      },
      {
        "id": "B",
        "text": "A backup storage location for deleted files"
      },
      {
        "id": "C",
        "text": "Isolating apps so they cannot easily access other apps' data"
      },
      {
        "id": "D",
        "text": "A testing environment used only before software release"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is app‑permission management important on mobile?",
    "options": [
      {
        "id": "A",
        "text": "To request access to everything by default"
      },
      {
        "id": "B",
        "text": "Allowing apps to update automatically without review"
      },
      {
        "id": "C",
        "text": "Disabling all apps from accessing the internet"
      },
      {
        "id": "D",
        "text": "To limit what data and hardware (camera, location, contacts) apps can access"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is OTA update security on mobile devices?",
    "options": [
      {
        "id": "A",
        "text": "Updating only via USB"
      },
      {
        "id": "B",
        "text": "Allowing any source to push updates without verification"
      },
      {
        "id": "C",
        "text": "Disabling updates entirely for security"
      },
      {
        "id": "D",
        "text": "Ensuring firmware and OS updates are signed and delivered securely over the air"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is lost‑device protection (e.g., remote wipe)?",
    "options": [
      {
        "id": "A",
        "text": "Only blocking calls"
      },
      {
        "id": "B",
        "text": "Preventing the device from ever being turned back on"
      },
      {
        "id": "C",
        "text": "The ability to lock or erase data on a lost or stolen device remotely"
      },
      {
        "id": "D",
        "text": "Automatically backing up data to a public cloud"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is the main risk of open public Wi‑Fi when accessing sensitive apps?",
    "options": [
      {
        "id": "A",
        "text": "Only slower browsing"
      },
      {
        "id": "B",
        "text": "Improved battery life while connected"
      },
      {
        "id": "C",
        "text": "Automatic encryption of all transmitted data"
      },
      {
        "id": "D",
        "text": "Attackers can monitor traffic or perform man‑in‑the‑middle attacks"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is computer ethics in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Only choosing nice‑looking interfaces"
      },
      {
        "id": "B",
        "text": "The technical process of encrypting files"
      },
      {
        "id": "C",
        "text": "A set of legal penalties for hacking"
      },
      {
        "id": "D",
        "text": "Principles that guide responsible and fair use of computers and data"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What does ethical hacking mean?",
    "options": [
      {
        "id": "A",
        "text": "Hacking for fun without permission"
      },
      {
        "id": "B",
        "text": "Illegally accessing systems to prove a point"
      },
      {
        "id": "C",
        "text": "Writing malware for educational purposes only"
      },
      {
        "id": "D",
        "text": "Authorized testing of systems to find and fix security weaknesses"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is penetration testing (pen testing)?",
    "options": [
      {
        "id": "A",
        "text": "Writing only reports"
      },
      {
        "id": "B",
        "text": "Installing antivirus software on all systems"
      },
      {
        "id": "C",
        "text": "Monitoring network traffic passively without testing"
      },
      {
        "id": "D",
        "text": "Simulating attacks on systems with permission to find vulnerabilities"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is essential before performing a penetration test?",
    "options": [
      {
        "id": "A",
        "text": "Jumping in without asking"
      },
      {
        "id": "B",
        "text": "A verbal agreement with no documentation"
      },
      {
        "id": "C",
        "text": "Written authorization (a clear scope and agreement)"
      },
      {
        "id": "D",
        "text": "Approval from any single employee"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is responsibility to report in ethical hacking?",
    "options": [
      {
        "id": "A",
        "text": "Hiding what you found"
      },
      {
        "id": "B",
        "text": "Selling the vulnerability to the highest bidder"
      },
      {
        "id": "C",
        "text": "Informing the organization about discovered vulnerabilities so they can fix them"
      },
      {
        "id": "D",
        "text": "Publishing the vulnerability publicly before notifying the organization"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data privacy in legal context?",
    "options": [
      {
        "id": "A",
        "text": "Only keeping passwords secret"
      },
      {
        "id": "B",
        "text": "A technical firewall configuration"
      },
      {
        "id": "C",
        "text": "A marketing strategy for customer engagement"
      },
      {
        "id": "D",
        "text": "Legal and ethical obligations to protect individuals' personal information"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is GDPR mainly about?",
    "options": [
      {
        "id": "A",
        "text": "Controlling how to design websites"
      },
      {
        "id": "B",
        "text": "Protecting EU citizens' personal data and giving them rights over that data"
      },
      {
        "id": "C",
        "text": "Regulating international shipping of physical goods"
      },
      {
        "id": "D",
        "text": "Setting technical standards for internet speed"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is cybercrime?",
    "options": [
      {
        "id": "A",
        "text": "Any online activity"
      },
      {
        "id": "B",
        "text": "Only crimes committed by governments"
      },
      {
        "id": "C",
        "text": "Illegal acts conducted using computers or networks (e.g., hacking, fraud, data theft)"
      },
      {
        "id": "D",
        "text": "Legal activities that occur over the internet"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is identity theft?",
    "options": [
      {
        "id": "A",
        "text": "Buying someone's identity legally"
      },
      {
        "id": "B",
        "text": "Creating a new identity for a witness protection program"
      },
      {
        "id": "C",
        "text": "Stealing someone's personal information to impersonate them, often for fraud"
      },
      {
        "id": "D",
        "text": "A company rebranding its public image"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is phishing used for legally?",
    "options": [
      {
        "id": "A",
        "text": "A legal way to steal data"
      },
      {
        "id": "B",
        "text": "A regulated marketing technique"
      },
      {
        "id": "C",
        "text": "It is usually not legal; it is a cybercrime when used to deceive and steal"
      },
      {
        "id": "D",
        "text": "An accepted business practice in some countries"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is ransomware as a cybercrime?",
    "options": [
      {
        "id": "A",
        "text": "A legal backup service"
      },
      {
        "id": "B",
        "text": "A type of antivirus software"
      },
      {
        "id": "C",
        "text": "A government-approved data recovery tool"
      },
      {
        "id": "D",
        "text": "Malicious software that encrypts data and demands payment, often illegal"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is intellectual property (IP) protection in cybersecurity?",
    "options": [
      {
        "id": "A",
        "text": "Protecting creative works, code, patents, and trademarks from unauthorized copying"
      },
      {
        "id": "B",
        "text": "Only printing documents"
      },
      {
        "id": "C",
        "text": "Assigning IP addresses to network devices"
      },
      {
        "id": "D",
        "text": "Backing up company financial records"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is copyright infringement online?",
    "options": [
      {
        "id": "A",
        "text": "Sharing licensed content correctly"
      },
      {
        "id": "B",
        "text": "Purchasing a license for software use"
      },
      {
        "id": "C",
        "text": "Creating original content from scratch"
      },
      {
        "id": "D",
        "text": "Unauthorized copying or distribution of copyrighted material (e.g., software, media)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is insider threat?",
    "options": [
      {
        "id": "A",
        "text": "Risk from employees or trusted insiders who misuse access intentionally or negligently"
      },
      {
        "id": "B",
        "text": "Only external hackers"
      },
      {
        "id": "C",
        "text": "A firewall that blocks internal traffic"
      },
      {
        "id": "D",
        "text": "A type of malware that only affects mobile devices"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is acceptable use in an organization's policies?",
    "options": [
      {
        "id": "A",
        "text": "Using company systems for anything"
      },
      {
        "id": "B",
        "text": "A technical control that blocks malware"
      },
      {
        "id": "C",
        "text": "A list of banned websites with no other rules"
      },
      {
        "id": "D",
        "text": "Rules that define what users can and cannot do with IT resources"
      }
    ],
    "correctAnswer": "D",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is whistleblowing?",
    "options": [
      {
        "id": "A",
        "text": "A way to hide wrongdoing"
      },
      {
        "id": "B",
        "text": "Publicly leaking company secrets for personal gain"
      },
      {
        "id": "C",
        "text": "Reporting unethical or illegal activities within an organization through proper channels"
      },
      {
        "id": "D",
        "text": "Ignoring wrongdoing to avoid conflict"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is data sovereignty?",
    "options": [
      {
        "id": "A",
        "text": "Ignoring all laws"
      },
      {
        "id": "B",
        "text": "The right of a company to own all customer data permanently"
      },
      {
        "id": "C",
        "text": "The idea that data is subject to the laws of the country where it is stored"
      },
      {
        "id": "D",
        "text": "A technical protocol for data encryption"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Hard"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is cyber law mainly about?",
    "options": [
      {
        "id": "A",
        "text": "Only designing logos"
      },
      {
        "id": "B",
        "text": "Rules that only apply to government computers"
      },
      {
        "id": "C",
        "text": "Laws governing use of computers, data, and the internet (e.g., hacking, fraud, data breaches)"
      },
      {
        "id": "D",
        "text": "International shipping regulations"
      }
    ],
    "correctAnswer": "C",
    "explanation": "",
    "difficulty": "Easy"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "What is liability in cybersecurity context?",
    "options": [
      {
        "id": "A",
        "text": "Always blaming the users"
      },
      {
        "id": "B",
        "text": "Legal responsibility for harm caused by data breaches or poor security"
      },
      {
        "id": "C",
        "text": "A technical vulnerability in software code"
      },
      {
        "id": "D",
        "text": "A type of insurance policy that eliminates all risk"
      }
    ],
    "correctAnswer": "B",
    "explanation": "",
    "difficulty": "Medium"
  },
  {
    "competencyId": "cyber-security",
    "competencyName": "Cyber Security",
    "question": "Why is ethical behavior important for security professionals?",
    "options": [
      {
        "id": "A",
        "text": "To earn trust, protect users, and avoid misuse of their powerful access and skills"
      },
      {
        "id": "B",
        "text": "Only to look good on paper"
      },
      {
        "id": "C",
        "text": "To increase billing hours on contracts"
      },
      {
        "id": "D",
        "text": "To avoid following organizational policies"
      }
    ],
    "correctAnswer": "A",
    "explanation": "",
    "difficulty": "Hard"
  }
]

async function seed() {
  await connectDB()

  const competencyId = sampleQuestions[0].competencyId

  const deleted = await Question.deleteMany({ competencyId })
  console.log(`🗑️  Purani ${deleted.deletedCount} Cyber Security question(s) hata di gayi (agar thi).`)

  const inserted = await Question.insertMany(sampleQuestions)
  console.log(`✅ ${inserted.length} Cyber Security MCQs successfully seed ho gaye.`)

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
