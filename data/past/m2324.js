HR.registerMock({
 "id": "m2324",
 "questions": [
  {
   "id": "m2324-01",
   "type": "single",
   "stem": "GaussDB(DWS) is a distributed data warehouse with analytic and hybrid load capabilities. Which of the following statements about GaussDB(DWS) is false?",
   "options": [
    {
     "key": "A",
     "text": "It supports x86/power/Itanium hardware architecture."
    },
    {
     "key": "B",
     "text": "It supports petabyte-scale data analysis."
    },
    {
     "key": "C",
     "text": "It supports multi-mode analysis and real-time processing."
    },
    {
     "key": "D",
     "text": "It supports Atomicity Consistency Isolation Durability (ACID) of distributed transactions."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "GaussDB(DWS) runs on x86 and Kunpeng (ARM) hardware; Itanium is not a supported architecture. The other statements (PB-scale analysis, hybrid/real-time workloads, distributed ACID transactions) describe the service correctly.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-6-5",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The PDF (p393) confirms PB-level analysis and hybrid workloads but does not list hardware architectures; the answer relies on outside knowledge, and the Itanium wording looks like a transcription oddity."
  },
  {
   "id": "m2324-02",
   "type": "single",
   "stem": "MindSpore provides high-level encapsulation models for automatically building training networks. Which of the following model APIs is used for inference on input data?",
   "options": [
    {
     "key": "A",
     "text": "Train"
    },
    {
     "key": "B",
     "text": "Eval"
    },
    {
     "key": "C",
     "text": "predict"
    },
    {
     "key": "D",
     "text": "fit"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Model.predict is the high-level MindSpore API that runs inference on input data, while train/fit and eval handle training and evaluation.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-03",
   "type": "single",
   "stem": "Adjusting the S component of the Hue Saturation Value (HSV) color space can enhance image saturation, and saturation adjustment is typically achieved by multiplying the original S value by a correction factor. Which of the following statements is true?",
   "options": [
    {
     "key": "A",
     "text": "A correction factor less than 1 will increase saturation, making the colors more vivid."
    },
    {
     "key": "B",
     "text": "A correction factor greater than 1 will decrease saturation, making the image appear dull."
    },
    {
     "key": "C",
     "text": "A correction factor less than 1 will decrease saturation, making the image appear dull."
    },
    {
     "key": "D",
     "text": "The value of the correction factor has no effect on the saturation of the image."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Saturation is scaled by multiplying S by the factor, so a factor below 1 reduces S and makes colors duller, while a factor above 1 makes them more vivid.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-04",
   "type": "single",
   "stem": "Which of the following statements is false about mean filtering?",
   "options": [
    {
     "key": "A",
     "text": "It refers to the filter in which all template weights are 1."
    },
    {
     "key": "B",
     "text": "The maximum value of the neighborhoods of the pixel is used as the output result."
    },
    {
     "key": "C",
     "text": "It smooths images and removes noise."
    },
    {
     "key": "D",
     "text": "It is often used for image blurring."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Mean filtering outputs the average of the neighborhood (all template weights equal), not the maximum; taking the maximum is a max filter. Mean filtering smooths and blurs images and reduces noise.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-05",
   "type": "single",
   "stem": "Which of the following is false about the time windows in Spark Structured Streaming?",
   "options": [
    {
     "key": "A",
     "text": "Structured Streaming supports processing time and event time."
    },
    {
     "key": "B",
     "text": "Structured Streaming does not support watermarking for late data processing."
    },
    {
     "key": "C",
     "text": "The processing time refers to the system time of each machine. When a streaming program uses the processing time, the machine time for running each instance is used."
    },
    {
     "key": "D",
     "text": "The event time refers to the time when an event occurs on a device. The time is embedded before the event enters Structured Streaming, and Structured Streaming can extract this time."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Structured Streaming does support watermarking to handle late data, so the claim that it does not is false. Processing time and event time are both supported as described.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-06",
   "type": "single",
   "stem": "GaussDB is a distributed relational database developed by Huawei. Which of the following statements about GaussDB is false?",
   "options": [
    {
     "key": "A",
     "text": "GaussDB supports distributed transactions and intra-city cross-AZ deployment for zero data loss."
    },
    {
     "key": "B",
     "text": "A GaussDB instance can be deployed in primary/standby or single-node mode."
    },
    {
     "key": "C",
     "text": "GaussDB delivers petabytes of storage, with more than 1,000 nodes supported per DB instance."
    },
    {
     "key": "D",
     "text": "GaussDB uses a shared-nothing architecture."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "The course describes GaussDB as a distributed shared-nothing database with cross-AZ zero-data-loss deployment and 1,000+ nodes per instance; single-node deployment is not part of that description.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     356,
     359
    ]
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The PDF supports the other three statements directly but never mentions primary/standby or single-node modes, so this answer is reached by elimination."
  },
  {
   "id": "m2324-07",
   "type": "single",
   "stem": "Which of the following AI technologies is used for medical image analysis?",
   "options": [
    {
     "key": "A",
     "text": "Computer vision"
    },
    {
     "key": "B",
     "text": "Recommendation system"
    },
    {
     "key": "C",
     "text": "Natural language processing"
    },
    {
     "key": "D",
     "text": "Speech recognition"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Computer vision covers image recognition and classification, including medical image analysis such as chest X-ray datasets.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     173
    ]
   },
   "sectionId": "ai-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-08",
   "type": "single",
   "stem": "Which of the following statements about Virtual Private Cloud (VPC) peering connections is false?",
   "options": [
    {
     "key": "A",
     "text": "VPC peering connections created between VPCs that have overlapping subnet CIDR blocks may not be usable."
    },
    {
     "key": "B",
     "text": "After a VPC peering connection is created, you need to add routes for the local and peer VPCs to enable communications between them."
    },
    {
     "key": "C",
     "text": "A VPC peering connection can be used to connect two VPCs in the same account but in different regions."
    },
    {
     "key": "D",
     "text": "If you create a VPC peering connection to connect two VPC in different accounts, the two VPCs can communicate with each other only after account accepts the connection request."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "A VPC peering connection works only between VPCs in the same region (same or different accounts); peering across regions is not possible.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     145
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-09",
   "type": "single",
   "stem": "Which of the following statements about Object Storage Service (OBS) versioning is false?",
   "options": [
    {
     "key": "A",
     "text": "Versioning only applies to the objects uploaded after it is enabled for a bucket, so in a bucket with versioning enabled, uploading new objects will overwrite any existing objects with the same name."
    },
    {
     "key": "B",
     "text": "A bucket with versioning enabled can keep multiple versions of the same object in it."
    },
    {
     "key": "C",
     "text": "Versioning is not enabled for a newly created OBS bucket by default. In such case, objects newly uploaded to a bucket will overwrite any existing objects with the same name."
    },
    {
     "key": "D",
     "text": "Deleting one version of an object does not affect any other versions of the object."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Versioning applies to the bucket: with it enabled, uploading an object with an existing name stores a new version with a unique version ID instead of overwriting. Overwriting only happens when versioning is disabled, the default for new buckets.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     236
    ]
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-10",
   "type": "single",
   "stem": "Which of the following is the basis of the backpropagation algorithm?",
   "options": [
    {
     "key": "A",
     "text": "Chain rule"
    },
    {
     "key": "B",
     "text": "Computational graph"
    },
    {
     "key": "C",
     "text": "Cost function"
    },
    {
     "key": "D",
     "text": "Linear algebra"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Backpropagation computes gradients layer by layer by applying the chain rule of differentiation from the loss back to the parameters.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-11",
   "type": "single",
   "stem": "Which of the following is not an application scenario of Elasticsearch?",
   "options": [
    {
     "key": "A",
     "text": "Log search and analysis"
    },
    {
     "key": "B",
     "text": "Transaction application"
    },
    {
     "key": "C",
     "text": "Time sequence search"
    },
    {
     "key": "D",
     "text": "Smart search"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Elasticsearch is a search and analytics engine suited to log search, time-series search and smart search, not to transactional (OLTP) applications that need strong ACID transactions.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-12",
   "type": "single",
   "stem": "To remotely log in to Linux and Windows Elastic Cloud Servers (ECSs), which of the two ports, respectively, must be enabled in an inbound rule of the security group?",
   "options": [
    {
     "key": "A",
     "text": "80, 3389"
    },
    {
     "key": "B",
     "text": "22, 3389"
    },
    {
     "key": "C",
     "text": "22, 80"
    },
    {
     "key": "D",
     "text": "443, 8080"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Linux ECSs are logged into with SSH over port 22 and Windows ECSs with RDP over port 3389, so these ports must be allowed in the inbound rules.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-13",
   "type": "single",
   "stem": "Which of the following is not a computer vision application scenario?",
   "options": [
    {
     "key": "A",
     "text": "Semantic segmentation"
    },
    {
     "key": "B",
     "text": "Super-resolution reconstruction"
    },
    {
     "key": "C",
     "text": "Behavior recognition"
    },
    {
     "key": "D",
     "text": "Knowledge graph"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Semantic segmentation, super-resolution and behavior recognition are image/video tasks, whereas a knowledge graph is a structured knowledge representation used in NLP and reasoning rather than a vision task.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-14",
   "type": "single",
   "stem": "Which of the following is a popular loss function used for classification problems?",
   "options": [
    {
     "key": "A",
     "text": "Quadratic loss"
    },
    {
     "key": "B",
     "text": "Mean squared error"
    },
    {
     "key": "C",
     "text": "Absolute error"
    },
    {
     "key": "D",
     "text": "Cross entropy"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Cross entropy is the standard loss function for classification, while quadratic loss, mean squared error and absolute error are typically used for regression.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-15",
   "type": "single",
   "stem": "Which of the following statements about Scalable File Service (SFS) is false?",
   "options": [
    {
     "key": "A",
     "text": "SFS supports both NFS and CIFS protocols."
    },
    {
     "key": "B",
     "text": "SFS supports cross-AZ file sharing."
    },
    {
     "key": "C",
     "text": "Key Management Service (KMS)-based file system encryption is supported."
    },
    {
     "key": "D",
     "text": "File protocols, such as NFSv3 and NFSv4, are supported."
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "The course describes SFS as compatible with NFSv3 (and CIFS for Windows clients), so claiming NFSv4 support is incorrect. Cross-AZ sharing and server-side encryption are supported.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     246,
     247,
     253
    ]
   },
   "sectionId": "cloud-4-3",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-16",
   "type": "single",
   "stem": "Adding more layers to a neural network for deep learning can degrade performance. What causes this?",
   "options": [
    {
     "key": "A",
     "text": "Vanishing gradient"
    },
    {
     "key": "B",
     "text": "Exploding gradient"
    },
    {
     "key": "C",
     "text": "Gradient clipping"
    },
    {
     "key": "D",
     "text": "Dead neurons"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "As more layers are added, the derivatives obtained by backpropagation shrink toward zero, so early layers stop learning (vanishing gradient), degrading performance.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     118
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-17",
   "type": "single",
   "stem": "Which of the following statements about Elastic Cloud Server (ECS) is false?",
   "options": [
    {
     "key": "A",
     "text": "ECS supports yearly/monthly, pay-per-use, and spot pricing billing modes."
    },
    {
     "key": "B",
     "text": "You can control or access ECS through the web console or APIs."
    },
    {
     "key": "C",
     "text": "ECS is suitable for AI analytics, video trimming, and core databases."
    },
    {
     "key": "D",
     "text": "ECS can automatically adjust elastic computing resources based on service requirements and policies to efficiently meet service requirements."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Core databases and mission-critical applications are the BMS use case (dedicated physical performance), whereas ECSs suit general workloads such as web servers and small databases. ECS does support yearly/monthly, pay-per-use and spot billing, console/API management and automatic resource adjustment.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     62,
     64,
     68,
     82,
     106
    ]
   },
   "sectionId": "cloud-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "Ambiguous: the slides also credit ECS with automatically adjusted resources (an Auto Scaling feature), but the 'core databases' scenario is attributed to BMS, so that statement is chosen as false."
  },
  {
   "id": "m2324-18",
   "type": "single",
   "stem": "Security groups can be configured to improve service security. Which of the following statements about security groups is false?",
   "options": [
    {
     "key": "A",
     "text": "A security group is a collection of access control rules for cloud instances, such as cloud servers, containers, and databases, that have the same security requirements and that are mutually trusted within a VPC."
    },
    {
     "key": "B",
     "text": "Each instance comes with a default security group. The default security group rules allow all outgoing data packets and deny all incoming data packets."
    },
    {
     "key": "C",
     "text": "You can define different access control rules for a security group, and these rules are then applied to all the instances added to this security group."
    },
    {
     "key": "D",
     "text": "The source or destination of a security group rule can only be an IP address and cannot be a security group."
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "A security group rule's source or destination can be an IP address or another security group, so saying it can only be an IP address is false.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The PDF (p143) covers the default group (all outbound allowed, inbound denied) but does not state what a rule source can be; answer relies on product knowledge."
  },
  {
   "id": "m2324-19",
   "type": "single",
   "stem": "Which of the following statements about the classification of Flink time windows is false?",
   "options": [
    {
     "key": "A",
     "text": "Tumbling windows slice data according to a fixed window length."
    },
    {
     "key": "B",
     "text": "Sliding windows have a fixed window length and sliding interval."
    },
    {
     "key": "C",
     "text": "Sliding windows have a fixed start, end time, and length. They do not overlap."
    },
    {
     "key": "D",
     "text": "Session windows are generated when no data is received for a certain period of time."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Sliding windows have a fixed length and a sliding interval, and consecutive windows overlap when the interval is shorter than the length; non-overlapping fixed windows describe tumbling windows.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-20",
   "type": "single",
   "stem": "The following operations are performed to save network models and parameters during the model training: 1. Use CheckpointConfig to save network models and parameters every 500 steps and save a maximum of 10 checkpoint files. 2. Instantiate an API through ModelCheckpoint and define the save path and file prefix. 3. Start training and load the instantiated API. Which of the following MindSpore capabilities can be used to observe the internal status and related information of a network during training and perform specific operations in a specific period?",
   "options": [
    {
     "key": "A",
     "text": "Callback functions"
    },
    {
     "key": "B",
     "text": "Efficient data format MindRecord"
    },
    {
     "key": "C",
     "text": "Optimizer"
    },
    {
     "key": "D",
     "text": "Metrics"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Callback functions let you observe internal state and information during training and act at specific points; ModelCheckpoint is itself a callback.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-21",
   "type": "single",
   "stem": "Which of the following statements about the two Structured Streaming processing models in Spark is false?",
   "options": [
    {
     "key": "A",
     "text": "Structured Streaming has micro-batch and continuous processing models."
    },
    {
     "key": "B",
     "text": "Structured Streaming uses a continuous processing model by default."
    },
    {
     "key": "C",
     "text": "If the micro-batch processing model is used, the stream compute engine queries new data in batches after processing the previous batch of data. The offset range of the data should be saved in logs before another micro-batch processing."
    },
    {
     "key": "D",
     "text": "The continuous processing model can achieve milliseconds of latency. It can continuously read and process data, and write the processing results."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Structured Streaming uses the micro-batch processing model by default; continuous processing (millisecond latency) is the optional model.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-22",
   "type": "single",
   "stem": "Which of the following algorithms is vastly different from the other three?",
   "options": [
    {
     "key": "A",
     "text": "KNN"
    },
    {
     "key": "B",
     "text": "SVM"
    },
    {
     "key": "C",
     "text": "Logistic regression"
    },
    {
     "key": "D",
     "text": "K-means"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "KNN, SVM and logistic regression are supervised learning algorithms, whereas K-means is an unsupervised clustering algorithm.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-23",
   "type": "single",
   "stem": "Which of the following statements is false about Elastic Load Balance (ELB)?",
   "options": [
    {
     "key": "A",
     "text": "ELB periodically sends requests to backend servers to check whether they can process requests. This process is called health check. Health check cannot be manually disabled."
    },
    {
     "key": "B",
     "text": "A backend server group is a collection of backend servers that have same features. When you add a listener, you select a load balancing algorithm and create or select a backend server group. When the listener settings are met, incoming traffic is routed to the corresponding backend server group."
    },
    {
     "key": "C",
     "text": "ELB improves the fault tolerance of your applications, eliminates single points of failure (SPOFs), and enhances application availability."
    },
    {
     "key": "D",
     "text": "ELB supports multiple load balancing algorithms, such as weighted round robin, weighted least connections, source IP hash, and connection ID."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Health checks can be configured per backend server group and can be disabled, so claiming they cannot be turned off is false. The other statements match how ELB listeners, backend groups, algorithms and fault tolerance work.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     162,
     163,
     165
    ]
   },
   "sectionId": "cloud-3-3",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The slides never say whether health checks can be disabled; the answer is reached by confirming the other three statements against the PDF."
  },
  {
   "id": "m2324-24",
   "type": "single",
   "stem": "Which YARN component applies for and releases resources from the scheduler, requests NodeManager to run tasks, traces application status, and monitors their processes?",
   "options": [
    {
     "key": "A",
     "text": "ResourceManager"
    },
    {
     "key": "B",
     "text": "ApplicationMaster"
    },
    {
     "key": "C",
     "text": "NodeManager"
    },
    {
     "key": "D",
     "text": "Container"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "The ApplicationMaster negotiates resources with the ResourceManager scheduler, asks NodeManagers to run tasks and monitors the application's status and progress.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-25",
   "type": "single",
   "stem": "Which of the following management operations is not supported by Elastic Volume Service (EVS)?",
   "options": [
    {
     "key": "A",
     "text": "Attachment"
    },
    {
     "key": "B",
     "text": "Detachment"
    },
    {
     "key": "C",
     "text": "Backup"
    },
    {
     "key": "D",
     "text": "Mapping"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "EVS disks are attached to and detached from servers and protected by backups and snapshots. Mapping is not an EVS management operation.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     218,
     219
    ]
   },
   "sectionId": "cloud-4-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-26",
   "type": "multi",
   "stem": "Which of the following are categories of time windows classified by implementation principles?",
   "options": [
    {
     "key": "A",
     "text": "Event window"
    },
    {
     "key": "B",
     "text": "Tumbling window"
    },
    {
     "key": "C",
     "text": "Sliding window"
    },
    {
     "key": "D",
     "text": "Session window"
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "Time windows are classified by implementation principle into tumbling windows (fixed, non-overlapping), sliding windows (overlapping) and session windows (separated by inactivity gaps). An 'event window' is not one of these standard categories.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-27",
   "type": "multi",
   "stem": "Which of the following are true about the differences between Spark SQL and Hive?",
   "options": [
    {
     "key": "A",
     "text": "Spark SQL executes 10 to 100 times faster than Hive."
    },
    {
     "key": "B",
     "text": "Spark SQL does not support buckets, but Hive does."
    },
    {
     "key": "C",
     "text": "Spark SQL depends on the metadata of Hive."
    },
    {
     "key": "D",
     "text": "Spark SQL cannot use the custom functions of Hive."
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "Spark SQL runs in memory and is much faster than Hive, does not support buckets, and relies on the Hive metastore for metadata. It is compatible with Hive syntax and can use Hive custom functions, so the claim that it cannot is wrong.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-28",
   "type": "multi",
   "stem": "Which of the following are core concepts of a convolutional neural network?",
   "options": [
    {
     "key": "A",
     "text": "Weight sharing"
    },
    {
     "key": "B",
     "text": "Local perception"
    },
    {
     "key": "C",
     "text": "Full perception"
    },
    {
     "key": "D",
     "text": "Unchanged weight"
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "explanation": "A CNN is built on local perception, where each neuron senses only a local region, and weight sharing, where a convolution kernel uses the same parameters across the whole image. Neurons do not perceive the whole image at once, and the weights are learned during training rather than staying unchanged.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     111,
     112
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-29",
   "type": "multi",
   "stem": "Elastic Volume Service (EVS) disks are classified based on their I/O performance. Which of the following are actual EVS disk types?",
   "options": [
    {
     "key": "A",
     "text": "Extreme SSD"
    },
    {
     "key": "B",
     "text": "Ultra-high I/O"
    },
    {
     "key": "C",
     "text": "General Purpose SSD"
    },
    {
     "key": "D",
     "text": "High-performance"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "EVS offers Extreme SSD, General Purpose SSD, Ultra-high I/O and High I/O disk types. 'High-performance' is not a current EVS disk type name.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     221
    ]
   },
   "sectionId": "cloud-4-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-30",
   "type": "multi",
   "stem": "Which of the following are application scenarios of Natural Language Processing (NLP)?",
   "options": [
    {
     "key": "A",
     "text": "Machine translation"
    },
    {
     "key": "B",
     "text": "Automatic abstracting"
    },
    {
     "key": "C",
     "text": "Public opinion analysis"
    },
    {
     "key": "D",
     "text": "Style transfer"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "Machine translation, automatic abstracting and public opinion (sentiment) analysis all process natural language text. Style transfer is a computer vision task that changes image style.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-31",
   "type": "multi",
   "stem": "ModelArts is a one-stop AI development platform. Which of the following statements about ModelArts are true?",
   "options": [
    {
     "key": "A",
     "text": "It supports data processing such as data filtering and labeling, and provides dataset version management, especially big datasets for deep learning."
    },
    {
     "key": "B",
     "text": "It provides a self-developed MoXing deep learning framework that is more efficient, easier to use, and greatly accelerates training."
    },
    {
     "key": "C",
     "text": "It supports model deployment in various production environments, for example, when deploying models as real-time or batch inference services on clouds, or on devices and edges."
    },
    {
     "key": "D",
     "text": "It supports model training through auto machine learning and enables model building and one-click deployment without coding."
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "ModelArts covers data governance (filtering, labeling, dataset versions), faster training with its self-developed MoXing framework, deployment to cloud, edge and devices as real-time or batch inference, and auto learning that builds models without coding.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     391
    ]
   },
   "sectionId": "cloud-6-5",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-32",
   "type": "multi",
   "stem": "What are the deployment types supported by Huawei Cloud AI development pipeline ModelArts?",
   "options": [
    {
     "key": "A",
     "text": "Real-time service"
    },
    {
     "key": "B",
     "text": "Batch service"
    },
    {
     "key": "C",
     "text": "Edge service"
    },
    {
     "key": "D",
     "text": "Customized service"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "ModelArts deploys models as real-time services, batch inference services, and to edge or devices. 'Customized service' is not a ModelArts deployment type.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     391
    ]
   },
   "sectionId": "cloud-6-5",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-33",
   "type": "multi",
   "stem": "Which of the following statements about errors generated during model training and testing are true?",
   "options": [
    {
     "key": "A",
     "text": "The training error consists of variance and bias."
    },
    {
     "key": "B",
     "text": "Underfitting is often associated with high bias."
    },
    {
     "key": "C",
     "text": "Overfitting is often associated with high variance."
    },
    {
     "key": "D",
     "text": "As the complexity of the model increases, the testing error must decrease."
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "Underfitting comes with high bias (the model is too simple), and overfitting comes with high variance (it fits noise). Error is not simply 'variance and bias' for training error, and testing error does not keep falling as complexity grows because overfitting makes it rise again.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-34",
   "type": "multi",
   "stem": "Which of the following operators are narrow dependencies?",
   "options": [
    {
     "key": "A",
     "text": "map"
    },
    {
     "key": "B",
     "text": "union"
    },
    {
     "key": "C",
     "text": "groupByKey"
    },
    {
     "key": "D",
     "text": "reduceByKey"
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "explanation": "map and union keep each parent partition feeding at most one child partition, so they are narrow dependencies. groupByKey and reduceByKey need a shuffle across partitions and are wide dependencies.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-35",
   "type": "multi",
   "stem": "Which of the following APIs are used to load model weight checkpoint files in MindSpore?",
   "options": [
    {
     "key": "A",
     "text": "save checkpoint"
    },
    {
     "key": "B",
     "text": "load checkpoint"
    },
    {
     "key": "C",
     "text": "load param into net"
    },
    {
     "key": "D",
     "text": "load"
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "load_checkpoint reads the checkpoint file into a parameter dictionary, and load_param_into_net applies those weights to the network. save_checkpoint writes files, and load is for loading MindIR graphs rather than weight checkpoints.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-36",
   "type": "multi",
   "stem": "Which of the following statements are true about MindSpore features?",
   "options": [
    {
     "key": "A",
     "text": "The dynamic and static graphs are unified."
    },
    {
     "key": "B",
     "text": "It adapts only to Ascend hardware."
    },
    {
     "key": "C",
     "text": "It supports distributed parallelism."
    },
    {
     "key": "D",
     "text": "It supports all-scenario unification (MindIR)."
    }
   ],
   "answer": [
    "A",
    "C",
    "D"
   ],
   "explanation": "MindSpore unifies dynamic and static graphs, supports distributed parallel training, and supports all-scenario deployment through the unified MindIR format. It is not limited to Ascend and also runs on GPU and CPU.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-37",
   "type": "multi",
   "stem": "Compute Architecture for Neural Networks (CANN) is a chip enabling layer built by Huawei for deep neural networks and Ascend processors. Which of the following functional modules are included in CANN?",
   "options": [
    {
     "key": "A",
     "text": "FusionEngine"
    },
    {
     "key": "B",
     "text": "CCE operator library"
    },
    {
     "key": "C",
     "text": "Tensor Boost Engine (TBE)"
    },
    {
     "key": "D",
     "text": "Compiler"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "CANN includes the FusionEngine, the CCE operator library, the TBE operator development tool and the compiler, along with the runtime and the AscendCL interface.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-38",
   "type": "multi",
   "stem": "Huawei Cloud Relational Database Service (RDS) is an online, cloud-based database service running on a cloud computing platform. It is highly available, scalable, and easy to manage. Which of the following DB engines are supported by RDS?",
   "options": [
    {
     "key": "A",
     "text": "MySQL"
    },
    {
     "key": "B",
     "text": "PostgreSQL"
    },
    {
     "key": "C",
     "text": "DAS"
    },
    {
     "key": "D",
     "text": "DDM"
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "explanation": "RDS provides database engines such as MySQL and PostgreSQL. DAS (a web console for managing DB instances) and DDM (distributed database middleware) are supporting tools, not engines.",
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
    "2023-24"
   ]
  },
  {
   "id": "m2324-39",
   "type": "multi",
   "stem": "Which of the following are true about the similarities and differences between Spark Streaming and Storm?",
   "options": [
    {
     "key": "A",
     "text": "Storm is designed for real-time stream processing, which means it processes data as it arrives. Spark Streaming collects data across a period of time and processes the data as RDDs."
    },
    {
     "key": "B",
     "text": "Storm processes data in milliseconds whereas Spark Streaming processes data in seconds."
    },
    {
     "key": "C",
     "text": "Storm supports transactions. Spark Streaming's support for transactions is incomplete."
    },
    {
     "key": "D",
     "text": "Storm and Spark Streaming relies on ZooKeeper to implement fault tolerance."
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "Storm processes each record as it arrives with millisecond latency and supports transactions, while Spark Streaming processes micro-batches as RDDs with second-level latency and weaker transaction support. Spark Streaming recovers using RDD lineage and checkpoints rather than ZooKeeper.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-40",
   "type": "multi",
   "stem": "Simple Message Notification (SMN) is a reliable and flexible large-scale message notification service. Which of the following protocols does SMN support?",
   "options": [
    {
     "key": "A",
     "text": "Email"
    },
    {
     "key": "B",
     "text": "SMS"
    },
    {
     "key": "C",
     "text": "FunctionGraph"
    },
    {
     "key": "D",
     "text": "WeChat"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "SMN delivers messages to email, SMS, HTTP(S) and FunctionGraph subscribers. WeChat is not a supported endpoint.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     290
    ]
   },
   "sectionId": "cloud-5-3",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-41",
   "type": "multi",
   "stem": "Huawei Cloud Log Tank Service (LTS) collects logs in real time using multiple collection methods. Which of the following statements about LTS are true?",
   "options": [
    {
     "key": "A",
     "text": "LTS collects logs from hosts and cloud services."
    },
    {
     "key": "B",
     "text": "Logs are structured by log group using different extraction modes."
    },
    {
     "key": "C",
     "text": "You can quickly query logs by keyword or fuzzy match."
    },
    {
     "key": "D",
     "text": "Logs can be collected from cloud services or using APIs/SDKs."
    }
   ],
   "answer": [
    "A",
    "C",
    "D"
   ],
   "explanation": "LTS collects logs from hosts and cloud services (via ICAgent, APIs or SDKs) and supports quick keyword or fuzzy search. Log structuring extracts fields from a log stream rather than from a log group, so that statement is inaccurate.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     304,
     305,
     306,
     307,
     310
    ]
   },
   "sectionId": "cloud-5-5",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The material says structuring is applied to logs in a log stream, not by log group, so the log-group option is treated as false although the exam may have counted it true."
  },
  {
   "id": "m2324-42",
   "type": "multi",
   "stem": "Which of the following statements about Cloud Eye are false?",
   "options": [
    {
     "key": "A",
     "text": "Cloud Eye needs to be enabled manually. Users can view statuses of cloud services and configure alarm rules on the Cloud Eye console or by calling Cloud Eye APIs."
    },
    {
     "key": "B",
     "text": "Raw sample data is reported to Cloud Eye in real time for cloud service monitoring. Alarms are triggered and notifications are sent to users in real time."
    },
    {
     "key": "C",
     "text": "Alarm templates help users create alarm notifications for a single cloud service, improving data sampling efficiency."
    },
    {
     "key": "D",
     "text": "Users can enable Alarm Notification when configuring alarm rules. When the alarm threshold is reached due to the cloud service status changes, Cloud Eye sends notifications by email, SMS message, or in other ways."
    }
   ],
   "answer": [
    "A",
    "C"
   ],
   "explanation": "Cloud Eye is automatically provisioned for all users and does not need to be enabled manually. Alarm templates are used to create alarm rules in batches for multiple cloud services, not just a single service.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     295,
     296
    ]
   },
   "sectionId": "cloud-5-4",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-43",
   "type": "multi",
   "stem": "What are the bucket policies of Huawei Cloud Object Storage Service (OBS)?",
   "options": [
    {
     "key": "A",
     "text": "Bucket Read-Only"
    },
    {
     "key": "B",
     "text": "Directory Read-Only"
    },
    {
     "key": "C",
     "text": "Public Read/Write"
    },
    {
     "key": "D",
     "text": "Public Write"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "OBS bucket policy templates include Bucket Read-Only, Bucket Read and Write, Directory Read-Only, Directory Read and Write, Public Read, and Public Read and Write. There is no write-only public template.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     241
    ]
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-44",
   "type": "multi",
   "stem": "Relational databases are ACID compliant. They organize data using a relational model, that is, data is stored in rows and columns. Which of the following relational databases are provided by Huawei Cloud?",
   "options": [
    {
     "key": "A",
     "text": "RDS for MySQL"
    },
    {
     "key": "B",
     "text": "RDS for Oracle"
    },
    {
     "key": "C",
     "text": "RDS for PostgreSQL"
    },
    {
     "key": "D",
     "text": "RDS for SQL Server"
    }
   ],
   "answer": [
    "A",
    "C",
    "D"
   ],
   "explanation": "Huawei Cloud RDS provides MySQL, PostgreSQL and SQL Server engines. Oracle is not offered as an RDS engine.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The course PDF only lists RDS for MySQL and PostgreSQL, so SQL Server and Oracle are answered from general knowledge of Huawei Cloud RDS."
  },
  {
   "id": "m2324-45",
   "type": "multi",
   "stem": "An engineer created a 10 TB file system using Huawei Cloud Scalable File Service (SFS) and wanted to mount the file system to a server running CentOS 8. Which of the following cases may cause a file system mount failure?",
   "options": [
    {
     "key": "A",
     "text": "The capacity of the created filesystem is too large. Filesystems that large are not supported by the system."
    },
    {
     "key": "B",
     "text": "The file system address specified in the mount command is incorrect."
    },
    {
     "key": "C",
     "text": "The mount times out because there is too much file content."
    },
    {
     "key": "D",
     "text": "The DNS address used to mount the file system is incorrect."
    }
   ],
   "answer": [
    "B",
    "D"
   ],
   "explanation": "Mounting an NFS file system requires the correct mount point address and a resolvable file system domain name, so a wrong address or wrong DNS can make the mount fail. Size alone or the amount of content does not cause mount failure.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     251
    ]
   },
   "sectionId": "cloud-4-3",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-46",
   "type": "tf",
   "stem": "Compared to convolutional neural networks (CNNs), recurrent neural networks (RNNs) are more suitable for processing time series data and have higher resource utilization for hardware (GPUs and NPUs). However, RNNs have a large number of parameters, are prone to overfitting, and suffer from gradient vanishing. Both RNNs and CNNs share weights.",
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
   "explanation": "RNNs process sequences step by step, so they parallelize poorly and use GPU/NPU hardware less efficiently than CNNs, not more. The rest of the statement (suited to time series, gradient vanishing, weight sharing) is accurate.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The material does not discuss hardware utilization, so the error is identified from general knowledge."
  },
  {
   "id": "m2324-47",
   "type": "tf",
   "stem": "Currently, foundation models are mainly trained on GPUs and NPUs and used for NLP and multimodal tasks. Such models include Huawei Pangu, ChatGPT, and PaLM 2 models.",
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
   "explanation": "Foundation models such as Huawei Pangu, ChatGPT and PaLM 2 are trained on GPU or NPU clusters and used mainly for NLP and multimodal tasks.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-1-2",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-48",
   "type": "tf",
   "stem": "Web Application Firewall (WAF) examines website service traffic to identify malicious requests and unknown threats accurately and intelligently. It protects origin servers from attacks and intrusions and secures mission-critical data, keeping websites stable and secure. After a website is connected to WAF, all website access requests are forwarded to WAF first. WAF inspects the traffic, filters out malicious traffic, and routes only normal traffic to origin servers, keeping the origin server secure, stable, and available.",
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
   "explanation": "After a site is connected to WAF, all access requests go to WAF first, which filters out malicious traffic and forwards only normal traffic to the origin server.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     371,
     373
    ]
   },
   "sectionId": "cloud-6-2",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-49",
   "type": "tf",
   "stem": "Log Tank Service (LTS) collects logs in real time from cloud services or by using APIs/SDKs. You can ingest logs to LTS without installing plug-ins. LTS proactively collects logs and displays them in order on the console for easy query.",
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
   "explanation": "LTS ingests host logs through ICAgent, which must be installed on the host, and it collects according to ingestion configurations rather than proactively gathering everything. Only API/SDK or cloud-service ingestion avoids installing an agent.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-5-5",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "Uncertain: two independent checks disagreed. The statement holds for cloud-service and API/SDK ingestion, but host logs need ICAgent installed, so the expected answer could be True."
  },
  {
   "id": "m2324-50",
   "type": "tf",
   "stem": "According to Flink's classification of time in stream application, the ingestion time is the time that events enter Flink.",
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
   "explanation": "Flink distinguishes event time, ingestion time and processing time; ingestion time is the moment an event enters Flink at the source.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-51",
   "type": "tf",
   "stem": "Hybrid cloud deployments typically occur within a company or organization. In this model, all hybrid cloud data resides within the organization's data center. Access to this data is carefully managed by ingress firewalls deployed at the data center, ensuring robust data protection.",
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
   "explanation": "The description of data kept inside the organization's data center and protected by ingress firewalls fits a private cloud. A hybrid cloud combines public and private clouds or on-premises resources that stay distinct but are bound together.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     12
    ]
   },
   "sectionId": "cloud-1-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-52",
   "type": "tf",
   "stem": "Deep learning frameworks make AI development more accessible. We can call existing models or algorithms in a framework for training, avoiding coding from scratch and repeated development.",
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
   "explanation": "Deep learning frameworks package ready-made models, operators and algorithms, so developers can train without coding everything from scratch.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-53",
   "type": "tf",
   "stem": "MindSpore provides the submodule \"dataset\" for data processing, which is used to load datasets or perform data augmentation.",
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
   "explanation": "MindSpore's dataset module is used to load datasets and apply data processing and augmentation operations.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-54",
   "type": "tf",
   "stem": "Model overfitting can occur if the training standard does not align with the model efficiency standard.",
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
   "explanation": "Overfitting arises when the training objective is not aligned with what is needed for good generalization, so the model fits the training data well but performs poorly on new data.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ],
   "flag": "The wording is vague; the PDF only mentions overfitting in the context of regularization, so this is a best-judgement True."
  },
  {
   "id": "m2324-55",
   "type": "tf",
   "stem": "Huawei Cloud RDS for PostgreSQL is a distributed relational database that excels in data reliability and integrity. It supports cluster deployment. It can be used for Internet e-commerce, geographic location application systems, financial insurance systems, and complex data object processing.",
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
   "explanation": "The course describes RDS for PostgreSQL as an open-source relational database known for reliability and data integrity, offered with HA cluster deployment, not as a distributed relational database. The listed application scenarios are correct, but the distributed claim is wrong.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     347,
     349
    ]
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-56",
   "type": "tf",
   "stem": "In the HBase table structure, each cell stores multiple versions of the same data. These versions are indexed using timestamps.",
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
   "explanation": "In HBase, each cell can hold multiple versions of the same data, distinguished and indexed by timestamp.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-57",
   "type": "tf",
   "stem": "Cloud Eye is a multi-dimensional resource monitoring service. You can use Cloud Eye to monitor resources, set alarm rules, identify resource exceptions, and respond to resource changes.",
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
   "explanation": "Cloud Eye is a multi-dimensional resource monitoring service for monitoring resources, setting alarm rules, spotting exceptions and responding quickly to changes.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     294
    ]
   },
   "sectionId": "cloud-5-4",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-58",
   "type": "tf",
   "stem": "Bare Metal Server (BMS) combines the scalability of virtual servers (VMs) with the high performance of physical servers. It provides dedicated servers on the cloud, delivering the high performance and security required by core databases, mission-critical applications, high-performance computing (HPC), and big data.",
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
   "explanation": "A BMS offers the scalability of ECSs together with the performance of physical servers, as dedicated servers for core databases, critical applications, HPC and big data.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     105,
     106
    ]
   },
   "sectionId": "cloud-2-4",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-59",
   "type": "tf",
   "stem": "In a convolutional neural network (CNN), a convolution kernel must feature a square shape, an odd length, and a stride greater than or equal to 1.",
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
   "explanation": "Convolution kernels are not required to be square or odd-sized; rectangular and even-sized kernels are valid. The stride is simply a positive step size chosen by the designer.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  },
  {
   "id": "m2324-60",
   "type": "tf",
   "stem": "To allow users to handle late arrivals, Flink provides a method called \"Allowed Lateness\". Users can specify maximum allowed lateness. After the window is closed, Flink keeps the state of windows until their allowed lateness expires. During this period, delayed events are not discarded, but window recalculation is triggered by default.",
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
   "explanation": "With allowed lateness, Flink retains window state after the window closes until the lateness expires, and late events within that period are not dropped but trigger the window to be recomputed.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-pending",
   "mergedInto": null,
   "appearsIn": [
    "2023-24"
   ]
  }
 ]
});
