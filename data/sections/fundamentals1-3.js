HR.registerSection({
 "id": "fundamentals1-3",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-3-o1",
   "description": "Explain symbolic knowledge and rule-based reasoning.",
   "pages": [
    22,
    27
   ]
  },
  {
   "id": "fundamentals1-3-o2",
   "description": "Explain connectionist learning from data and loss.",
   "pages": [
    22,
    27
   ]
  },
  {
   "id": "fundamentals1-3-o3",
   "description": "Explain behaviorist learning through environmental consequences.",
   "pages": [
    22,
    27
   ]
  }
 ],
 "notes": [
  {
   "heading": "Symbolic reasoning",
   "pages": [
    23,
    25
   ],
   "bullets": [
    "Symbols and explicit knowledge support inference through rules. Inspect both the reasoning path and whether the represented knowledge is complete. The symbolism child lesson covers the knowledge-base diagram and interpretability limits."
   ],
   "objectiveIds": [
    "fundamentals1-3-o1"
   ]
  },
  {
   "heading": "Neural learning",
   "pages": [
    23,
    26
   ],
   "bullets": [
    "Connectionist systems learn representations and transformations through networks. Distinguish the training loop from application of the learned model. Strong performance does not eliminate overfitting, bias, or robustness concerns."
   ],
   "objectiveIds": [
    "fundamentals1-3-o2"
   ]
  },
  {
   "heading": "Environment interaction and comparison",
   "pages": [
    23,
    27
   ],
   "bullets": [
    "The behaviorist account emphasizes agents, policies, actions, and outcomes. It draws attention to feedback and the cost or risk of trial and error.",
    "The source also names evolutionary, analogical, and Bayesian schools in its overview but does not provide comparable instruction about them here. Do not invent detailed methods for those labels in this chapter.",
    "Worked synthesis: a robot may use a neural recognizer, explicit safety rules, and a learned action policy. The three perspectives describe different mechanisms and can coexist in one application."
   ],
   "objectiveIds": [
    "fundamentals1-3-o3"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 3,
   "rationale": "3 authored items assess 3 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 3,
   "rationale": "3 authored items assess 3 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 3,
   "rationale": "3 authored items assess 3 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-3-pre-01",
    "type": "single",
    "stem": "Which system description most strongly indicates symbolism?",
    "options": [
     {
      "key": "A",
      "text": "A system storing explicit facts and applying rules"
     },
     {
      "key": "B",
      "text": "A network adjusting weights from output loss"
     },
     {
      "key": "C",
      "text": "An agent changing actions after rewards"
     },
     {
      "key": "D",
      "text": "A sensor recording raw measurements without analysis"
     }
    ],
    "answer": [
     "A"
    ],
    "explanation": "Explicit knowledge and rules characterize symbolic reasoning. Weight learning and reward-driven adaptation emphasize other mechanisms.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o1"
    ]
   },
   {
    "id": "fundamentals1-3-pre-02",
    "type": "single",
    "stem": "Which signal belongs to the source's neural learning diagram?",
    "options": [
     {
      "key": "A",
      "text": "An unchanging list of policy clauses"
     },
     {
      "key": "B",
      "text": "A required manual proof for each prediction"
     },
     {
      "key": "C",
      "text": "Error/loss between output and objective"
     },
     {
      "key": "D",
      "text": "The date of the model's announcement"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The connectionist diagram includes loss connecting model output, objective, and training.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o2"
    ]
   },
   {
    "id": "fundamentals1-3-pre-03",
    "type": "tf",
    "stem": "The behaviorist perspective emphasizes how consequences influence an agent's behavior in an environment.",
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
    "explanation": "The source connects agent actions to reward and punishment, with adaptation from outcomes.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o3"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-3-post-01",
    "type": "tf",
    "stem": "Symbolic reasoning can be interpretable while still depending on incomplete or conflicting knowledge.",
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
    "explanation": "The source lists interpretability alongside knowledge-construction, omission, and conflict problems.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o1"
    ]
   },
   {
    "id": "fundamentals1-3-post-02",
    "type": "multi",
    "stem": "Which checks are relevant to the connectionist limitations listed? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Whether the model overfits familiar data"
     },
     {
      "key": "B",
      "text": "Whether it is robust to relevant changes"
     },
     {
      "key": "C",
      "text": "Whether neural architecture alone guarantees fairness"
     },
     {
      "key": "D",
      "text": "Whether evaluation can be skipped after training"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "Overfitting and robustness are listed concerns. A network architecture does not establish fairness or make evaluation unnecessary.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o2"
    ]
   },
   {
    "id": "fundamentals1-3-post-03",
    "type": "single",
    "stem": "An agent improves its route choices after receiving outcomes from previous actions. Which mechanism is central?",
    "options": [
     {
      "key": "A",
      "text": "Deduction from explicit symbolic premises"
     },
     {
      "key": "B",
      "text": "Environmental feedback to an action policy"
     },
     {
      "key": "C",
      "text": "Projection into a fixed feature space"
     },
     {
      "key": "D",
      "text": "Direct lookup of stored target labels"
     }
    ],
    "answer": [
     "B"
    ],
    "explanation": "The behaviorist loop connects action outcomes with later behavior through a policy.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o3"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-3-summative-01",
    "type": "single",
    "stem": "A rule-based assistant provides a clear derivation but uses an outdated policy. Which diagnosis best fits?",
    "options": [
     {
      "key": "A",
      "text": "Interpretability confirms that every rule remains current"
     },
     {
      "key": "B",
      "text": "A valid derivation guarantees a complete policy representation"
     },
     {
      "key": "C",
      "text": "An outdated policy necessarily requires a neural replacement"
     },
     {
      "key": "D",
      "text": "Clear reasoning can rely on inadequate knowledge"
     }
    ],
    "answer": [
     "D"
    ],
    "explanation": "Symbolic interpretability does not remove the source's concerns about omissions and keeping up with changes.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o1"
    ]
   },
   {
    "id": "fundamentals1-3-summative-02",
    "type": "tf",
    "stem": "A trained neural classifier and a symbolic reasoning engine must be evaluated using identical internal explanations because both are called AI.",
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
    "explanation": "The source distinguishes explicit symbolic reasoning from learned neural representations and notes different interpretability properties.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      24,
      26
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o2"
    ]
   },
   {
    "id": "fundamentals1-3-summative-03",
    "type": "multi",
    "stem": "A robot combines a learned visual network with a reward-driven action policy. Which source perspectives are represented? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Connectionism for neural perception"
     },
     {
      "key": "B",
      "text": "Behaviorism for consequence-guided actions"
     },
     {
      "key": "C",
      "text": "A requirement that the whole robot belong to exactly one school"
     },
     {
      "key": "D",
      "text": "A proof that trial-and-error safety risks have disappeared"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "Neural learning and outcome-driven interaction can describe different components of one system. The combination does not eliminate trial-and-error risk.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      26,
      27
     ]
    },
    "objectiveIds": [
     "fundamentals1-3-o3"
    ]
   }
  ]
 },
 "relatedLessons": [
  {
   "sectionId": "ai-1-1",
   "description": "Related treatment in AI Solution V1.0. Keep each source course and its edition context separate."
  }
 ]
});
