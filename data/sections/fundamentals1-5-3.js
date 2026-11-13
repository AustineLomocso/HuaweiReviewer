HR.registerSection({
 "id": "fundamentals1-5-3",
 "coverageStatus": "source-reviewed",
 "objectives": [
  {
   "id": "fundamentals1-5-3-o1",
   "description": "Identify how selected historical records can exclude relevant populations and reproduce bias.",
   "pages": [
    34,
    34
   ]
  }
 ],
 "notes": [
  {
   "heading": "Ask whose examples are missing",
   "pages": [
    34,
    34
   ],
   "bullets": [
    "Survivorship bias occurs when the observed records come from a selected subset and important excluded cases are missing. The source uses recruitment data dominated by existing employees as an example.",
    "A model can reproduce the historical selection process rather than fairly evaluating the broader applicant population. A technically sophisticated algorithm does not repair an unrepresentative dataset by itself.",
    "Worked application: before using employee profiles to screen future applicants, examine which applicants never entered that dataset and whether their exclusion affects the target decision. Evaluate diversity and curation rather than only total dataset size."
   ],
   "objectiveIds": [
    "fundamentals1-5-3-o1"
   ]
  }
 ],
 "assessmentBlueprint": {
  "pre": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "post": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  },
  "summative": {
   "count": 1,
   "rationale": "1 authored items assess 1 objective(s) at this source scope; parent assessments add integrated practice."
  }
 },
 "tests": {
  "pre": [
   {
    "id": "fundamentals1-5-3-pre-01",
    "type": "single",
    "stem": "A recruiting model learns mainly from people already hired. Which missing information is most relevant to the source's bias concern?",
    "options": [
     {
      "key": "A",
      "text": "The company logo on each record"
     },
     {
      "key": "B",
      "text": "The number of neural layers used"
     },
     {
      "key": "C",
      "text": "Relevant applicants excluded from the employee dataset"
     },
     {
      "key": "D",
      "text": "The sorting order of stored employee IDs"
     }
    ],
    "answer": [
     "C"
    ],
    "explanation": "The dataset reflects a selected surviving population. Relevant excluded applicants are central to the concern; formatting and model size do not establish representativeness.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-3-o1"
    ]
   }
  ],
  "post": [
   {
    "id": "fundamentals1-5-3-post-01",
    "type": "multi",
    "stem": "Which responses address the source's dataset-bias concern? Select all that apply.",
    "options": [
     {
      "key": "A",
      "text": "Examine excluded populations"
     },
     {
      "key": "B",
      "text": "Curate a more diverse relevant dataset"
     },
     {
      "key": "C",
      "text": "Assume model sophistication guarantees fairness"
     },
     {
      "key": "D",
      "text": "Duplicate existing selected records until the dataset is larger"
     }
    ],
    "answer": [
     "A",
     "B"
    ],
    "explanation": "The source emphasizes diversity and careful curation. Sophistication and duplicating the same selected records do not establish representative coverage.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-3-o1"
    ]
   }
  ],
  "summative": [
   {
    "id": "fundamentals1-5-3-summative-01",
    "type": "tf",
    "stem": "A large dataset can still be biased if it repeatedly represents the same selected population and omits relevant cases.",
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
    "explanation": "The issue is which cases are observed and missing, not merely record count. Selected historical data can perpetuate existing inequalities.",
    "source": {
     "kind": "material",
     "pdf": "ai-fundamentals-1",
     "pages": [
      34
     ]
    },
    "objectiveIds": [
     "fundamentals1-5-3-o1"
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
