(function () {
  const opts = (a, b, c, d) => [['A', a], ['B', b], ['C', c], ['D', d]].map(([key, text]) => ({ key, text }));
  const tfo = [{ key: 'T', text: 'True' }, { key: 'F', text: 'False' }];
  const src = (...pages) => ({ kind: 'material', pdf: 'cloud', pages });
  const S = (id, stem, options, answer, explanation, pages) => ({ id, type: 'single', stem, options, answer, explanation, source: src(...pages) });
  const M = (id, stem, options, answer, explanation, pages) => ({ id, type: 'multi', stem, options, answer, explanation, source: src(...pages) });
  const T = (id, stem, answer, explanation, pages) => ({ id, type: 'tf', stem, options: tfo, answer: [answer], explanation, source: src(...pages) });

  const pre = [
    S('cloud-2-5-pre-01', 'Which Linux kernel functions form the core of container technology?',
      opts('SELinux and iptables', 'KVM and QEMU', 'namespace and CGroups', 'LVM and software RAID'), ['C'],
      'Containers rely on the namespace and CGroups functions of the Linux kernel to isolate processes, file systems, networks, and resources.', [114]),
    S('cloud-2-5-pre-02', 'An enterprise wants a managed, enterprise-class Kubernetes service on HUAWEI CLOUD to deploy, manage, and scale its containerized applications. Which service should it choose?',
      opts('Image Management Service (IMS)', 'Auto Scaling (AS)', 'Bare Metal Server (BMS)', 'Cloud Container Engine (CCE)'), ['D'],
      'CCE is a highly scalable, high-performance, enterprise-class Kubernetes service for running containers and applications. IMS, AS, and BMS do not provide Kubernetes cluster management.', [115]),
    M('cloud-2-5-pre-03', 'Which of the following functions does Kubernetes provide to application developers?',
      opts('Service discovery', 'Scaling', 'Load balancing', 'Self-healing'), ['A', 'B', 'C', 'D'],
      'Kubernetes acts as a cluster operating system and provides service discovery, scaling, load balancing, self-healing, and even leader election, so developers are freed from infrastructure-related configuration.', [114]),
    M('cloud-2-5-pre-04', 'Which of the following statements about Docker are correct?',
      opts('It is developed and implemented in the Go language.', 'It is developed and implemented in Java.', 'It encapsulates and isolates processes using Linux kernel technologies such as cgroup and namespace.', 'It is a hardware virtualization technology that depends on a hypervisor.'), ['A', 'C'],
      'Docker is written in Go and is an operating system virtualization technology built on cgroup, namespace, and Union FS. It does not use a hypervisor or Java.', [114]),
    T('cloud-2-5-pre-05', 'A Kubernetes cluster consists of master nodes and worker nodes. Applications are deployed on the master nodes, and users cannot choose which nodes an application runs on.', 'F',
      'Applications are deployed on worker nodes, and users can specify the nodes for deployment.', [114]),
  ];

  const post = [
    S('cloud-2-5-post-01', 'Which of the following statements about Kubernetes is false?',
      opts('For application developers, Kubernetes can be regarded as a cluster operating system.', 'It frees developers from infrastructure-related configurations.', 'The method for deploying applications changes depending on the number of servers in the cluster.', 'The "8" in K8S stands for the eight letters in "ubernete".'), ['C'],
      'Regardless of how many servers a Kubernetes cluster contains, applications are deployed in the same way, as if running on one large server.', [114]),
    S('cloud-2-5-post-02', 'Which of the following statements about the nodes in a CCE cluster is correct?',
      opts('A cluster can contain VM nodes, bare-metal nodes, or both.', 'A cluster can contain only VM nodes.', 'A cluster can contain only bare-metal nodes.', 'All nodes in a cluster must be of the same type.'), ['A'],
      'CCE lets you create either VM nodes or bare-metal nodes, or both, in the same cluster.', [116]),
    M('cloud-2-5-post-03', 'Which of the following are "Easy to Use" capabilities of CCE?',
      opts('Kubernetes clusters can be created in a few clicks on the console.', 'Application Service Mesh (ASM) and Helm charts are pre-integrated.', 'Cluster upgrades require custom scripts run outside the console.', 'Clusters and workloads must be scaled with separate third-party tools.'), ['A', 'B'],
      'Cluster creation, scaling, and upgrades are available on the console, and ASM and Helm charts are pre-integrated for out-of-the-box usability.', [116]),
    M('cloud-2-5-post-04', 'Which of the following contribute to the high performance of CCE?',
      opts('Bare-metal servers with a NUMA architecture', 'High-speed InfiniBand network cards', 'Standard Ethernet NICs on VM nodes, which yield the same three- to five-fold improvement', 'The ability to concurrently launch containers at scale'), ['A', 'B', 'D'],
      'Bare-metal NUMA and InfiniBand NICs yield a three- to five-fold computing improvement, and containers can be launched concurrently at scale. VM nodes with standard NICs are not the source of that improvement.', [116]),
    T('cloud-2-5-post-05', 'CCE lets you create 3 master nodes for the cluster control plane to avoid single points of failure, so a fault in one or two of the master nodes does not interrupt the whole cluster. Nodes and workloads can also be deployed across AZs.', 'T',
      'This matches CCE high availability: three masters tolerate one or two failures, and the multi-AZ deployment protects against host faults and data center outages.', [117]),
  ];

  const summative = [
    S('cloud-2-5-summative-01', 'An online retailer runs a flash sale and its traffic spikes sharply for short periods. It wants its Kubernetes workloads to follow the load without manual intervention. Which description of what CCE does is correct?',
      opts('It requires administrators to purchase servers manually before each sale.', 'It scales only the containers of a workload and never adds servers.', 'It scales only the cluster nodes and never changes containers.', 'It adjusts compute resources according to auto scaling policies, adding or reducing cloud servers for the cluster and containers for the workload.'), ['D'],
      'CCE auto scaling policies add or reduce cloud servers for the cluster and containers for the workload, so capacity follows fluctuating loads.', [118]),
    S('cloud-2-5-summative-02', 'Which of the following is not a benefit of CCE auto scaling for fluctuating loads?',
      opts('You pay for peak-capacity servers even when the load is low.', 'Multiple scaling policies are supported, and containers can be provisioned within seconds when conditions are met.', 'Unhealthy pods are automatically replaced with new ones.', 'You are billed only for the cloud servers you use.'), ['A'],
      'The benefits are flexibility, high availability through pod replacement, and low cost because billing covers only the servers actually used.', [118]),
    S('cloud-2-5-summative-03', 'A company is concerned that the failure of one control-plane node could take down its whole Kubernetes cluster and that a data center outage could interrupt services. Which CCE design addresses both concerns?',
      opts('Use one high-specification master node.', 'Deploy nodes and workloads across AZs, but keep a single master node.', 'Create 3 master nodes and deploy nodes and workloads across AZs.', 'Create 3 master nodes, but place all nodes and workloads in one AZ.'), ['C'],
      'Three master nodes avoid a single point of failure on the control plane, and cross-AZ deployment keeps services running through host faults and data center outages. Each of the other designs covers at most one of the two risks.', [117]),
    S('cloud-2-5-summative-04', 'Which statement correctly describes the roles of Docker and Kubernetes?',
      opts('Kubernetes made containers portable across machines, while Docker handles scheduling and orchestration.', 'Docker simplifies packaging an application with its dependencies, while Kubernetes handles container scheduling and orchestration.', 'Both are hypervisors that run guest operating systems.', 'Docker replaces the namespace and CGroups functions of the Linux kernel.'), ['B'],
      'Docker made containers portable and simplified application and dependency packaging, whereas Kubernetes deploys, schedules, and orchestrates containerized applications. Docker builds on namespace and CGroups rather than replacing them.', [114]),
    M('cloud-2-5-summative-05', 'Which of the following workloads are typical scenarios for CCE auto scaling?',
      opts('An online shop during promotions and flash sales', 'A live streaming service whose load often fluctuates', 'A static intranet page with constant, low traffic', 'A game where many players go online in certain time periods'), ['A', 'B', 'D'],
      'Auto scaling suits shopping apps during promotions, live streaming, and games, all of which have fluctuating loads. A constant-traffic page gains little from it.', [118]),
    M('cloud-2-5-summative-06', 'Which of the following statements about security and availability in CCE are correct?',
      opts('Clusters are private and completely controlled by the users who create them.', 'Different RBAC permissions can be set for sub-users on the console.', 'Faults in one or two of the three master nodes do not interrupt the whole cluster.', 'A multi-active architecture across AZs keeps services running through host faults and natural disasters.'), ['A', 'B', 'C', 'D'],
      'CCE clusters are private and fully controlled by their users, Kubernetes RBAC is deeply integrated so sub-users can have different permissions, three master nodes tolerate one or two failures, and the multi-active multi-AZ design keeps services running through host faults and disasters.', [117]),
    M('cloud-2-5-summative-07', 'Which of the following statements about the openness and compatibility of CCE are correct?',
      opts('It is compatible with Kubernetes native APIs.', 'It cannot be used with kubectl, so all operations must go through the console.', 'It is built on Kubernetes rather than on a proprietary orchestration engine.', 'It streamlines deployment, resource scheduling, service discovery, and dynamic scaling of applications running in Docker containers.'), ['A', 'C', 'D'],
      'CCE is built on Kubernetes, so it works with native Kubernetes APIs and the kubectl command line tool, and it streamlines deployment, scheduling, service discovery, and scaling of Docker container applications. The claim that kubectl is unsupported is wrong.', [117]),
    T('cloud-2-5-summative-08', 'CCE auto scaling policies can be flexibly combined to deal with in-the-moment load spikes, and clusters and workloads can be scaled in a few clicks on the console. However, upgrading a Kubernetes cluster still requires rebuilding it, because the console does not support upgrades.', 'F',
      'The console also makes cluster upgrades easy, so no rebuild is needed.', [116]),
    T('cloud-2-5-summative-09', 'An enterprise needs one Kubernetes platform that can run GPU- and Arm-based containers and keep its clusters available through a data center outage. CCE can meet both needs.', 'T',
      'CCE supports heterogeneous computing architectures such as GPU, NPU, and Arm, and its multi-AZ and multi-region disaster recovery support keeps Kubernetes clusters highly available, so both requirements fit.', [115]),
    T('cloud-2-5-summative-10', 'Docker is an operating system virtualization technology, and an isolated process that is independent of the host and other isolated processes is also called a container. Docker further encapsulates the file system, network interconnection, and process isolation on top of containers, which makes container creation and maintenance more complex.', 'F',
      'The extra encapsulation of file system, networking, and process isolation greatly simplifies container creation and maintenance.', [114]),
  ];

  HR.registerSection({
    id: 'cloud-2-5',
    notes: [
      { heading: 'Containers, Docker, and Kubernetes', pages: [114, 114], bullets: [
        'A container is a lightweight virtualization technology that packs an application and its dependencies into an independent running environment for quick deployment and migration.',
        'Isolation of processes, file systems, networks, and resources comes from the namespace and CGroups functions of the Linux kernel.',
        'Docker was the first system to make containers portable across machines; it is written in Go and builds on cgroup, namespace, and Union FS, and it simplifies packaging of applications and dependencies.',
        'Kubernetes (K8S, where 8 stands for the eight letters in "ubernete") handles container scheduling and orchestration and acts like a cluster operating system with service discovery, scaling, load balancing, self-healing, and leader election.',
        'A Kubernetes cluster has master nodes and worker nodes; applications run on worker nodes and you can choose which ones.',
      ] },
      { heading: 'What CCE is', pages: [115, 115], bullets: [
        'Cloud Container Engine (CCE) is a highly scalable, high-performance, enterprise-class Kubernetes service for deploying, managing, and scaling containerized applications on HUAWEI CLOUD.',
        'It is a one-stop platform integrating compute, networking, and storage, supports GPU, NPU, and Arm heterogeneous computing, and offers multi-AZ and multi-region disaster recovery.',
      ] },
      { heading: 'Easy to use and high performance', pages: [116, 116], bullets: [
        'Clusters are created in a few console clicks and can contain VM nodes, bare-metal nodes, or both.',
        'Deployment, O&M, scaling of clusters and workloads, and cluster upgrades are all handled on the console, and auto scaling policies can be combined to absorb load spikes.',
        'ASM and Helm charts are pre-integrated for out-of-the-box use.',
        'Bare-metal servers with NUMA and high-speed InfiniBand NICs give a three- to five-fold computing improvement, and containers can be launched concurrently at scale.',
      ] },
      { heading: 'Highly available, secure, open, and compatible', pages: [117, 117], bullets: [
        'Three master nodes on the control plane avoid single points of failure, and faults in one or two of them do not interrupt the cluster.',
        'Nodes and workloads can be deployed across AZs, giving a multi-active architecture that survives host faults, data center outages, and disasters.',
        'Clusters are private and fully controlled by users, and integrated Kubernetes RBAC lets you give sub-users different permissions on the console.',
        'CCE is built on Kubernetes, compatible with native Kubernetes APIs and kubectl, and supports the latest Kubernetes and Docker releases.',
      ] },
      { heading: 'Scenario: auto scaling in seconds', pages: [118, 118], bullets: [
        'Typical uses are shopping apps and websites during promotions, live streaming with fluctuating loads, and games with many players online in certain periods.',
        'CCE adjusts resources by auto scaling policies, adding or reducing cloud servers for the cluster and containers for the workload.',
        'Benefits: flexible scaling policies with containers provisioned within seconds, high availability through replacement of unhealthy pods, and low cost since you pay only for the servers you use.',
      ] },
    ],
    tests: { pre, post, summative },
    shortfall: {},
  });
})();
