HR.registerStructure({
  courses: [
    {
      id: 'ai', pdf: 'ai', title: 'HCIA-AI Solution V1.0', pageCount: 387,
      chapters: [
        { id: 'ai-1', num: '1', title: 'History and Trends of AI', pages: [1, 68], subs: [
          { id: 'ai-1-1', num: '1.1', title: 'History of AI', pages: [1, 12] },
          { id: 'ai-1-2', num: '1.2', title: 'History of Foundation Models', pages: [13, 28] },
          { id: 'ai-1-3', num: '1.3', title: 'Overview and Influence of DeepSeek', pages: [29, 37] },
          { id: 'ai-1-4', num: '1.4', title: 'Evolution of Foundation Models', pages: [38, 68] },
        ] },
        { id: 'ai-2', num: '2', title: 'AI and Computing Power Basics', pages: [69, 165], subs: [
          { id: 'ai-2-1', num: '2.1', title: 'Introduction to Neural Network Basics', pages: [69, 120] },
          { id: 'ai-2-2', num: '2.2', title: 'Model Architecture', pages: [121, 142] },
          { id: 'ai-2-3', num: '2.3', title: 'Basic Concepts of Computing Power', pages: [143, 155] },
          { id: 'ai-2-4', num: '2.4', title: 'Introduction to AI Chips', pages: [156, 165] },
        ] },
        { id: 'ai-3', num: '3', title: 'AI Business Process Overview', pages: [166, 244], subs: [
          { id: 'ai-3-1', num: '3.1', title: 'AI Business Process', pages: [166, 182] },
          { id: 'ai-3-2', num: '3.2', title: 'Large Model Business Process', pages: [183, 212] },
          { id: 'ai-3-3', num: '3.3', title: 'Use of Large Models and Prompt Engineering', pages: [213, 244] },
        ] },
        { id: 'ai-4', num: '4', title: 'AI Solutions and Products', pages: [245, 287], subs: [
          { id: 'ai-4-1', num: '4.1', title: 'Computing Solutions', pages: [245, 254] },
          { id: 'ai-4-2', num: '4.2', title: 'Network Solutions and Products', pages: [255, 262] },
          { id: 'ai-4-3', num: '4.3', title: 'Storage Solutions and Products', pages: [263, 271] },
          { id: 'ai-4-4', num: '4.4', title: 'Concept of Green Data Centers', pages: [272, 287] },
        ] },
        { id: 'ai-5', num: '5', title: 'Large Model Deployment and Business Model Introduction', pages: [288, 323], subs: [
          { id: 'ai-5-1', num: '5.1', title: 'Introduction to Large Model Deployment', pages: [288, 314] },
          { id: 'ai-5-2', num: '5.2', title: 'Large Model Business Model', pages: [315, 323] },
        ] },
        { id: 'ai-6', num: '6', title: 'Large Models and Applications in the Industry', pages: [324, 387], subs: [
          { id: 'ai-6-1', num: '6.1', title: 'Common Large Models in the Industry', pages: [324, 339] },
          { id: 'ai-6-2', num: '6.2', title: 'How to Apply Large Model: RAG', pages: [340, 355] },
          { id: 'ai-6-3', num: '6.3', title: 'How to Apply Large Model: Agent', pages: [356, 387] },
        ] },
      ],
    },
    {
      id: 'cloud', pdf: 'cloud', title: 'HCIA-Cloud Service V3.5', pageCount: 404,
      chapters: [
        { id: 'cloud-1', num: '1', title: 'Cloud Basics', pages: [1, 56], subs: [
          { id: 'cloud-1-1', num: '1.1', title: 'Cloud Computing Basics', pages: [1, 12] },
          { id: 'cloud-1-2', num: '1.2', title: 'Public Cloud Overview', pages: [13, 23] },
          { id: 'cloud-1-3', num: '1.3', title: 'HUAWEI CLOUD Overview', pages: [24, 56] },
        ] },
        { id: 'cloud-2', num: '2', title: 'Compute Cloud Services', pages: [57, 129], subs: [
          { id: 'cloud-2-1', num: '2.1', title: 'Elastic Cloud Server (ECS)', pages: [57, 83] },
          { id: 'cloud-2-2', num: '2.2', title: 'Image Management Service (IMS)', pages: [84, 95] },
          { id: 'cloud-2-3', num: '2.3', title: 'Auto Scaling (AS)', pages: [96, 104] },
          { id: 'cloud-2-4', num: '2.4', title: 'Bare Metal Server (BMS)', pages: [105, 112] },
          { id: 'cloud-2-5', num: '2.5', title: 'Cloud Container Engine (CCE)', pages: [113, 118] },
          { id: 'cloud-2-6', num: '2.6', title: 'Other Compute Services', pages: [119, 129] },
        ] },
        { id: 'cloud-3', num: '3', title: 'Network Cloud Services', pages: [130, 212], subs: [
          { id: 'cloud-3-1', num: '3.1', title: 'Virtual Private Cloud (VPC)', pages: [130, 154] },
          { id: 'cloud-3-2', num: '3.2', title: 'Elastic IP (EIP)', pages: [155, 159] },
          { id: 'cloud-3-3', num: '3.3', title: 'Elastic Load Balance (ELB)', pages: [160, 174] },
          { id: 'cloud-3-4', num: '3.4', title: 'Virtual Private Network (VPN)', pages: [175, 185] },
          { id: 'cloud-3-5', num: '3.5', title: 'NAT Gateway', pages: [186, 199] },
          { id: 'cloud-3-6', num: '3.6', title: 'Other Services', pages: [200, 212] },
        ] },
        { id: 'cloud-4', num: '4', title: 'Storage Cloud Services', pages: [213, 269], subs: [
          { id: 'cloud-4-1', num: '4.1', title: 'Elastic Volume Service', pages: [213, 229] },
          { id: 'cloud-4-2', num: '4.2', title: 'Object Storage Service', pages: [230, 243] },
          { id: 'cloud-4-3', num: '4.3', title: 'Scalable File Service', pages: [244, 256] },
          { id: 'cloud-4-4', num: '4.4', title: 'Cloud Backup and Recovery Service', pages: [257, 269] },
        ] },
        { id: 'cloud-5', num: '5', title: 'HUAWEI CLOUD O&M Basics', pages: [270, 329], subs: [
          { id: 'cloud-5-1', num: '5.1', title: 'O&M Basic Concepts and Principles', pages: [270, 278] },
          { id: 'cloud-5-2', num: '5.2', title: 'Identity and Access Management (IAM)', pages: [279, 286] },
          { id: 'cloud-5-3', num: '5.3', title: 'Simple Message Notification (SMN)', pages: [287, 292] },
          { id: 'cloud-5-4', num: '5.4', title: 'Cloud Eye Service (CES)', pages: [293, 302] },
          { id: 'cloud-5-5', num: '5.5', title: 'Log Tank Service (LTS)', pages: [303, 313] },
          { id: 'cloud-5-6', num: '5.6', title: 'Cloud Trace Service (CTS)', pages: [314, 329] },
        ] },
        { id: 'cloud-6', num: '6', title: 'Database, Security, and other Services', pages: [330, 404], subs: [
          { id: 'cloud-6-1', num: '6.1', title: 'Database Services', pages: [330, 361] },
          { id: 'cloud-6-2', num: '6.2', title: 'Security Services', pages: [362, 378] },
          { id: 'cloud-6-3', num: '6.3', title: 'Content Delivery Network (CDN)', pages: [379, 384] },
          { id: 'cloud-6-4', num: '6.4', title: 'API Services', pages: [385, 389] },
          { id: 'cloud-6-5', num: '6.5', title: 'EI Services', pages: [390, 404] },
        ] },
      ],
    },
    {
      id: 'beyond', title: 'Beyond the Course Material', external: true,
      chapters: [
        { id: 'beyond-1', num: '1', title: 'Big Data', subs: [
          { id: 'beyond-1-1', num: '1.1', title: 'Hadoop, YARN, HBase and Hive' },
          { id: 'beyond-1-2', num: '1.2', title: 'Spark' },
          { id: 'beyond-1-3', num: '1.3', title: 'Flink' },
          { id: 'beyond-1-4', num: '1.4', title: 'Kafka' },
          { id: 'beyond-1-5', num: '1.5', title: 'Elasticsearch and ClickHouse' },
        ] },
        { id: 'beyond-2', num: '2', title: 'AI/ML Fundamentals and Frameworks', subs: [
          { id: 'beyond-2-1', num: '2.1', title: 'Machine Learning Fundamentals' },
          { id: 'beyond-2-2', num: '2.2', title: 'Deep Learning Frameworks' },
          { id: 'beyond-2-3', num: '2.3', title: 'MindSpore' },
          { id: 'beyond-2-4', num: '2.4', title: 'Ascend and CANN' },
          { id: 'beyond-2-5', num: '2.5', title: 'Image Processing' },
        ] },
        { id: 'beyond-3', num: '3', title: 'Cloud Data Center and Networking', subs: [
          { id: 'beyond-3-1', num: '3.1', title: 'Data Center Design and Network Virtualization' },
        ] },
      ],
    },
  ],
  mocks: [
    { id: 'm2324', year: '2023-24', title: 'ICT Competition 2023-2024 Practice Competition, Cloud Track' },
    { id: 'm2425', year: '2024-25', title: 'Huawei ICT Competition 2024-2025 Preliminary Stage, Cloud Track Mock Exam' },
    { id: 'm2526', year: '2025-26', title: 'Huawei ICT Competition 2025-2026 Preliminary Mock Exam, Cloud Track' },
  ],
});
