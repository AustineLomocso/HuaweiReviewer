HR.registerSection({
 "id": "fundamentals1-5",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-5-o1",
   "description": "Evaluate benefits together with potential harms.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o2",
   "description": "Recognize conflicts among values and stakeholders.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o3",
   "description": "Identify missing populations in selected historical data.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o4",
   "description": "Analyze privacy and transparency concerns.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o5",
   "description": "Distinguish realistic media from authentic evidence.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o6",
   "description": "Combine multiple defenses against misinformation.",
   "pages": [
    31,
    39
   ]
  },
  {
   "id": "fundamentals1-5-o7",
   "description": "Assign responsible-AI activities across the development lifecycle.",
   "pages": [
    31,
    39
   ]
  }
 ],
 "notes": [
  {
   "heading": "Benefits and costs",
   "pages": [
    32,
    32
   ],
   "bullets": [
    "Evaluate the actual deployment, including who gains and who can be harmed. Productivity, convenience, or personalization is one part of the decision, not a complete ethical assessment."
   ],
   "objectiveIds": [
    "fundamentals1-5-o1"
   ]
  },
  {
   "heading": "Conflicting values",
   "pages": [
    33,
    33
   ],
   "bullets": [
    "A system can face competing harms or obligations. Identify the stakeholders and values before selecting a decision rule. The source does not provide one universal correct answer to every moral dilemma."
   ],
   "objectiveIds": [
    "fundamentals1-5-o2"
   ]
  },
  {
   "heading": "Dataset selection",
   "pages": [
    34,
    34
   ],
   "bullets": [
    "Ask which people or cases are missing from historical data. A model can reproduce the selection process that created the dataset rather than fairly represent the intended population."
   ],
   "objectiveIds": [
    "fundamentals1-5-o3"
   ]
  },
  {
   "heading": "Privacy",
   "pages": [
    35,
    35
   ],
   "bullets": [
    "Distinguish a useful feature from the collection and reuse of personal information that enables it. Examine transparency, consent, and the user's ability to understand data use."
   ],
   "objectiveIds": [
    "fundamentals1-5-o4"
   ]
  },
  {
   "heading": "Authenticity",
   "pages": [
    36,
    36
   ],
   "bullets": [
    "Generated media can imitate real people and events. Realism and provenance are separate properties; a persuasive recording can still be a fabrication."
   ],
   "objectiveIds": [
    "fundamentals1-5-o5"
   ]
  },
  {
   "heading": "Layered defenses",
   "pages": [
    37,
    37
   ],
   "bullets": [
    "Technical provenance, accountability, and media literacy address different weaknesses. Combine them instead of treating a detector or watermark as a complete defense."
   ],
   "objectiveIds": [
    "fundamentals1-5-o6"
   ]
  },
  {
   "heading": "Lifecycle synthesis",
   "pages": [
    38,
    39
   ],
   "bullets": [
    "Responsible AI spans dataset design, training standards, and post-deployment oversight. Human-centricity, fairness, transparency, security, and accountability require operational choices.",
    "Worked synthesis: for a public-facing assistant, examine whether its data omit users, whether personal information is reused transparently, whether generated claims can be traced, and who responds to harmful outcomes. These are distinct checks; a high accuracy score cannot substitute for all of them."
   ],
   "objectiveIds": [
    "fundamentals1-5-o7"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 7,
   "rationale": "7 authored items assess 7 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 7,
   "rationale": "7 authored items assess 7 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 7,
   "rationale": "7 authored items assess 7 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-5-pre-01",
    "type": "tf",
    "stem": "An application can create both a useful service and a new harm, so evaluating only its speed is incomplete.",
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
    "explanation": "The source pairs benefits and harms in the same application domains.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      32
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o1"
    ]
   },
   {
    "id": "fundamentals1-5-pre-02",
    "type": "single",
    "stem": "A review must choose between protecting different people from harm. What is needed beyond predicting outcomes?",
    "options": [
     {
      "key": "A",
      "text": "A larger file format"
     },
     {
      "key": "B",
      "text": "A judgment about competing obligations"
     },
     {
      "key": "C",
      "text": "A new product name"
     },
     {
      "key": "D",
      "text": "An assumption that all communities agree"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The moral-dilemma discussion concerns competing values and cultural judgments as well as predicted consequences.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      33
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o2"
    ]
   },
   {
    "id": "fundamentals1-5-pre-03",
    "type": "single",
    "stem": "A model trained only on approved cases is used to evaluate all future cases. What question best probes selection bias?",
    "options": [
     {
      "key": "A",
      "text": "Who was excluded from the training records?"
     },
     {
      "key": "B",
      "text": "Which color is used in the dashboard?"
     },
     {
      "key": "C",
      "text": "How short can the model name be?"
     },
     {
      "key": "D",
      "text": "Can the same records be duplicated?"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "The survivorship example concerns missing populations and selected historical data.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o3"
    ]
   },
   {
    "id": "fundamentals1-5-pre-04",
    "type": "tf",
    "stem": "Accurate recognition of personal data makes undisclosed reuse of that data ethically irrelevant.",
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
    "explanation": "The privacy concern is about collection, transparency, consent, and control, not only recognition accuracy.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o4"
    ]
   },
   {
    "id": "fundamentals1-5-pre-05",
    "type": "single",
    "stem": "A fabricated recording is visually and audibly convincing. Which property remains unestablished?",
    "options": [
     {
      "key": "A",
      "text": "Its ability to persuade"
     },
     {
      "key": "B",
      "text": "Its media format"
     },
     {
      "key": "C",
      "text": "Its authentic origin"
     },
     {
      "key": "D",
      "text": "Its apparent realism"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "Realism is compatible with fabrication, so provenance remains a separate question.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      36
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o5"
    ]
   },
   {
    "id": "fundamentals1-5-pre-06",
    "type": "multi",
    "stem": "Which are distinct defense layers in the source? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Technical provenance tools"
     },
     {
      "key": "B",
      "text": "Public ability to assess manipulated content"
     },
     {
      "key": "C",
      "text": "Institutional accountability"
     },
     {
      "key": "D",
      "text": "Assuming familiar voices cannot be synthesized"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The first three are technical, societal, and institutional responses. Familiar appearance or sound is not sufficient authentication.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      37
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o6"
    ]
   },
   {
    "id": "fundamentals1-5-pre-07",
    "type": "single",
    "stem": "Who should be responsible for harmful outcomes after deployment?",
    "options": [
     {
      "key": "A",
      "text": "Nobody, because training has ended"
     },
     {
      "key": "B",
      "text": "Only whoever wrote the first dataset filename"
     },
     {
      "key": "C",
      "text": "The user by definition in every possible case"
     },
     {
      "key": "D",
      "text": "Parties identified through explicit oversight and accountability arrangements"
     }
    ],
    "answer": [
     "D"
    ],
    "explanation": "The source calls for defined accountability and oversight rather than ending responsibility at deployment or assigning it arbitrarily.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o7"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-5-post-01",
    "type": "single",
    "stem": "A city gains faster service from AI but observes unequal access. Which evaluation matches the lesson?",
    "options": [
     {
      "key": "A",
      "text": "Discard the access concern because speed improved"
     },
     {
      "key": "B",
      "text": "Treat the benefit and the inequality as separate factors to assess together"
     },
     {
      "key": "C",
      "text": "Conclude that every use of AI must have the same outcome"
     },
     {
      "key": "D",
      "text": "Use model size as the sole measure of fairness"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "Benefits and harms must be evaluated together; one improvement does not resolve every impact.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      32
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o1"
    ]
   },
   {
    "id": "fundamentals1-5-post-02",
    "type": "tf",
    "stem": "A moral disagreement necessarily means the parties disagree about technical predictions.",
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
    "explanation": "Parties can accept the same predicted consequences while assigning different importance to values or obligations.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      33
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o2"
    ]
   },
   {
    "id": "fundamentals1-5-post-03",
    "type": "multi",
    "stem": "Which changes may improve analysis of a selected recruiting dataset? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Examine relevant rejected or unobserved cases"
     },
     {
      "key": "B",
      "text": "Check representation across the intended population"
     },
     {
      "key": "C",
      "text": "Treat employees as automatically representative of all applicants"
     },
     {
      "key": "D",
      "text": "Replace missing evidence with confidence in the algorithm"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "Examining omitted cases and representation addresses selection. Assuming representativeness or algorithmic neutrality does not.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o3"
    ]
   },
   {
    "id": "fundamentals1-5-post-04",
    "type": "single",
    "stem": "Users know a device records speech but do not know it is reused for unrelated analysis. Which distinction matters?",
    "options": [
     {
      "key": "A",
      "text": "Awareness of initial collection versus awareness of subsequent use"
     },
     {
      "key": "B",
      "text": "Audio sampling rate versus image resolution"
     },
     {
      "key": "C",
      "text": "Logical implication versus numerical precision"
     },
     {
      "key": "D",
      "text": "Training speed versus interface animation"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "The source concerns transparency and autonomy over data uses. Knowing that collection occurs does not establish understanding of every reuse.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o4"
    ]
   },
   {
    "id": "fundamentals1-5-post-05",
    "type": "tf",
    "stem": "The misinformation risk described depends on fabricated media being obviously poor quality.",
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
    "explanation": "The risk increases because generated media can be highly realistic and hard to distinguish from authentic material.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      36
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o5"
    ]
   },
   {
    "id": "fundamentals1-5-post-06",
    "type": "single",
    "stem": "A technically sophisticated detector is introduced without any public education. Which source recommendation remains relevant?",
    "options": [
     {
      "key": "A",
      "text": "Replace accountability with confidence scores"
     },
     {
      "key": "B",
      "text": "Assume the detector will prevent every misuse"
     },
     {
      "key": "C",
      "text": "Add media literacy as part of a coordinated defense"
     },
     {
      "key": "D",
      "text": "Treat unflagged content as proven genuine"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The source combines technical defenses with public education and accountability, not blanket trust in one detector.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      37
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o6"
    ]
   },
   {
    "id": "fundamentals1-5-post-07",
    "type": "multi",
    "stem": "Which activities span the responsible-AI lifecycle? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Including counterexamples in dataset design"
     },
     {
      "key": "B",
      "text": "Using transparent training standards"
     },
     {
      "key": "C",
      "text": "Monitoring outcomes and defining accountability"
     },
     {
      "key": "D",
      "text": "Ending oversight when a benchmark target is met"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The lifecycle includes curation, standards, and continuing oversight. Benchmark success does not end responsibility.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38,
      39
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o7"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-5-summative-01",
    "type": "single",
    "stem": "An education system improves average results but disadvantages learners without reliable access. Which conclusion is justified?",
    "options": [
     {
      "key": "A",
      "text": "Average improvement proves equitable benefit"
     },
     {
      "key": "B",
      "text": "The adverse effect is unrelated because the system is personalized"
     },
     {
      "key": "C",
      "text": "The educational benefit and unequal access both require evaluation"
     },
     {
      "key": "D",
      "text": "No evaluation is possible until every learner has identical outcomes"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The source pairs tailored education with possible amplified inequality. An average benefit does not settle distributional concerns.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      32
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o1"
    ]
   },
   {
    "id": "fundamentals1-5-summative-02",
    "type": "multi",
    "stem": "When analyzing a moral dilemma, which steps fit the source discussion? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Identify affected stakeholders"
     },
     {
      "key": "B",
      "text": "Identify the values in conflict"
     },
     {
      "key": "C",
      "text": "Assume one prediction determines a universal moral rule"
     },
     {
      "key": "D",
      "text": "Distinguish outcome information from value judgments"
     }
    ],
    "answer": [
     "A",
     "B",
     "D"
    ],
    "explanation": "Stakeholders, values, and the distinction between predictions and judgments help analyze the dilemma. No universal rule follows from prediction alone.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      33
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o2"
    ]
   },
   {
    "id": "fundamentals1-5-summative-03",
    "type": "tf",
    "stem": "If historical selection favored one group, training on the selected records can preserve that pattern even without an explicit rule naming the group.",
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
    "explanation": "The source warns that data-driven systems can amplify existing inequality through selected historical data.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o3"
    ]
   },
   {
    "id": "fundamentals1-5-summative-04",
    "type": "single",
    "stem": "A team reviews the privacy of an AI product. Which evidence is most relevant to the lesson?",
    "options": [
     {
      "key": "A",
      "text": "Whether generated answers match a public task-performance benchmark"
     },
     {
      "key": "B",
      "text": "What personal data are collected and how their use is explained"
     },
     {
      "key": "C",
      "text": "Whether service uptime meets the application availability target"
     },
     {
      "key": "D",
      "text": "Whether inference cost is acceptable for the expected user volume"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The privacy discussion centers on personal data collection, reuse, transparency, and autonomy.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      35
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o4"
    ]
   },
   {
    "id": "fundamentals1-5-summative-05",
    "type": "multi",
    "stem": "Which consequences of fabricated media are identified in the source? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Impersonation"
     },
     {
      "key": "B",
      "text": "Scams and misleading information"
     },
     {
      "key": "C",
      "text": "Erosion of trust"
     },
     {
      "key": "D",
      "text": "Automatic proof that every recording is fake"
     }
    ],
    "answer": [
     "A",
     "B",
     "C"
    ],
    "explanation": "The source describes impersonation, scams, and damage to trust. A risk of fabrication does not establish that all recordings are fabricated.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      36
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o5"
    ]
   },
   {
    "id": "fundamentals1-5-summative-06",
    "type": "tf",
    "stem": "A system using content credentials may still need accountability processes and public media literacy.",
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
    "explanation": "The source argues for coordinated layers and states that no one measure stands alone.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      37
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o6"
    ]
   },
   {
    "id": "fundamentals1-5-summative-07",
    "type": "single",
    "stem": "A deployment review finds biased data, unclear evaluation standards, and no response owner for failures. Which response is most complete?",
    "options": [
     {
      "key": "A",
      "text": "Change only the model's name"
     },
     {
      "key": "B",
      "text": "Fix the dataset and declare all later responsibilities resolved"
     },
     {
      "key": "C",
      "text": "Write an ethical slogan without changing practices"
     },
     {
      "key": "D",
      "text": "Address curation, standards, and post-deployment accountability together"
     }
    ],
    "answer": [
     "D"
    ],
    "explanation": "The findings cross all three lifecycle stages. A single cosmetic or partial action does not address the combined issues.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      38,
      39
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-o7"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-4",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
