HR.registerMock({
 "id": "m2425",
 "questions": [
  {
   "id": "m2425-01",
   "type": "single",
   "stem": "Which of the following statements is true about basic AI concepts?",
   "options": [
    {
     "key": "A",
     "text": "Regression tasks can only be used for classification problems."
    },
    {
     "key": "B",
     "text": "Supervised learning uses labeled data, while unsupervised learning does not."
    },
    {
     "key": "C",
     "text": "A neural network consists of a series of neurons. Each neuron uses the same activation function."
    },
    {
     "key": "D",
     "text": "The main goal of reinforcement learning is to improve the model by minimizing the loss function."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Supervised learning trains on labeled data whereas unsupervised learning does not. Regression predicts continuous values, neurons can use different activation functions, and reinforcement learning maximizes cumulative reward rather than just minimizing a loss.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-02",
   "type": "single",
   "stem": "Which of the following statements about Ascend chips is false?",
   "options": [
    {
     "key": "A",
     "text": "Ascend chips are processors designed for AI computing."
    },
    {
     "key": "B",
     "text": "Ascend chips support accelerated inference of deep learning models."
    },
    {
     "key": "C",
     "text": "Ascend chips support multiple AI frameworks, such as TensorFlow and MindSpore."
    },
    {
     "key": "D",
     "text": "Ascend chips can be used only on Huawei software platforms."
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Ascend chips are not restricted to Huawei software platforms; they support multiple frameworks such as TensorFlow and MindSpore, so the claim of exclusive use is false.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-4",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-03",
   "type": "single",
   "stem": "Which of the following statements is false about MindSpore?",
   "options": [
    {
     "key": "A",
     "text": "When MindSpore is used, backpropagation code must be manually written."
    },
    {
     "key": "B",
     "text": "MindSpore can load datasets through the Dataset API."
    },
    {
     "key": "C",
     "text": "MindSpore can train and evaluate models through the Model API."
    },
    {
     "key": "D",
     "text": "MindSpore can run on multiple hardware platforms, including CPUs, GPUs, and Ascend processors."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "MindSpore provides automatic differentiation, so backpropagation code does not need to be written by hand. The other statements about the Dataset and Model APIs and multi-hardware support are accurate.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-04",
   "type": "single",
   "stem": "Which of the following statements is true about the features of Huawei Cloud AI development platform ModelArts?",
   "options": [
    {
     "key": "A",
     "text": "ModelArts supports only local datasets for model training."
    },
    {
     "key": "B",
     "text": "ModelArts supports only deep learning model development."
    },
    {
     "key": "C",
     "text": "ModelArts visualizes the model training process."
    },
    {
     "key": "D",
     "text": "ModelArts cannot label data."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "ModelArts visualizes the training process. It is not limited to local datasets or deep learning, and it supports data preprocessing and labeling.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-6-5",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-05",
   "type": "single",
   "stem": "Which of the following Spark operators triggers shuffle?",
   "options": [
    {
     "key": "A",
     "text": "sample"
    },
    {
     "key": "B",
     "text": "reduceByKey"
    },
    {
     "key": "C",
     "text": "map"
    },
    {
     "key": "D",
     "text": "foreach"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "reduceByKey is a wide-dependency operator that must regroup data across partitions, so it triggers a shuffle. map, sample and foreach work within a partition.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-06",
   "type": "single",
   "stem": "Which of the following components is not part of Hadoop?",
   "options": [
    {
     "key": "A",
     "text": "Kubernetes"
    },
    {
     "key": "B",
     "text": "HDFS"
    },
    {
     "key": "C",
     "text": "Yarn"
    },
    {
     "key": "D",
     "text": "MapReduce"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "Hadoop consists of HDFS for storage, YARN for resource management and MapReduce for computation. Kubernetes is a separate container orchestration platform.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-07",
   "type": "single",
   "stem": "Which of the following cannot be used for verifying data consistency of Object Storage Service (OBS)?",
   "options": [
    {
     "key": "A",
     "text": "OBS Browser+"
    },
    {
     "key": "B",
     "text": "OBS Turbo"
    },
    {
     "key": "C",
     "text": "obsutil"
    },
    {
     "key": "D",
     "text": "OBS SDKs"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "OBS Turbo is a file-system access client for high-performance scenarios, not a tool for verifying object data consistency. OBS Browser+, obsutil and the SDKs can be used for upload/download integrity checks.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-08",
   "type": "single",
   "stem": "Which of the following is not a data aggregation period of Cloud Eye?",
   "options": [
    {
     "key": "A",
     "text": "1 hour"
    },
    {
     "key": "B",
     "text": "24 hours"
    },
    {
     "key": "C",
     "text": "72 hours"
    },
    {
     "key": "D",
     "text": "4 hours"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Cloud Eye aggregates metric data over periods such as 1 minute, 5 minutes, 20 minutes, 1 hour, 4 hours and 24 hours; 72 hours is not one of them.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-5-4",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-09",
   "type": "single",
   "stem": "Which of the following statements about Object Storage Service (OBS) storage classes is false?",
   "options": [
    {
     "key": "A",
     "text": "Archive storage is suitable for storing data that is rarely accessed (once per year)."
    },
    {
     "key": "B",
     "text": "Infrequent Access storage is suitable for storing infrequently accessed data that requires no quick response."
    },
    {
     "key": "C",
     "text": "Standard storage features low access latency and high throughput, so it is good for scenarios with a large number of frequently accessed files or small files."
    },
    {
     "key": "D",
     "text": "Deep Archive storage is suitable for storing data that is hardly accessed (once every few years)."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "Infrequent Access is for data accessed less than 12 times a year but that must still be retrieved quickly, with low latency and high throughput. Saying it needs no quick response is wrong.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     235
    ]
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-10",
   "type": "single",
   "stem": "Which of the following statements is false about Elastic IP (EIP)?",
   "options": [
    {
     "key": "A",
     "text": "EIP remains unchanged when you start or stop an Elastic Cloud Server (ECS)."
    },
    {
     "key": "B",
     "text": "EIPs and cloud resources can be in different regions."
    },
    {
     "key": "C",
     "text": "An EIP can be bound to only one cloud resource."
    },
    {
     "key": "D",
     "text": "EIPs that are bound to cloud resources cannot be released unless they are unbound."
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "An EIP must be in the same region as the cloud resource it is bound to; it cannot be used across regions. The other statements about persistence across ECS restarts, one-to-one binding and unbinding before release are correct.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-3-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-11",
   "type": "single",
   "stem": "An enterprise that plans to deploy its systems on the cloud develops applications on its own and uses multiple middleware services on the cloud, with no need to pay attention to the underlying hardware and OS. Which of the following service models provided by the cloud service vendor was used by the enterprise?",
   "options": [
    {
     "key": "A",
     "text": "PaaS"
    },
    {
     "key": "B",
     "text": "FaaS"
    },
    {
     "key": "C",
     "text": "IaaS"
    },
    {
     "key": "D",
     "text": "SaaS"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "With PaaS the vendor supplies the OS, database, middleware and runtime, and the customer only develops and deploys its own applications. IaaS would require managing the OS and middleware, while SaaS delivers finished software.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-12",
   "type": "single",
   "stem": "Which of the following descriptions of how you use Elastic Volume Service (EVS) disks is correct?",
   "options": [
    {
     "key": "A",
     "text": "1. Attach the disk to a specified ECS. 2. Select a disk type, enter a capacity, and buy a disk. 3. Configure disk auto mount at system startup. 4. Log in to the ECS and initialize the disk."
    },
    {
     "key": "B",
     "text": "1. Select a disk type, enter a capacity, and buy a disk. 2. Attach the disk to a specified ECS. 3. Configure disk auto mount at system startup. 4. Log in to the ECS and initialize the disk."
    },
    {
     "key": "C",
     "text": "1. Select a disk type, enter a capacity, and buy a disk. 2. Attach the disk to a specified ECS. 3. Log in to the ECS and initialize the disk. 4. Configure disk auto mount at system startup."
    },
    {
     "key": "D",
     "text": "1. Select a disk type, enter a capacity, and buy a disk. 2. Configure disk auto mount at system startup. 3. Attach the disk to a specified ECS. 4. Log in to the ECS and initialize the disk."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "A disk is first purchased, then attached to an ECS, then initialized from inside the ECS (partition, format), and finally set to auto mount at startup so the mount persists across reboots. A disk cannot be initialized before it is attached, and it cannot be attached before it exists.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-4-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-13",
   "type": "single",
   "stem": "A tenant deploys services that need to access the Internet on multiple Elastic Cloud Servers (ECSs). Which of the following can be recommended to reduce public network bandwidth costs?",
   "options": [
    {
     "key": "A",
     "text": "Use bandwidth add-on packages."
    },
    {
     "key": "B",
     "text": "Use the enhanced 95th percentile billing mode."
    },
    {
     "key": "C",
     "text": "Add multiple EIPs to a shared bandwidth so that these ECSs can share the bandwidth."
    },
    {
     "key": "D",
     "text": "Bind a pay-per-use EIP billed by bandwidth to each ECS."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Putting several EIPs into one shared bandwidth lets the ECSs share a single bandwidth pool, so the tenant does not pay for a separate bandwidth per ECS. Binding a per-bandwidth pay-per-use EIP to every ECS keeps costs high.",
   "source": {
    "kind": "material",
    "pdf": "cloud-service-architect",
    "pages": [
     139
    ]
   },
   "sectionId": "cloud-3-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-14",
   "type": "single",
   "stem": "Machine learning approaches are classified as supervised, unsupervised, semi-supervised, and reinforcement learning. Which of the following is the basis of this classification?",
   "options": [
    {
     "key": "A",
     "text": "Model complexity"
    },
    {
     "key": "B",
     "text": "Compute resource demands"
    },
    {
     "key": "C",
     "text": "Type of the target function"
    },
    {
     "key": "D",
     "text": "Data labeling methods"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Supervised, unsupervised, semi-supervised and reinforcement learning are distinguished by how the training data is labeled or what feedback is available, not by model complexity or compute demand.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-15",
   "type": "single",
   "stem": "The confusion matrix is an M x M table. What does M indicate?",
   "options": [
    {
     "key": "A",
     "text": "Number of samples"
    },
    {
     "key": "B",
     "text": "Feature dimensions"
    },
    {
     "key": "C",
     "text": "Model complexity"
    },
    {
     "key": "D",
     "text": "Number of classes"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "A confusion matrix has one row and one column per class, so M is the number of classes.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-16",
   "type": "single",
   "stem": "Which of the following functions in Keras is used to build the dropout layer?",
   "options": [
    {
     "key": "A",
     "text": "DropoutLayer()"
    },
    {
     "key": "B",
     "text": "Dropout()"
    },
    {
     "key": "C",
     "text": "DropoutLayered()"
    },
    {
     "key": "D",
     "text": "DropoutFunction()"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "In Keras the dropout layer is created with the Dropout() class (tf.keras.layers.Dropout), which randomly zeroes inputs during training to reduce overfitting. The other names do not exist in the Keras API.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-17",
   "type": "single",
   "stem": "Which of the following is not a parameter in tf.keras.layers.MaxPooling2D?",
   "options": [
    {
     "key": "A",
     "text": "padding"
    },
    {
     "key": "B",
     "text": "strides"
    },
    {
     "key": "C",
     "text": "activation"
    },
    {
     "key": "D",
     "text": "pool_size"
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "MaxPooling2D takes pool_size, strides and padding (plus data_format). A pooling layer has no activation parameter, because activation belongs to layers with weights such as Conv2D or Dense.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-18",
   "type": "single",
   "stem": "Which of the following is a machine learning development framework?",
   "options": [
    {
     "key": "A",
     "text": "ONNX"
    },
    {
     "key": "B",
     "text": "MindSpore"
    },
    {
     "key": "C",
     "text": "PaddlePaddle"
    },
    {
     "key": "D",
     "text": "scikit-learn"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "scikit-learn is the general-purpose machine learning library and development framework. ONNX is a model exchange format, and MindSpore and PaddlePaddle are deep learning frameworks.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "MindSpore and PaddlePaddle are also frameworks; the question most likely expects scikit-learn as the classical machine learning framework, while ONNX is described in the PDF as an exchange format."
  },
  {
   "id": "m2425-19",
   "type": "single",
   "stem": "Which of the following is not improved based on the ReLU activation function?",
   "options": [
    {
     "key": "A",
     "text": "RMSprop"
    },
    {
     "key": "B",
     "text": "ELU"
    },
    {
     "key": "C",
     "text": "Leaky ReLU"
    },
    {
     "key": "D",
     "text": "SeLU"
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "ELU, Leaky ReLU and SeLU are activation functions derived from ReLU to fix problems such as dead neurons for negative inputs. RMSprop is an optimizer that adapts the learning rate, not an activation function.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     88,
     95
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-20",
   "type": "single",
   "stem": "Object Storage Service (OBS) is a scalable service that provides secure, reliable, and cost-effective cloud storage for massive amounts of data. Users can access OBS in multiple ways. Which of the following cannot be used to access OBS?",
   "options": [
    {
     "key": "A",
     "text": "s3fs"
    },
    {
     "key": "B",
     "text": "OBS Browser+"
    },
    {
     "key": "C",
     "text": "Console"
    },
    {
     "key": "D",
     "text": "eSight"
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "OBS can be accessed through the console, OBS Browser+, APIs, SDKs, obsutil and obsfs, and S3-compatible tools such as s3fs also work. eSight is a Huawei O&M management tool, not an OBS access method.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     234
    ]
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-21",
   "type": "single",
   "stem": "Cloud Trace Service (CTS) provides online audit for cloud resources. Which of the following statements about CTS is false?",
   "options": [
    {
     "key": "A",
     "text": "CTS mines data in traces to facilitate service health analysis, risk analysis, resource tracking, and cost analysis. You can also obtain the data from CTS and explore its value yourself."
    },
    {
     "key": "B",
     "text": "When you perform add, delete, or modify operations on an Elastic Cloud Server (ECS), these operations and their results will be automatically recorded and then sent to CTS in the specified format for archiving."
    },
    {
     "key": "C",
     "text": "After CTS is enabled, you can monitor basic metrics such as CPU usage, memory usage, and disk usage of Cloud Container Engine (CCE), [Elastic Cloud Server (ECS), and] Bare Metal Server (BMS), and alarms will be generated when detecting abnormal metrics."
    },
    {
     "key": "D",
     "text": "In case of a fault, filters help you pinpoint unusual operations for faster and easier troubleshooting."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "CTS records and audits operations on cloud resources (who did what, with results) for security analysis, resource tracking and troubleshooting. Monitoring CPU, memory and disk metrics and raising alarms is the job of Cloud Eye Service, not CTS.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     316,
     317
    ]
   },
   "sectionId": "cloud-5-6",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "note": "Part of option text was hidden in the source photo. The bracketed wording is a best reading, not confirmed."
  },
  {
   "id": "m2425-22",
   "type": "single",
   "stem": "By minimizing access delays, Content Delivery Network (CDN) speeds up responsiveness and improves website availability. Which of the following statements about Huawei Cloud CDN is false?",
   "options": [
    {
     "key": "A",
     "text": "CDN is for websites, file downloads, and audio/video on demand, but not for livestreaming or other services that demand high real-time performance."
    },
    {
     "key": "B",
     "text": "CDN improves the cache hit ratio with proprietary AICache, multi-level cache scheduling, and fast, massive SSD storage."
    },
    {
     "key": "C",
     "text": "CDN lets you configure domains with CDN in simple steps, customize them on the console, and call open APIs for app integration and cross-[hidden word] management."
    },
    {
     "key": "D",
     "text": "CDN distributes origin content to points of presence (PoPs) around the world for nearby users to access desired content from."
    }
   ],
   "answer": [
    "A"
   ],
   "explanation": "CDN caches content on edge nodes close to users for websites, downloads and video on demand, and it also supports live streaming. The cache (AICache, multi-level scheduling, SSD), ease of use and edge distribution statements match the material.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     381,
     382,
     383
    ]
   },
   "sectionId": "cloud-6-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "The PDF lists website, download and VOD scenarios but never says live streaming is unsupported; the false statement is identified because the other three match the slides.",
   "note": "Part of option text was hidden in the source photo. The bracketed wording is a best reading, not confirmed."
  },
  {
   "id": "m2425-23",
   "type": "single",
   "stem": "Which of the following is not a feature of Elasticsearch?",
   "options": [
    {
     "key": "A",
     "text": "Search results can be obtained immediately, and inverted indexing for full-text search is implemented."
    },
    {
     "key": "B",
     "text": "Search results are sorted based on elements (ranging from word frequency or proximate cause to popularity)."
    },
    {
     "key": "C",
     "text": "Faults (such as hardware faults and network segmentation) cannot be automatically detected, ensuring cluster (and data) security and availability."
    },
    {
     "key": "D",
     "text": "Horizontal scaling is supported, Elasticsearch can run on hundreds or thousands of servers, and users can seamlessly switch between the [pre-production] environment and production environment."
    }
   ],
   "answer": [
    "C"
   ],
   "explanation": "Elasticsearch automatically detects faults such as node failures and network partitions and recovers from them, which keeps the cluster and data secure and available. The statement that faults cannot be detected is therefore the wrong one.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-5",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "note": "Part of option text was hidden in the source photo. The bracketed wording is a best reading, not confirmed."
  },
  {
   "id": "m2425-24",
   "type": "single",
   "stem": "In Kafka, which of the following components can release messages to Kafka Broker?",
   "options": [
    {
     "key": "A",
     "text": "Broker"
    },
    {
     "key": "B",
     "text": "Producer"
    },
    {
     "key": "C",
     "text": "Consumer"
    },
    {
     "key": "D",
     "text": "Partition"
    }
   ],
   "answer": [
    "B"
   ],
   "explanation": "In Kafka a Producer publishes messages to topics on the Broker, a Consumer reads them, and partitions are subdivisions of a topic stored by brokers. A broker is the server that receives messages, not the component that releases them.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-4",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-25",
   "type": "single",
   "stem": "For late events in Flink, windows are closed and calculation results are generated. Which of the following is not a method for handling this problem?",
   "options": [
    {
     "key": "A",
     "text": "Consider late events as error messages and discard them."
    },
    {
     "key": "B",
     "text": "Collect the late events and process them separately."
    },
    {
     "key": "C",
     "text": "Reactivate the closed windows and recalculate to correct the results."
    },
    {
     "key": "D",
     "text": "Reactivate the closed windows and recalculate it without correcting the results."
    }
   ],
   "answer": [
    "D"
   ],
   "explanation": "Late events in Flink can be dropped, sent to a side output and processed separately, or trigger the closed window to be reactivated and recalculated to correct the earlier result. Recalculating a reactivated window without correcting the result serves no purpose and is not a handling method.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-26",
   "type": "multi",
   "stem": "Which of the following statements are true about the MindSpore framework?",
   "options": [
    {
     "key": "A",
     "text": "MindSpore supports only CPUs and GPUs and does not support Ascend AI processors."
    },
    {
     "key": "B",
     "text": "MindSpore is an open-source deep learning framework developed by Huawei."
    },
    {
     "key": "C",
     "text": "MindSpore simplifies the gradient calculation of models through the automatic differentiation mechanism."
    },
    {
     "key": "D",
     "text": "MindSpore supports all-scenario AI development with device-edge-cloud synergy."
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "MindSpore is Huawei's open-source deep learning framework, uses automatic differentiation to simplify gradient computation, and supports device-edge-cloud all-scenario development. It does support Ascend AI processors in addition to CPUs and GPUs.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-27",
   "type": "multi",
   "stem": "Which of the following statements are true about the foundation model solution based on Ascend processors?",
   "options": [
    {
     "key": "A",
     "text": "The foundation model solution is based on Huawei-developed Ascend processors."
    },
    {
     "key": "B",
     "text": "The foundation model solution optimizes both software and hardware to efficiently use computing power."
    },
    {
     "key": "C",
     "text": "This solution allows you to train and deploy models only in Huawei Cloud environments."
    },
    {
     "key": "D",
     "text": "This solution supports training and inference of multiple AI models."
    }
   ],
   "answer": [
    "A",
    "B",
    "D"
   ],
   "explanation": "The solution is built on Huawei-developed Ascend processors, co-optimizes software and hardware to use computing power efficiently, and supports training and inference of multiple models. It is not limited to Huawei Cloud, since it can also be deployed on-premises.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-4",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-28",
   "type": "multi",
   "stem": "Which of the following statements about Huawei Cloud ModelArts are true?",
   "options": [
    {
     "key": "A",
     "text": "ModelArts can only be used to develop image classification models."
    },
    {
     "key": "B",
     "text": "When using ModelArts, you can label and process data."
    },
    {
     "key": "C",
     "text": "ModelArts supports distributed training."
    },
    {
     "key": "D",
     "text": "ModelArts provides automated hyperparameter tuning."
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "ModelArts is a one-stop AI development platform covering data labeling and processing, distributed training and automated model building and tuning. It is not limited to image classification and also supports object detection, predictive analytics and other tasks.",
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
    "2024-25"
   ],
   "flag": "The slide lists data preprocessing and labeling, distributed training and automated model building; automated hyperparameter tuning is not named explicitly there."
  },
  {
   "id": "m2425-29",
   "type": "multi",
   "stem": "Which of the following window allocators are supported by Flink?",
   "options": [
    {
     "key": "A",
     "text": "Global windows"
    },
    {
     "key": "B",
     "text": "Sliding windows"
    },
    {
     "key": "C",
     "text": "Session windows"
    },
    {
     "key": "D",
     "text": "Tumbling windows"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "Flink provides tumbling, sliding, session and global window assigners. Tumbling windows are fixed and non-overlapping, sliding windows overlap, session windows are split by inactivity gaps, and global windows put all keyed elements in one window.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-30",
   "type": "multi",
   "stem": "Which of the following database engines are not supported by MySQL 5.6 and later?",
   "options": [
    {
     "key": "A",
     "text": "Memory"
    },
    {
     "key": "B",
     "text": "FEDERATED"
    },
    {
     "key": "C",
     "text": "MyISAM"
    },
    {
     "key": "D",
     "text": "InnoDB storage"
    }
   ],
   "answer": [
    "A",
    "B",
    "C"
   ],
   "explanation": "RDS for MySQL 5.6 and later is built around the InnoDB storage engine, and engines such as Memory, FEDERATED and MyISAM are not supported. InnoDB is the supported engine.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-6-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "The PDFs do not cover storage engines; this is based on Huawei Cloud RDS for MySQL documentation recalled from outside the material, and MyISAM is the least certain of the three."
  },
  {
   "id": "m2425-31",
   "type": "multi",
   "stem": "Planning networking services is a complex process. Which of the following factors need to be considered?",
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
     "text": "Bandwidth requirements"
    },
    {
     "key": "D",
     "text": "Network latency"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "Network planning has to account for expected traffic volume, throughput, bandwidth requirements and latency, because these decide the size and placement of the network resources. All four are standard planning inputs.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-32",
   "type": "multi",
   "stem": "Compared with traditional file storage, Scalable File Service (SFS) has the following advantages:",
   "options": [
    {
     "key": "A",
     "text": "SFS provides high performance and reliability."
    },
    {
     "key": "B",
     "text": "SFS supports fast elastic scaling."
    },
    {
     "key": "C",
     "text": "SFS file system capacity is greater than traditional file storage capacity."
    },
    {
     "key": "D",
     "text": "SFS is inexpensive and easy to use."
    }
   ],
   "answer": [
    "A",
    "B",
    "D"
   ],
   "explanation": "The material lists SFS advantages over traditional file sharing as elastic scaling, high performance and reliability, seamless NFS integration, easy operation with low cost, and multi-AZ file sharing. Greater capacity than traditional storage is not among the stated advantages.",
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
    "2024-25"
   ],
   "flag": "The capacity-greater-than-traditional-storage option is not on the advantages slide, so it is excluded, but it is arguably true in practice."
  },
  {
   "id": "m2425-33",
   "type": "multi",
   "stem": "Which of the following Huawei Cloud services are network security services?",
   "options": [
    {
     "key": "A",
     "text": "Cloud Bastion Host (CBH)"
    },
    {
     "key": "B",
     "text": "Security Group"
    },
    {
     "key": "C",
     "text": "Anti-DDoS Service (AAD)"
    },
    {
     "key": "D",
     "text": "Host Security Service (HSS)"
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "Security groups and Anti-DDoS protect the network layer, with security groups filtering traffic to ECSs and AAD defending against DDoS attacks. Host Security Service protects servers (compute security) and Cloud Bastion Host belongs to management and operations security.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     152,
     364
    ]
   },
   "sectionId": "cloud-6-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "The slide groups the services in a diagram whose layer assignment is partly inferred from layout."
  },
  {
   "id": "m2425-34",
   "type": "multi",
   "stem": "Which of the following attacks can WAF defend against?",
   "options": [
    {
     "key": "A",
     "text": "DDoS attack"
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
     "text": "CC attack"
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
   "mergedInto": null,
   "appearsIn": [
    "2024-25",
    "2025-26"
   ]
  },
  {
   "id": "m2425-35",
   "type": "multi",
   "stem": "Which of the following statements about gradient descent are false?",
   "options": [
    {
     "key": "A",
     "text": "Gradient descent can only handle linear regression problems."
    },
    {
     "key": "B",
     "text": "A higher learning rate necessarily results in faster convergence."
    },
    {
     "key": "C",
     "text": "Batch gradient descent uses the entire dataset to update parameters."
    },
    {
     "key": "D",
     "text": "Gradient descent is used to minimize loss functions."
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "explanation": "Gradient descent minimizes any differentiable loss function, including those of neural networks, so it is not limited to linear regression. A larger learning rate does not guarantee faster convergence because it can overshoot or diverge.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     91,
     94
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-36",
   "type": "multi",
   "stem": "Which of the following statements about k-fold cross validation are true?",
   "options": [
    {
     "key": "A",
     "text": "Each subset will serve as a validation set."
    },
    {
     "key": "B",
     "text": "K-fold cross validation can prevent model overfitting."
    },
    {
     "key": "C",
     "text": "A larger k value indicates higher model evaluation accuracy."
    },
    {
     "key": "D",
     "text": "K-fold cross validation divides a dataset into k subsets."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "explanation": "K-fold cross validation splits the dataset into k subsets and each subset serves once as the validation set while the others train. It is an evaluation method that does not by itself prevent overfitting, and a larger k does not automatically mean a more accurate evaluation.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-37",
   "type": "multi",
   "stem": "Which of the following statements about gradient descent are true?",
   "options": [
    {
     "key": "A",
     "text": "Gradient descent can always find the best points."
    },
    {
     "key": "B",
     "text": "Stochastic gradient descent uses only one sample at a time to compute the gradient."
    },
    {
     "key": "C",
     "text": "Batch gradient descent uses the entire dataset to compute the gradient in each iteration."
    },
    {
     "key": "D",
     "text": "Gradient descent is used to minimize loss functions."
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "Stochastic gradient descent uses one sample per update, batch gradient descent uses the whole training set each iteration, and gradient descent aims to minimize the loss function. It cannot guarantee finding the best point, since it can stop at local minima or saddle points.",
   "source": {
    "kind": "material",
    "pdf": "ai",
    "pages": [
     91,
     94
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-38",
   "type": "multi",
   "stem": "In a recurrent neural network (RNN), parameters of different states (time steps) are shared. Which of the following statements are true about the purpose of parameter sharing in this situation?",
   "options": [
    {
     "key": "A",
     "text": "Allowing the model to process variable-length input sequences"
    },
    {
     "key": "B",
     "text": "Reducing model complexity"
    },
    {
     "key": "C",
     "text": "Improving training efficiency"
    },
    {
     "key": "D",
     "text": "Enhancing model generalization"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "Sharing parameters across time steps lets one set of weights process sequences of any length, keeps the parameter count and model complexity low, makes training more efficient, and helps generalize patterns learned at one position to other positions.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-39",
   "type": "multi",
   "stem": "Which of the following are factors to consider when designing a cloud data center project?",
   "options": [
    {
     "key": "A",
     "text": "Reliability"
    },
    {
     "key": "B",
     "text": "Performance"
    },
    {
     "key": "C",
     "text": "Scalability"
    },
    {
     "key": "D",
     "text": "Security"
    }
   ],
   "answer": [
    "A",
    "B",
    "C",
    "D"
   ],
   "explanation": "A cloud data center design must balance reliability (redundancy and uptime), performance, scalability for growth, and security. All four are core design considerations.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25",
    "2025-26"
   ]
  },
  {
   "id": "m2425-40",
   "type": "multi",
   "stem": "Which of the following statements about security groups and network ACLs are true?",
   "options": [
    {
     "key": "A",
     "text": "Security groups support packet filtering based on a 3-tuple, whereas network ACLs support packet filtering based on a 5-tuple."
    },
    {
     "key": "B",
     "text": "A default security group allows all outgoing data packets and denies all incoming data packets."
    },
    {
     "key": "C",
     "text": "A network ACL is an optional layer of security for your subnets. After you associate one or more subnets with a network ACL, you can control traffic in and out of the subnets."
    },
    {
     "key": "D",
     "text": "If Elastic Cloud Servers (ECSs) are running in different Virtual Private Clouds (VPCs), but are associated with the same security group, they [can] communicate with each other by default."
    }
   ],
   "answer": [
    "B",
    "C"
   ],
   "explanation": "A default security group allows all outbound traffic and denies inbound traffic, and a network ACL is an optional subnet-level layer controlling traffic in and out of associated subnets. ECSs in different VPCs cannot communicate by default even with the same security group, unless a VPC peering connection is set up.",
   "source": {
    "kind": "material",
    "pdf": "cloud",
    "pages": [
     140,
     143,
     144
    ]
   },
   "sectionId": "cloud-3-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "The hidden word in the last option decides its truth: read as 'can' it is false per the PDF, read as 'cannot' it would be true. The 3-tuple versus 5-tuple claim is not in the PDF text and is excluded as unverified.",
   "note": "Part of option text was hidden in the source photo. The bracketed wording is a best reading, not confirmed. A near-identical 2025-26 question reads \"can\", but \"cannot\" would flip the meaning of this option."
  },
  {
   "id": "m2425-41",
   "type": "multi",
   "stem": "Which of the following statements are true about Hive user-defined functions (UDFs)?",
   "options": [
    {
     "key": "A",
     "text": "UDTFs are used to receive multiple rows of data and generate one row of results."
    },
    {
     "key": "B",
     "text": "Permanent functions can be used in multiple sessions. You do not need to create them every time a session restarts."
    },
    {
     "key": "C",
     "text": "Common UDFs are used to receive one row of data and generate one row of results."
    },
    {
     "key": "D",
     "text": "Temporary functions are not stored permanently. They can be used only in the current session and must be recreated after a session restart."
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "A common UDF maps one row to one row, permanent functions persist across sessions, and temporary functions only live in the current session. A UDTF takes one row and produces multiple rows, so describing it as multiple rows in and one row out is wrong.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-42",
   "type": "multi",
   "stem": "In a deep learning neural network, which of the following need to be considered when designing an activation function?",
   "options": [
    {
     "key": "A",
     "text": "Saturation"
    },
    {
     "key": "B",
     "text": "Computing efficiency"
    },
    {
     "key": "C",
     "text": "Computability of derivatives"
    },
    {
     "key": "D",
     "text": "Non-linear capability"
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
   "mergedInto": null,
   "appearsIn": [
    "2024-25",
    "2025-26"
   ]
  },
  {
   "id": "m2425-43",
   "type": "multi",
   "stem": "Which of the following can be used to connect an on-premises data center and a Huawei Cloud Virtual Private Cloud (VPC)?",
   "options": [
    {
     "key": "A",
     "text": "VPC peering connection"
    },
    {
     "key": "B",
     "text": "NET gateway"
    },
    {
     "key": "C",
     "text": "Virtual Private Network (VPN)"
    },
    {
     "key": "D",
     "text": "Direct Connect"
    }
   ],
   "answer": [
    "C",
    "D"
   ],
   "explanation": "VPN gives an IPsec-encrypted tunnel over the Internet and Direct Connect gives a dedicated channel, and both link an on-premises data center to a VPC. A VPC peering connection links two VPCs, and a NAT gateway only provides address translation.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-44",
   "type": "multi",
   "stem": "Which of the following are Kafka's message delivery semantics?",
   "options": [
    {
     "key": "A",
     "text": "At Most Once"
    },
    {
     "key": "B",
     "text": "At Least Once"
    },
    {
     "key": "C",
     "text": "At Most Twice"
    },
    {
     "key": "D",
     "text": "At Least Twice"
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "explanation": "Kafka supports at-most-once, at-least-once and exactly-once delivery semantics. Delivery counts such as 'at most twice' or 'at least twice' are not defined semantics.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-4",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-45",
   "type": "multi",
   "stem": "Which of the following statements are true about Flink bounded streams?",
   "options": [
    {
     "key": "A",
     "text": "Bounded stream processing is often referred to as stream processing."
    },
    {
     "key": "B",
     "text": "Both the start and end of a stream are defined."
    },
    {
     "key": "C",
     "text": "All data in a bounded stream can be sorted, without events needing to be ingested in order."
    },
    {
     "key": "D",
     "text": "Bounded streams can be computed after all data is read."
    }
   ],
   "answer": [
    "B",
    "C",
    "D"
   ],
   "explanation": "A bounded stream has a defined start and end, so all data can be ingested and sorted before computing, and results are produced after all data is read. Processing bounded streams is called batch processing, not stream processing.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-46",
   "type": "tf",
   "stem": "Huawei Cloud's ModelArts is a platform for developing, training, and deploying AI models efficiently.",
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
   "explanation": "ModelArts is Huawei Cloud's one-stop AI development platform that lets users build, train and deploy models from cloud to edge.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-47",
   "type": "tf",
   "stem": "With ModelArts, you can quickly build models using AutoML by dragging and dropping operations.",
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
   "explanation": "ModelArts offers auto learning that builds models without coding for tasks such as image classification and object detection, so models can be built quickly through a visual interface.",
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
    "2024-25"
   ],
   "flag": "The slides state that auto learning builds models without coding but do not explicitly mention drag-and-drop."
  },
  {
   "id": "m2425-48",
   "type": "tf",
   "stem": "During neural network training, overfitting is when a model performs well on the training data but poorly on the test data.",
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
   "explanation": "Overfitting means the model fits the training data too closely, including its noise, so it generalizes poorly and performs worse on test data. Regularization, dropout and early stopping are used to prevent it.",
   "source": {
    "kind": "material",
    "pdf": "ei-developer",
    "pages": [
     10,
     12
    ]
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
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
   "id": "m2425-49",
   "type": "tf",
   "stem": "ClickHouse is an open-source OLAP database developed by Yandex.",
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
   "explanation": "ClickHouse is an open-source column-oriented OLAP database management system originally developed by Yandex.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-5",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-50",
   "type": "tf",
   "stem": "An access control list (ACL) is a list of rules that specifies grantees and their granted permissions. An ACL cannot be applied to both the account and the users under the account.",
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
   "explanation": "An ACL grants permissions to grantees such as accounts and user groups, so it can apply to both the account and the users under it. The statement wrongly says it cannot.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-4-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "The ACL concept is not taught in the PDFs (only IAM permissions and bucket policies for OBS); the answer is a best guess from general Huawei Cloud knowledge."
  },
  {
   "id": "m2425-51",
   "type": "tf",
   "stem": "Resources used by Identity and Access Management (IAM) users in your account are billed to your account. IAM users do not need to make payments themselves.",
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
   "explanation": "Resources used by IAM users are billed to the account that owns them, so IAM users do not pay separately.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "cloud-5-2",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-52",
   "type": "tf",
   "stem": "When adding security group rules, comply with the principle of least privilege and exercise caution when using 0.0.0.0/0 (all IP addresses).",
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
   "explanation": "Security group rules should follow least privilege, opening only the required ports to the required source IP addresses. Allowing 0.0.0.0/0 exposes the ECS to all addresses and should be used with caution.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-53",
   "type": "tf",
   "stem": "E-commerce promotions such as flash sales typically lead to an instant spike in the number of requests (increasing dozens or even hundreds of times), resulting in high server load and slow system response. In this case, you can use Cloud Eye to monitor Elastic Cloud Server (ECS) metrics. For example, you can create alarm rules for the ECS CPU usage. When the CPU usage reaches a certain threshold, an alarm will be triggered, and a notification will be sent so that you can quickly handle the exception.",
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
   "explanation": "Cloud Eye monitors ECS metrics such as CPU usage, and an alarm rule can trigger a notification when the threshold is reached so the exception can be handled quickly.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-54",
   "type": "tf",
   "stem": "Logistic regression is an extension of linear regression. The difference between logistic regression and linear regression is that they have different loss functions.",
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
   "explanation": "Logistic regression extends linear regression for classification by adding a sigmoid mapping, and it is trained with a different loss function (cross-entropy rather than squared error).",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ],
   "flag": "Debatable wording: the sigmoid output mapping is also a difference, but the loss function does differ, so true is the best answer."
  },
  {
   "id": "m2425-55",
   "type": "tf",
   "stem": "Cloud Trace Service (CTS) records, queries, and transfers audit logs, encrypts trace files, and notifies users of key operations.",
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
   "explanation": "CTS records operations on the console and APIs, supports trace query, transfers traces to OBS, encrypts trace files with DEW keys, and can send key event notifications.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-56",
   "type": "tf",
   "stem": "With two given binary inputs, an exclusive OR logic gate outputs a predicted value. When the inputs are not equal, the output is 1; otherwise, the output is 0. A single-layer perceptron is a linear model but it can solve a nonlinear data problem such as exclusive or.",
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
   "explanation": "A single-layer perceptron is a linear model and can only separate linearly separable data. Exclusive OR is not linearly separable, so a single-layer perceptron cannot solve it.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "ai-2-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-57",
   "type": "tf",
   "stem": "The main purpose of adding an activation function to a neural network is to transform it into a nonlinear model",
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
   "explanation": "Without activation functions, stacked layers collapse into a linear transformation equivalent to a single-layer perceptron. Activation functions add nonlinearity, making the network a nonlinear model.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-58",
   "type": "tf",
   "stem": "Huawei Cloud Auto Scaling enables rapid, elastic scaling of cloud severs. It allows both manual adjustments and policy-driven automated scaling. To maintain service reliability, automated scaling is restricted to adding cloud servers. Capacity reduction must be managed by users manually.",
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
   "explanation": "Auto Scaling scaling actions both add and remove instances (and adjust bandwidth) when policy conditions are met. Capacity reduction is also automatic, not restricted to manual operation.",
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
    "2024-25"
   ]
  },
  {
   "id": "m2425-59",
   "type": "tf",
   "stem": "The default block size in HDFS for Hadoop 2.x is 256 MB, which means that files are split into multiple blocks serving as storage units. This approach offers several benefits, including the ability to store large files, simplified system design, and suitability for data backup.",
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
   "explanation": "The default HDFS block size in Hadoop 2.x is 128 MB, not 256 MB. The listed benefits of block-based storage are correct.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-1",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  },
  {
   "id": "m2425-60",
   "type": "tf",
   "stem": "Flink programs consist of three parts: Source, Transformation, and Sink. Sink is responsible for reading data from data sources such as HDFS, Kafka, and text.",
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
   "explanation": "In a Flink program the Source reads data from sources such as HDFS, Kafka and text files, whereas the Sink outputs the results. The statement wrongly assigns reading to the Sink.",
   "source": {
    "kind": "inferred"
   },
   "sectionId": "beyond-1-3",
   "mergedInto": null,
   "appearsIn": [
    "2024-25"
   ]
  }
 ]
});
