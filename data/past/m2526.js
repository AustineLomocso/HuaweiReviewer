HR.registerMock({
 "id": "m2526",
 "questions": [
  {
   "id": "m2526-01",
   "type": "single",
   "stem": "Which of the following statements about Elastic Cloud Server (ECS) is false?",
   "options": [
    {
     "key": "A",
     "text": "An ECS can have multiple network interfaces bound and multiple IP addresses configured."
    },
    {
     "key": "B",
     "text": "You can view ECS resource details on the management console."
    },
    {
     "key": "C",
     "text": "You can use the original image or a new image to reinstall the OS of an ECS."
    },
    {
     "key": "D",
     "text": "You can create, delete, start, and stop an ECS, reinstall the OS, and reset the password for logging in to an ECS."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Only the original image of the ECS can be used to reinstall the OS; using a different image is done by changing the OS. The other statements about network interfaces, console viewing and lifecycle operations are correct.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     79
    ]
   },
   "sectionId": "cloud-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-02",
   "type": "single",
   "stem": "Both security groups and network ACLs can control network access. Which of the following statements about security groups and network ACLs is false?",
   "options": [
    {
     "key": "A",
     "text": "The rules of the default security group allow all outgoing data packets and deny all incoming data packets."
    },
    {
     "key": "B",
     "text": "Security groups support packet filtering based on a 3-tuple, but network ACLs support packet filtering based on a 5-tuple."
    },
    {
     "key": "C",
     "text": "If cloud servers are running in different Virtual Private Clouds (VPCs), but are associated with the same security group, they can communicate with each other by default."
    },
    {
     "key": "D",
     "text": "A network ACL is an optional layer of security for subnets. After users associate one or more subnets with a network ACL, they can control traffic in and out of the subnets."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "ECSs in different VPCs cannot communicate by default even if they share a security group; a VPC peering connection is needed. Security groups only take effect for ECSs within the same VPC.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     144,
     151
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-03",
   "type": "single",
   "stem": "Auto Scaling (AS) can use different scaling policies to automatically adjust the number of Elastic Cloud Server (ECSs) and bandwidth sizes. Which of the following is not a scaling policy supported by AS?",
   "options": [
    {
     "key": "A",
     "text": "Periodic policy"
    },
    {
     "key": "B",
     "text": "Scheduled policy"
    },
    {
     "key": "C",
     "text": "Alarm policy"
    },
    {
     "key": "D",
     "text": "Manual adjustment"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "AS supports alarm-based, scheduled and periodic scaling policies. Manual adjustment is not one of the scaling policy types.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     99,
     100
    ]
   },
   "sectionId": "cloud-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "AS groups can also be adjusted manually, but the slides list only alarm, scheduled and periodic as policy types."
  },
  {
   "id": "m2526-04",
   "type": "single",
   "stem": "Which of the following statements about private IP addresses is false?",
   "options": [
    {
     "key": "A",
     "text": "An Elastic Cloud Server (ECS) can have both private and virtual IP addresses, and users can access the ECS through either IP address."
    },
    {
     "key": "B",
     "text": "If a virtual IP address is bound to an ECS and a user wants to bind the IP address to another ECS, the user needs to unbind the virtual IP address first."
    },
    {
     "key": "C",
     "text": "Two ECSs can have the same virtual IP address bound."
    },
    {
     "key": "D",
     "text": "A virtual IP address can be used for active/standby ECS switchover to eliminate a single point of failure."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "A virtual IP address can be shared among multiple ECSs, so it can be bound to another ECS without unbinding it first. This sharing is what makes active/standby switchover possible.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     146
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The statement that two ECSs can have the same virtual IP bound is true according to the PDF; the 'must unbind first' statement is the false one."
  },
  {
   "id": "m2526-05",
   "type": "single",
   "stem": "Which is not a use case of Huawei Cloud Content Delivery Network (CDN)?",
   "options": [
    {
     "key": "A",
     "text": "Content moderation: CDN uses image, text, and video detection to identify pornography, advertisements, materials related to terrorism, and sensitive political information. This reduces potential business risks."
    },
    {
     "key": "B",
     "text": "Whole site acceleration: CDN suits websites with both dynamic and static content or with many dynamic content requests. It bypasses congested routes for faster dynamic page loading and improves the access success rate."
    },
    {
     "key": "C",
     "text": "On-demand service acceleration: CDN provides fast, stable, and secure acceleration for your on-demand audiovisual services, such as online education and video sharing."
    },
    {
     "key": "D",
     "text": "Download acceleration: CDN is suitable for apps or websites with large files to download, such as game or app installation packages. CDN provides stable and high-availability acceleration to shorten the download duration, improving conversion rates."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "CDN caches content on edge nodes to accelerate websites, downloads and on-demand video. Content moderation (image, text and video detection) is not a CDN use case.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     382,
     384
    ]
   },
   "sectionId": "cloud-6-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-06",
   "type": "single",
   "stem": "Log Tank Service (LTS) allows transferring logs to other cloud services for long-term storage. Which of the following services is not a transfer destination?",
   "options": [
    {
     "key": "A",
     "text": "GaussDB(DWS)"
    },
    {
     "key": "B",
     "text": "Scalable File Service (SFS)"
    },
    {
     "key": "C",
     "text": "Object Storage Service (OBS)"
    },
    {
     "key": "D",
     "text": "Distributed Message Service (DMS) for Kafka"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "The slides list OBS, DIS and DMS as log transfer destinations; file storage such as SFS is not a destination.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     304,
     312
    ]
   },
   "sectionId": "cloud-5-5",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The PDF does not list GaussDB(DWS) either, so the choice between DWS and SFS rests on outside knowledge that DWS is a supported destination."
  },
  {
   "id": "m2526-07",
   "type": "single",
   "stem": "Compared with traditional file storage, Scalable File Service (SFS) has many advantages. Which of the following is not an advantage of SFS?",
   "options": [
    {
     "key": "A",
     "text": "Fast and elastic scaling"
    },
    {
     "key": "B",
     "text": "Ease of use and low costs"
    },
    {
     "key": "C",
     "text": "Definitely larger storage space than traditional file storage"
    },
    {
     "key": "D",
     "text": "High performance and reliability"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "SFS advantages are elastic scaling, high performance and reliability, easy operation with low cost, NFS integration and file sharing. It does not guarantee more storage space than traditional file storage.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     248
    ]
   },
   "sectionId": "cloud-4-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-08",
   "type": "single",
   "stem": "Which of the following database engines is supported by MySQL 5.6 and later?",
   "options": [
    {
     "key": "A",
     "text": "MyISAM"
    },
    {
     "key": "B",
     "text": "InnoDB"
    },
    {
     "key": "C",
     "text": "FEDERATED"
    },
    {
     "key": "D",
     "text": "Memory"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "InnoDB is the transactional default storage engine of RDS for MySQL and is the engine supported across 5.6 and later versions. The other engines are not supported across all of these versions or are restricted on the managed service.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-09",
   "type": "single",
   "stem": "Which of the following can be used to enable communications between two Virtual Private Clouds (VPCs) in the same region by using private IP addresses?",
   "options": [
    {
     "key": "A",
     "text": "A security group"
    },
    {
     "key": "B",
     "text": "An ACL"
    },
    {
     "key": "C",
     "text": "A layer 2 connection gateway"
    },
    {
     "key": "D",
     "text": "A VPC peering connection"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "A VPC peering connection links two VPCs in the same region so that traffic is routed between them over private IP addresses. Security groups and ACLs only filter traffic and do not connect networks.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     136,
     145
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-10",
   "type": "single",
   "stem": "An enterprise sensitive to costs wants to build a hybrid cloud to run core workloads in its on-premises data center and to run some new workloads on Huawei Cloud. Which of the following networking services is a preferred choice for the enterprise to securely connect its on-premises data center to Huawei Cloud?",
   "options": [
    {
     "key": "A",
     "text": "Direct Connect"
    },
    {
     "key": "B",
     "text": "Cloud Connect"
    },
    {
     "key": "C",
     "text": "VPC peering"
    },
    {
     "key": "D",
     "text": "Virtual Private Network (VPN)"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "A VPN uses IPsec over the Internet, costs less than a private line and is quick to provision, so it suits a cost-sensitive enterprise that needs a secure hybrid link. Direct Connect gives a dedicated line but costs more and takes longer to deploy.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     178,
     203
    ]
   },
   "sectionId": "cloud-3-4",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-11",
   "type": "single",
   "stem": "A tenant deploys services that need to access the Internet on multiple Elastic Cloud Servers (ECSs). Which of the following actions can be recommended to reduce public network bandwidth costs?",
   "options": [
    {
     "key": "A",
     "text": "Use bandwidth add-on packages."
    },
    {
     "key": "B",
     "text": "Use NAT Gateway to allow multiple cloud servers to share an EIP."
    },
    {
     "key": "C",
     "text": "Use enhanced 95th percentile bandwidth billing."
    },
    {
     "key": "D",
     "text": "Bind a pay-per-use EIP billed by bandwidth to each ECS."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "With a NAT gateway and SNAT rules, many servers share one EIP to reach the Internet, so only one EIP and one bandwidth are paid for. Giving every ECS its own bandwidth-billed EIP is the costly approach.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     159
    ]
   },
   "sectionId": "cloud-3-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "Shared bandwidth, the usual answer to the sibling question, is not offered here; the NAT gateway sharing one EIP is the best fit, though enhanced 95th percentile billing is a plausible rival.",
   "secondarySectionIds": [
    "cloud-3-5"
   ],
   "mappingEvidence": [
    {
     "sectionId": "cloud-3-2",
     "source": {
      "kind": "material",
      "pdf": "cloud",
      "pages": [
       159
      ]
     },
     "reason": "An EIP-bound NAT gateway lets several servers share an EIP for outbound Internet access."
    },
    {
     "sectionId": "cloud-3-5",
     "source": {
      "kind": "material",
      "pdf": "cloud",
      "pages": [
       192
      ]
     },
     "reason": "The NAT gateway lesson explicitly describes public NAT and SNAT sharing an EIP across servers."
    }
   ]
  },
  {
   "id": "m2526-12",
   "type": "single",
   "stem": "Which of the following correctly describes how to use Elastic Volume Service (EVS) disks?",
   "options": [
    {
     "key": "A",
     "text": "1. Select a disk type, enter a capacity, and buy the disk. 2. Configure disk auto mount at system startup. 3. Attach the disk to a specified ECS. 4. Log in to the ECS and initialize the disk."
    },
    {
     "key": "B",
     "text": "1. Select a disk type, enter a capacity, and buy the disk. 2. Log in to the ECS and initialize the disk. 3. Attach the disk to a specified ECS. 4. Configure disk auto mount at system startup."
    },
    {
     "key": "C",
     "text": "1. Attach the disk to a specified ECS. 2. Select a disk type, enter a capacity, and buy the disk. 3. Log in to the ECS and initialize the disk. 4. Configure disk auto mount at system startup."
    },
    {
     "key": "D",
     "text": "1. Select a disk type, enter a capacity, and buy the disk. 2. Attach the disk to a specified Elastic Cloud Server (ECS). 3. Log in to the ECS and initialize the disk. 4. Configure disk auto mount at system startup."
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "A disk is first purchased, then attached to an ECS, then initialized from inside the ECS (partition, format), and finally set to auto mount at startup so the mount persists across reboots. Attaching must precede initialization, and the disk must be bought before anything else.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-4-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-13",
   "type": "single",
   "stem": "A company that plans to deploy its systems on the cloud develops applications on its own and uses multiple middleware services on the cloud, with no need to pay attention to the underlying hardware and OS. Which of the following service models provided by the cloud service vendor was used by the company?",
   "options": [
    {
     "key": "A",
     "text": "DaaS"
    },
    {
     "key": "B",
     "text": "PaaS"
    },
    {
     "key": "C",
     "text": "SaaS"
    },
    {
     "key": "D",
     "text": "IaaS"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "With PaaS the vendor supplies the OS, database, middleware and runtime, and the customer only develops and deploys its own applications. IaaS would require managing the OS and middleware, while SaaS delivers finished software and DaaS is a desktop service.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     17,
     18
    ]
   },
   "sectionId": "cloud-1-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-14",
   "type": "single",
   "stem": "Which of the following technologies can enable communications among VMs on the same network but in different data centers?",
   "options": [
    {
     "key": "A",
     "text": "VXLAN"
    },
    {
     "key": "B",
     "text": "VLAN"
    },
    {
     "key": "C",
     "text": "OpenStack"
    },
    {
     "key": "D",
     "text": "NAS"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "VXLAN is an overlay technology that tunnels Layer 2 traffic over a Layer 3 network, so VMs on the same virtual network can communicate across data centers. VLAN is limited to a single Layer 2 domain, while OpenStack and NAS are not network-virtualization protocols.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-15",
   "type": "single",
   "stem": "Which of the following statements about Elastic Volume Service (EVS) device types is true?",
   "options": [
    {
     "key": "A",
     "text": "Bare Metal Servers (BMSs) support SCSI EVS disks."
    },
    {
     "key": "B",
     "text": "A cloud server does not need any SCSI driver before it can use SCSI EVS disks."
    },
    {
     "key": "C",
     "text": "You can change the device type of your disk after purchase."
    },
    {
     "key": "D",
     "text": "SCSI EVS disks do not support transparent SCSI command transmission."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "BMSs attach SCSI-type EVS disks, whereas the disk device type is fixed at purchase and cannot be changed afterwards. SCSI disks do support transparent SCSI command transmission, and the guest needs SCSI support to use them.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-4-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The slides (p.222) confirm that the device type cannot be changed and that SCSI disks support transparent SCSI commands, which rules out the other options, but they never state that BMSs use SCSI disks; that comes from general Huawei Cloud knowledge."
  },
  {
   "id": "m2526-16",
   "type": "single",
   "stem": "Which of the following is not a sequence labeling task?",
   "options": [
    {
     "key": "A",
     "text": "Part-of-speech tagging"
    },
    {
     "key": "B",
     "text": "Named entity recognition"
    },
    {
     "key": "C",
     "text": "Tokenization"
    },
    {
     "key": "D",
     "text": "Image generation"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Part-of-speech tagging, named entity recognition and tokenization (word segmentation) all assign a label to each element of an input sequence. Image generation produces new content and is not a sequence labeling task.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-17",
   "type": "single",
   "stem": "Which of the following is the order of tensor [[0,1],[2,3],[4,5]]?",
   "options": [
    {
     "key": "A",
     "text": "6"
    },
    {
     "key": "B",
     "text": "3"
    },
    {
     "key": "C",
     "text": "4"
    },
    {
     "key": "D",
     "text": "2"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "The tensor order is the number of dimensions. This nested list is a 3x2 matrix, so it is a 2nd-order tensor.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-18",
   "type": "single",
   "stem": "Which of the following is not improved based on ReLU activation?",
   "options": [
    {
     "key": "A",
     "text": "GELU"
    },
    {
     "key": "B",
     "text": "Softmax"
    },
    {
     "key": "C",
     "text": "Leaky ReLU"
    },
    {
     "key": "D",
     "text": "Swish"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Leaky ReLU, GELU and Swish are variants designed to fix ReLU's dead-neuron or smoothness issues. Softmax is a different function that turns a vector into a probability distribution and is used at the output layer for multiclass tasks.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     88,
     89
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-19",
   "type": "single",
   "stem": "Which of the following statements about model validity is false?",
   "options": [
    {
     "key": "A",
     "text": "Model capacity is its ability to fit diverse functions."
    },
    {
     "key": "B",
     "text": "Deviation measures how far the model's predictions vary from the average."
    },
    {
     "key": "C",
     "text": "The goal of machine learning is to build models that generalize well."
    },
    {
     "key": "D",
     "text": "Insufficient model complexity can lead to underfitting."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Deviation (bias) measures how far the model's average prediction is from the true value; how much predictions vary around their average is variance. The other statements about capacity, generalization and underfitting are correct.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-20",
   "type": "single",
   "stem": "Which of the following statements about feedforward neural networks is false?",
   "options": [
    {
     "key": "A",
     "text": "In a feedforward neural network, the input node does not perform calculations."
    },
    {
     "key": "B",
     "text": "A feedforward neural network can be represented by a directed acyclic graph."
    },
    {
     "key": "C",
     "text": "A feedforward neural network can be used for both classification and regression tasks."
    },
    {
     "key": "D",
     "text": "Data moves through a feedforward neural network from the input layer to the output layer."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Each statement describes a standard property of feedforward networks: unidirectional flow from input to output, a directed acyclic graph structure, and use for both classification and regression. The statement that input nodes do not compute is the weakest, since the course material only describes weighted sums and activations in neurons receiving upstream input.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "All four statements read as true under the textbook definition, so this is a low-confidence best guess; the slides (p.107) do not settle which option the exam treats as false."
  },
  {
   "id": "m2526-21",
   "type": "single",
   "stem": "Which of the following is not an AI framework?",
   "options": [
    {
     "key": "A",
     "text": "PaddlePaddle"
    },
    {
     "key": "B",
     "text": "PyTorch"
    },
    {
     "key": "C",
     "text": "Chroma"
    },
    {
     "key": "D",
     "text": "MindSpore"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "PaddlePaddle, PyTorch and MindSpore are deep learning frameworks. Chroma is an open-source vector database used in RAG to store embeddings.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     352
    ]
   },
   "sectionId": "ai-6-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-22",
   "type": "single",
   "stem": "Which of the following functions in Keras can be called to evaluate a trained model?",
   "options": [
    {
     "key": "A",
     "text": "model.compile()"
    },
    {
     "key": "B",
     "text": "model.evaluate()"
    },
    {
     "key": "C",
     "text": "model.setup()"
    },
    {
     "key": "D",
     "text": "model.configure()"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "In Keras, model.evaluate() computes the loss and metrics of a trained model on test data. model.compile() configures training, and setup() and configure() are not Keras model methods.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-23",
   "type": "single",
   "stem": "Which of the following is not a parameter of mindspore.nn.Conv2d?",
   "options": [
    {
     "key": "A",
     "text": "output_size"
    },
    {
     "key": "B",
     "text": "in_channels"
    },
    {
     "key": "C",
     "text": "kernel_size"
    },
    {
     "key": "D",
     "text": "strides"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "nn.Conv2d takes in_channels, out_channels, kernel_size and stride, among others, and there is no output_size argument because the output size follows from the other parameters.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The real MindSpore argument is named 'stride' (singular), so 'strides' is not a Conv2d parameter either; output_size is chosen as the intended answer."
  },
  {
   "id": "m2526-24",
   "type": "single",
   "stem": "Which of the following is not a value of the \"pad_mode\" parameter of the nn.MaxPool2d function in MindSpore?",
   "options": [
    {
     "key": "A",
     "text": "same"
    },
    {
     "key": "B",
     "text": "pad"
    },
    {
     "key": "C",
     "text": "construct"
    },
    {
     "key": "D",
     "text": "valid"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "nn.MaxPool2d accepts pad_mode values 'same' and 'valid'. 'construct' is the name of the method that defines a Cell's forward computation, not a padding mode.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "'pad' is a pad_mode for Conv2d but not for MaxPool2d, so it is also invalid strictly speaking; 'construct' is the clearly wrong option and is taken as intended."
  },
  {
   "id": "m2526-25",
   "type": "single",
   "stem": "Which of the following functions in MindSpore is used to build the dropout layer?",
   "options": [
    {
     "key": "A",
     "text": "DropoutFunction()"
    },
    {
     "key": "B",
     "text": "DropoutLayered()"
    },
    {
     "key": "C",
     "text": "Dropout()"
    },
    {
     "key": "D",
     "text": "DropoutLayer()"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "MindSpore builds a dropout layer with nn.Dropout(). The other names do not exist in mindspore.nn.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-26",
   "type": "multi",
   "stem": "Which of the following can be used to connect an on-premises data center to a Huawei Cloud Virtual Private Cloud (VPC)?",
   "options": [
    {
     "key": "A",
     "text": "VPC Endpoint"
    },
    {
     "key": "B",
     "text": "Virtual Private Network (VPN)"
    },
    {
     "key": "C",
     "text": "Direct Connect"
    },
    {
     "key": "D",
     "text": "A VPC peering connection"
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "VPN gives an IPsec-encrypted tunnel over the Internet and Direct Connect gives a dedicated channel, and both link an on-premises data center to a VPC. A VPC peering connection links two VPCs, and VPC Endpoint gives access to cloud and private services.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     133,
     176
    ]
   },
   "sectionId": "cloud-3-4",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-27",
   "type": "multi",
   "stem": "Which of the following statements about regions and AZs in Huawei Cloud are true?",
   "options": [
    {
     "key": "A",
     "text": "A region is a logical concept corresponding to a specific service scope. Networks in different regions are logically isolated."
    },
    {
     "key": "B",
     "text": "AZs in different regions can communicate with each other by default. When authorized, an AZ can be independently accessed for easier interaction among services."
    },
    {
     "key": "C",
     "text": "Public services, such as elastic computing, block storage, object storage, VPC, elastic IP (EIP), and image, are shared within a region."
    },
    {
     "key": "D",
     "text": "An AZ contains one or more physical data centers, and can have independent cooling, fire extinguisher, moisture prevention, and electricity facilities."
    }
   ],
   "answer": [
    "A",
    "C",
    "D"
   ],
   "explanation": "Regions are geographically divided with isolated intranets, public services such as ECS, EVS, OBS, VPC, EIP and IMS are shared within a region, and an AZ has one or more data centers with independent cooling, fire, moisture and power facilities. The claim that AZs in different regions communicate by default is wrong, since intranets in different regions are not connected.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     67,
     69,
     70
    ]
   },
   "sectionId": "cloud-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The slides describe a region as a geographic division rather than a 'logical concept', but the isolation point matches, so this option is counted as true."
  },
  {
   "id": "m2526-28",
   "type": "multi",
   "stem": "Which of the following are the three typical service models of public cloud?",
   "options": [
    {
     "key": "A",
     "text": "ZaaS"
    },
    {
     "key": "B",
     "text": "IaaS"
    },
    {
     "key": "C",
     "text": "SaaS"
    },
    {
     "key": "D",
     "text": "PaaS"
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "The three typical public cloud service models are IaaS, PaaS and SaaS. ZaaS is not a standard service model.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     15,
     18
    ]
   },
   "sectionId": "cloud-1-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-29",
   "type": "multi",
   "stem": "For the design of a cloud data center project, which of the following are key factors that must be evaluated by IT architects?",
   "options": [
    {
     "key": "A",
     "text": "Scalability"
    },
    {
     "key": "B",
     "text": "Security"
    },
    {
     "key": "C",
     "text": "High performance"
    },
    {
     "key": "D",
     "text": "Reliability"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "An IT architect designing a cloud data center must evaluate reliability (redundancy and uptime), performance, scalability for growth, and security. All four are core design considerations.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-3-1",
   "mergedInto": "m2425-39"
  },
  {
   "id": "m2526-30",
   "type": "multi",
   "stem": "Which of the following are key features of cloud computing?",
   "options": [
    {
     "key": "A",
     "text": "Resource pooling"
    },
    {
     "key": "B",
     "text": "Metered services"
    },
    {
     "key": "C",
     "text": "On-demand and self-service usability"
    },
    {
     "key": "D",
     "text": "Ubiquitous network access"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "The course lists on-demand self-service, broad (ubiquitous) network access, resource pooling, quick deployment and auto scaling, and measured service as key features of cloud computing. All four options match these.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     8
    ]
   },
   "sectionId": "cloud-1-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-31",
   "type": "multi",
   "stem": "Web Application Firewall (WAF) can effectively protect against various types of cyberattacks. Which of the following attack types it can protect against?",
   "options": [
    {
     "key": "A",
     "text": "DDoS attacks"
    },
    {
     "key": "B",
     "text": "SQL injection"
    },
    {
     "key": "C",
     "text": "XSS attacks"
    },
    {
     "key": "D",
     "text": "CC attacks"
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "WAF detects and blocks web-layer attacks such as SQL injection and XSS and can rate-limit to defend against CC attacks. Volumetric DDoS attacks are handled by the separate Anti-DDoS service, not WAF.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     364,
     372,
     374
    ]
   },
   "sectionId": "cloud-6-2",
   "mergedInto": "m2425-34"
  },
  {
   "id": "m2526-32",
   "type": "multi",
   "stem": "Which of the following Huawei Cloud services are network security services?",
   "options": [
    {
     "key": "A",
     "text": "AAD"
    },
    {
     "key": "B",
     "text": "Security group"
    },
    {
     "key": "C",
     "text": "Cloud Firewall (CFW)"
    },
    {
     "key": "D",
     "text": "Host Security Service (HSS)"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "Advanced Anti-DDoS and Cloud Firewall belong to the network security group of services, and security groups protect ECSs by filtering network traffic. HSS protects the host itself and belongs to compute security.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     136,
     364
    ]
   },
   "sectionId": "cloud-6-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "A security group is a VPC feature rather than a standalone security service, so some may not count it; it is included because it controls network access."
  },
  {
   "id": "m2526-33",
   "type": "multi",
   "stem": "Virtual Private Clouds (VPCs) can provide isolated networks for flexible resource deployment. Which of the following statements about the core advantages of VPCs are true?",
   "options": [
    {
     "key": "A",
     "text": "High-speed access"
    },
    {
     "key": "B",
     "text": "Flexible configuration"
    },
    {
     "key": "C",
     "text": "Security and reliability"
    },
    {
     "key": "D",
     "text": "Interconnection"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "The VPC advantages are secure and reliable (logical isolation, ACLs and security groups), flexible configuration, high-speed access through dynamic BGP, and seamless interconnectivity. All four options match.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     136
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-34",
   "type": "multi",
   "stem": "In an enterprise application architecture, Elastic Load Balance (ELB) can effectively improve the availability and scalability of service systems. Which of the following are the typical applications of ELB in web services, microservice architecture, and cross-AZ DR?",
   "options": [
    {
     "key": "A",
     "text": "Cross-AZ load balancing"
    },
    {
     "key": "B",
     "text": "Heavy-traffic applications"
    },
    {
     "key": "C",
     "text": "SPOF elimination"
    },
    {
     "key": "D",
     "text": "Applications with predictable peaks and troughs in traffic"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "ELB is applied to heavy-traffic applications, to applications with predictable peaks and troughs together with AS, and to eliminate single points of failure through health checks. It also routes traffic to healthy servers in other AZs for cross-AZ high availability.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     161,
     162,
     172,
     173,
     174
    ]
   },
   "sectionId": "cloud-3-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-35",
   "type": "multi",
   "stem": "Which of the following mainstream database protocols and APIs are compatible with Huawei Cloud GeminiDB?",
   "options": [
    {
     "key": "A",
     "text": "MySQL"
    },
    {
     "key": "B",
     "text": "Cassandra"
    },
    {
     "key": "C",
     "text": "MongoDB"
    },
    {
     "key": "D",
     "text": "SQL Server"
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "GeminiDB offers compatible APIs such as GeminiDB Cassandra and GeminiDB MongoDB, along with Redis and InfluxDB. MySQL and SQL Server compatibility belongs to relational services such as RDS, not GeminiDB.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     337
    ]
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-36",
   "type": "multi",
   "stem": "During digital transformation, the selection of network service resources impacts the stability, security, and scalability of business systems. Faced with complex networking requirements, companies need to consider key factors such as performance, cost, security compliance, and multi-cloud collaboration. Which of the following are indicators for selecting network service resources?",
   "options": [
    {
     "key": "A",
     "text": "Network traffic"
    },
    {
     "key": "B",
     "text": "Throughput"
    },
    {
     "key": "C",
     "text": "Network latency"
    },
    {
     "key": "D",
     "text": "Bandwidth requirement"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "Network traffic, throughput, latency and bandwidth requirements are all quantitative factors that determine which network service and specification fit a workload.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-3-6",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The slides do not define a list of selection indicators; all four options are treated as valid performance indicators."
  },
  {
   "id": "m2526-37",
   "type": "multi",
   "stem": "In an enterprise IT architecture, private images are important for core service systems. A private image can contain a custom operating system, pre-installed enterprise applications (such as databases and middleware), and service software. When an enterprise needs to quickly migrate existing service environments to the cloud or deploy cloud servers with the same configuration in batches, which of the following can be used to create private images?",
   "options": [
    {
     "key": "A",
     "text": "Bare metal server (BMS)"
    },
    {
     "key": "B",
     "text": "Elastic Cloud Server (ECS)"
    },
    {
     "key": "C",
     "text": "ISO file"
    },
    {
     "key": "D",
     "text": "Image file"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "A private image can be created from an ECS, from a BMS (system disk image), from an ISO file, or from an external image file that is imported.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     86,
     89,
     90
    ]
   },
   "sectionId": "cloud-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-38",
   "type": "multi",
   "stem": "Which of the following functions can be used as the activation function in a deep learning neural network?",
   "options": [
    {
     "key": "A",
     "text": "Identity"
    },
    {
     "key": "B",
     "text": "Softplus"
    },
    {
     "key": "C",
     "text": "Softsign"
    },
    {
     "key": "D",
     "text": "Sigmoid"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "Identity (linear output), Softplus (a smooth ReLU), Softsign and Sigmoid are all valid activation functions; the material explicitly covers Sigmoid, Tanh, Softsign and ReLU, and the other two are standard in the same family.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The material only shows Sigmoid and Softsign (pages 86-87); Identity and Softplus are answered from general knowledge."
  },
  {
   "id": "m2526-39",
   "type": "multi",
   "stem": "In a deep learning neural network, which of the following need to be considered when designing an activation function?",
   "options": [
    {
     "key": "A",
     "text": "Computing efficiency"
    },
    {
     "key": "B",
     "text": "Differentiability"
    },
    {
     "key": "C",
     "text": "Nonlinearity"
    },
    {
     "key": "D",
     "text": "Saturation"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "An activation function must add non-linearity, be differentiable for backpropagation, and its saturation behavior affects vanishing gradients. The cost of computing it and its derivative also matters, as with the time-consuming power operation in sigmoid.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     84,
     86,
     87
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": "m2425-42"
  },
  {
   "id": "m2526-40",
   "type": "multi",
   "stem": "The decision tree algorithm selects the purest attribute to split a dataset. Which of the following are used as the quantitative metric to measure the purity?",
   "options": [
    {
     "key": "A",
     "text": "Classification And Regression Tree (CART)"
    },
    {
     "key": "B",
     "text": "Gini coefficient"
    },
    {
     "key": "C",
     "text": "Information gain ratio"
    },
    {
     "key": "D",
     "text": "Information gain"
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "Gini coefficient, information gain and information gain ratio are the quantitative impurity/purity measures used to choose splits. CART is a decision tree algorithm (which happens to use Gini), not a purity metric.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-41",
   "type": "multi",
   "stem": "Which of the following statements about LSTM and GRU are true?",
   "options": [
    {
     "key": "A",
     "text": "GRU combines the forget and input gates into a single update gate, which is simpler in structure."
    },
    {
     "key": "B",
     "text": "GRU has higher computing efficiency."
    },
    {
     "key": "C",
     "text": "Both LSTM and GRU can effectively alleviate the vanishing gradient problem."
    },
    {
     "key": "D",
     "text": "The number of gates of LSTM is greater than that of GRU."
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "GRU merges the forget and input gates into one update gate, so it has fewer gates (two versus LSTM's three) and fewer parameters, making it simpler and faster to compute. Both use gating to mitigate vanishing gradients in long sequences.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-42",
   "type": "multi",
   "stem": "In deep neural networks, which of the following are used to avoid overfitting?",
   "options": [
    {
     "key": "A",
     "text": "Adding network layers"
    },
    {
     "key": "B",
     "text": "Increasing the training set size"
    },
    {
     "key": "C",
     "text": "Early stopping"
    },
    {
     "key": "D",
     "text": "Adding constraints to parameters"
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "Common anti-overfitting techniques are constraining parameters (L1/L2 norms), extending the training set, dropout and early stopping. Adding more layers increases model capacity and makes overfitting more likely, not less.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     100
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "secondarySectionIds": [
    "beyond-2-1",
    "fundamentals1-3-2"
   ],
   "mappingEvidence": [
    {
     "sectionId": "ai-2-1",
     "source": {
      "pdf": "ai",
      "pages": [
       100
      ]
     },
     "reason": "The primary neural-network lesson covers regularization and overfitting risks."
    },
    {
     "sectionId": "beyond-2-1",
     "source": {
      "pdf": "ei-developer",
      "pages": [
       10,
       12
      ]
     },
     "reason": "The machine-learning foundations lesson covers training versus test performance and remedies for overfitting."
    },
    {
     "sectionId": "fundamentals1-3-2",
     "source": {
      "pdf": "ai-fundamentals-1",
      "pages": [
       26
      ]
     },
     "reason": "Secondary introductory context: the connectionism lesson names overfitting as a neural-learning limitation; the detailed definition and remedies are supplied by the primary and machine-learning lessons."
    }
   ]
  },
  {
   "id": "m2526-43",
   "type": "multi",
   "stem": "Which of the following statements about gradient descent algorithms are true?",
   "options": [
    {
     "key": "A",
     "text": "Stochastic gradient descent uses only one sample at a time to compute the gradient."
    },
    {
     "key": "B",
     "text": "Mini-batch gradient descent (MBGD) considers both efficiency and gradient stability."
    },
    {
     "key": "C",
     "text": "Gradient descent can always find the global optimal points."
    },
    {
     "key": "D",
     "text": "Global gradient descent uses the entire dataset to compute the gradient in each iteration."
    }
   ],
   "answer": [
    "A",
    "B",
    "D"
   ],
   "explanation": "Stochastic GD updates with one sample, mini-batch GD balances speed and stability, and batch (global) GD uses the whole dataset per iteration. Gradient descent can get stuck in local minima or saddle points, so it does not always reach the global optimum.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     94
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-44",
   "type": "multi",
   "stem": "Which of the following statements about MindFormers are true?",
   "options": [
    {
     "key": "A",
     "text": "MindFormers provides profiling capabilities and integrates with MindInsight for visualized optimization."
    },
    {
     "key": "B",
     "text": "MindFormers provides various high-level API modules to enable flexible development."
    },
    {
     "key": "C",
     "text": "MindFormers includes state-of-the-art model structures and offers module-based development with configurable settings."
    },
    {
     "key": "D",
     "text": "MindFormers provides foundation model pre-training task flows across multiple domains, and it features a unified training process and API design."
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "MindFormers is the MindSpore foundation-model suite: it offers modular, configurable model structures, high-level APIs, unified pre-training/fine-tuning task flows, and profiling with MindInsight visualization.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "MindFormers is not covered in either PDF; answered from general knowledge of the MindSpore suite, with moderate confidence."
  },
  {
   "id": "m2526-45",
   "type": "multi",
   "stem": "Which of the following statements about k-fold cross validation are true?",
   "options": [
    {
     "key": "A",
     "text": "The K value in the K-fold cross-validation is a hyperparameter."
    },
    {
     "key": "B",
     "text": "K-fold cross validation divides a dataset into k subsets."
    },
    {
     "key": "C",
     "text": "Each data subset will serve as a test set."
    },
    {
     "key": "D",
     "text": "K-fold cross-validation is a statistical analysis method used to check the performance of classifiers."
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "K-fold cross validation splits the data into k subsets, uses each in turn as the test/validation fold while training on the rest, and k is a hyperparameter chosen by the user. It is a statistical method for assessing classifier performance.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-46",
   "type": "tf",
   "stem": "A Virtual Private Cloud (VPC) is a virtual network that is isolated and can be interconnected for resources such as cloud servers, containers, and databases, by configuring private CIDR blocks, route tables, subnets, public IP addresses, and security groups.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "A VPC is a logically isolated virtual network for cloud servers, containers and databases, in which you configure subnets, route tables, EIPs/bandwidth and security groups. Different VPCs can be interconnected, for example by peering.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     135,
     136
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-47",
   "type": "tf",
   "stem": "Cloud Trace Service (CTS) logs operations through trackers and events. By default, event data of the past 30 days is retained. Data older than the retention period is automatically archived and dumped to meet long-term audit requirements.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "The material says the trace list shows only the last seven days of operations, not 30. Longer-term retention is done by transferring traces to OBS buckets on a regular basis.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     316,
     318
    ]
   },
   "sectionId": "cloud-5-6",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The question states 30 days but the PDF says traces are retained/queryable for seven days."
  },
  {
   "id": "m2526-48",
   "type": "tf",
   "stem": "Both manual scaling and policy-based automatic scaling are available in Auto Scaling (AS). However, to ensure service reliability, scale-in must be performed manually because automatic adjustment can only be used for scale-out.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "AS policies (alarm-based, scheduled, periodic) automatically add and also remove instances, so scale-in is automatic too. Manual scale-in is not required.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     98,
     99
    ]
   },
   "sectionId": "cloud-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-49",
   "type": "tf",
   "stem": "Newly created IAM users do not have any permissions by default. You can grant permissions by adding IAM users to authorized user groups or assigning policies or roles to user groups or users. Permissions can be classified as policies (refined permissions) and roles (coarse-grained permission sets) based on authorization granularities.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "New IAM users have no permissions until they are added to an authorized user group or given policies or roles. Roles are coarse-grained, job-based permission sets, while policies are fine-grained, per-action permissions.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     281
    ]
   },
   "sectionId": "cloud-5-2",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The pages support the role/policy granularity; the no-permissions-by-default point is general IAM knowledge not stated on those pages."
  },
  {
   "id": "m2526-50",
   "type": "tf",
   "stem": "Cloud Trace Service (CTS) logs operations but does not provide functions such as query, dump, encryption, and notification.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "CTS does provide trace query (last seven days on the console), trace transfer to OBS for long-term storage, trace file encryption with DEW keys, and key event notification through SMN.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     316,
     319
    ]
   },
   "sectionId": "cloud-5-6",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-51",
   "type": "tf",
   "stem": "Auto Scaling (AS) must be used together with Elastic Load Balance (ELB) and Cloud Eye. AS cannot automatically adjust service resources based on scaling policies.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "AS can work alone: it automatically scales ECS instances and bandwidth according to alarm-based, scheduled or periodic policies. ELB and Cloud Eye are optional integrations (ELB for traffic distribution, Cloud Eye for alarm-triggered policies).",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     97,
     99,
     104
    ]
   },
   "sectionId": "cloud-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-52",
   "type": "tf",
   "stem": "In high-concurrency scenarios such as e-commerce promotions and flash sales, if service traffic spikes dramatically, you can set alarm rules for key metrics such as CPU usage on Cloud Eye. If a metric goes beyond its set limit, an alarm is triggered. This helps the O&M team respond quickly to issues.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "Cloud Eye lets you set alarm rules on metrics such as CPU usage and notifies you when thresholds are crossed, helping O&M respond quickly to traffic spikes.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     294,
     295
    ]
   },
   "sectionId": "cloud-5-4",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-53",
   "type": "tf",
   "stem": "Auto Scaling (AS) can effectively handle periodic traffic changes of web applications to ensure service stability and improve resource utilization.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "A scheduled policy fires once at a set time, while a periodic policy repeats at set intervals, so periodic policies fit recurring web traffic patterns. Adding and removing instances as demand changes keeps the service stable and avoids idle resources.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     98,
     99
    ]
   },
   "sectionId": "cloud-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-54",
   "type": "tf",
   "stem": "According to cloud security best practices, you should always adhere to the principle or least privilege when adding security group rules. 0.0.0.0/0 access permission should not be allowed unless absolutely necessary.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "Security group rules should follow least privilege, allowing only the required source IP addresses and ports; opening 0.0.0.0/0 exposes resources to everyone and should be avoided unless truly necessary.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     149
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-55",
   "type": "tf",
   "stem": "When using the MindSpore framework to build a neural network, the model or neural network layer must inherit from the Cell class, which serves as the basic building block of neural networks in MindSpore.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "In MindSpore, neural networks and layers are built by subclassing mindspore.nn.Cell, which is the base class of all network components.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-56",
   "type": "tf",
   "stem": "Activation functions add nonlinearity to neural networks.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "Without activation functions, stacked layers collapse into a single linear transformation; activation functions add the nonlinearity that lets the network model complex functions.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     84,
     85
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-57",
   "type": "tf",
   "stem": "Naive Bayes solves classification tasks using the Bayesian theorem and assumes attribute independence.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "Naive Bayes applies Bayes' theorem for classification with the 'naive' assumption that attributes are conditionally independent given the class.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-58",
   "type": "tf",
   "stem": "A single-layer perceptron can solve the XOR problem.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "A single-layer perceptron is a linear classifier and cannot separate XOR, which is not linearly separable; a multilayer network with a nonlinear activation is required.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ],
   "flag": "The PDF explains that without activation functions multiple layers reduce to a linear model (pages 84-85) but never mentions XOR."
  },
  {
   "id": "m2526-59",
   "type": "tf",
   "stem": "Adding more layers to a neural network increases the risk of vanishing gradients.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "T"
   ],
   "explanation": "Backpropagated derivatives shrink as depth grows, especially with saturating activations such as Sigmoid, Tanh and Softsign, so deeper networks face a higher risk of vanishing gradients.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     87,
     118
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  },
  {
   "id": "m2526-60",
   "type": "tf",
   "stem": "Convolutional neural networks handle image data exclusively.",
   "options": [
    {
     "key": "T",
     "text": "True"
    },
    {
     "key": "F",
     "text": "False"
    }
   ],
   "answer": [
    "F"
   ],
   "explanation": "CNNs are best known for images but are not limited to them; for example, TextCNN is used for text sentiment analysis, and CNNs are also applied to speech and other grid-like data.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     113,
     174
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2025-26"
   ]
  }
 ]
});
